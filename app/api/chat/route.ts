import OpenAI from "openai";
import { buildAssistantMessages } from "@/lib/assistant";

export const runtime = "nodejs";

const MAX_MESSAGES = 24;
const MAX_LENGTH = 4000;

type IncomingMessage = { role?: string; content?: unknown };

/**
 * Streaming chat endpoint for the site-wide assistant.
 *
 * The API key lives in OPENAI_API_KEY (or a compatible provider configured via
 * AI_BASE_URL) and is only ever read on the server — it never reaches the
 * browser. The system prompt is assembled in lib/assistant.ts and grounded
 * with live deals from the database.
 */
export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: "The assistant is not configured yet. Add OPENAI_API_KEY to your environment.",
      }),
      {
        status: 503,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  let payload: { messages?: IncomingMessage[] };
  try {
    payload = (await request.json()) as { messages?: IncomingMessage[] };
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body." }), { status: 400 });
  }

  const raw = (payload.messages ?? []).slice(0, MAX_MESSAGES);
  const history = raw
    .filter(
      (message) =>
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string" &&
        message.content.length > 0 &&
        message.content.length <= MAX_LENGTH,
    )
    .map((message) => ({
      role: message.role as "user" | "assistant",
      content: message.content as string,
    }));

  if (history.length === 0) {
    return new Response(JSON.stringify({ error: "No messages supplied." }), { status: 400 });
  }

  const messages = await buildAssistantMessages(history);

  const client = new OpenAI({
    apiKey,
    baseURL: process.env.AI_BASE_URL || undefined,
  });

  const stream = await client.chat.completions.create({
    model: process.env.AI_MODEL || "gpt-4o-mini",
    stream: true,
    temperature: 0.4,
    messages,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const delta = chunk.choices[0]?.delta?.content;
          if (delta) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ delta })}\n\n`));
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      } catch (error) {
        console.error("[api/chat] stream failed:", error);
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ error: "Stream interrupted. Please try again." })}\n\n`,
          ),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}