"use client";

import { useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

const GREETING: Message = {
  role: "assistant",
  content:
    "Hello — I'm the Indigio assistant. Ask me about the platform, current deals, KYC onboarding, or how tokenized real-estate investing works.",
};

const SUGGESTIONS = [
  "Which deals are open right now?",
  "How does KYC onboarding work?",
  "What is the minimum investment?",
];

const STORAGE_KEY = "rbc-indigio.chat";

function readStored(): Message[] | null {
  try {
    const value = window.sessionStorage.getItem(STORAGE_KEY);
    if (!value) return null;
    const parsed = JSON.parse(value) as Message[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
  } catch {
    return null;
  }
}

/** Renders one assistant message, preserving line breaks from streaming. */
function Content({ text }: { text: string }) {
  return (
    <p className="whitespace-pre-wrap break-words text-sm leading-6">
      {text}
      <span className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 animate-pulse bg-current align-middle" />
    </p>
  );
}

/**
 * Site-wide concierge. Fetches /api/chat (server-side key, streaming) and
 * renders the reply in the same panel — the front end speaks to the assistant
 * through the backend, never directly to the model provider.
 */
export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const streamRef = useRef<AbortController | null>(null);

  // Restore a previous session once (client-only to avoid hydration mismatch).
  useEffect(() => {
    const stored = readStored();
    if (stored) setMessages(stored);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(1)));
    } catch {
      /* sessionStorage unavailable — ignore */
    }
  }, [messages, hydrated]);

  // Keep the newest message in view while streaming.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, streaming, open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Abort streaming if the panel unmounts.
  useEffect(() => {
    return () => streamRef.current?.abort();
  }, []);

  const send = async (text: string): Promise<void> => {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    setError(null);
    setInput("");
    const next: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setStreaming(true);

    let assistantText = "";
    setMessages([...next, { role: "assistant", content: "" }]);

    const controller = new AbortController();
    streamRef.current = controller;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
        signal: controller.signal,
      });

      if (!response.ok) {
        let message = "The assistant could not be reached. Please try again.";
        try {
          const body = (await response.json()) as { error?: string };
          if (body.error) message = body.error;
        } catch {
          /* non-JSON error body */
        }
        throw new Error(message);
      }

      if (!response.body) throw new Error("No response stream.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const events = buffer.split("\n\n");
        buffer = events.pop() ?? "";

        for (const event of events) {
          const line = event.trim();
          if (!line.startsWith("data:")) continue;
          const data = line.slice(5).trim();
          if (data === "[DONE]") continue;
          try {
            const parsed = JSON.parse(data) as { delta?: string; error?: string };
            if (parsed.error) throw new Error(parsed.error);
            if (parsed.delta) {
              assistantText += parsed.delta;
              setMessages((current) => {
                const copy = [...current];
                copy[copy.length - 1] = { role: "assistant", content: assistantText };
                return copy;
              });
            }
          } catch {
            /* malformed event — skip */
          }
        }
      }
    } catch (thrown) {
      if ((thrown as Error).name === "AbortError") return;
      setError((thrown as Error).message || "Something went wrong.");
      // Keep a non-empty assistant turn so the streamed slot isn't blank.
      setMessages((current) => {
        const copy = [...current];
        const last = copy[copy.length - 1];
        if (last.role === "assistant" && last.content === "") {
          copy[copy.length - 1] = {
            role: "assistant",
            content: "I'm sorry — I hit an error just now. Please try again.",
          };
        }
        return copy;
      });
    } finally {
      setStreaming(false);
      streamRef.current = null;
    }
  };

  return (
    <>
      {/* Launcher */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="assistant-panel"
        aria-label={open ? "Close assistant" : "Open assistant"}
        className="fixed bottom-5 right-5 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white shadow-[0_18px_45px_rgba(11,35,64,0.4)] transition duration-200 hover:-translate-y-0.5 hover:bg-navy-mid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
            <path d="M12 3a9 9 0 0 0-9 9c0 1.6.4 3.1 1.1 4.4L3 21l4.9-1A9 9 0 1 0 12 3zm-3.2 8.8a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3zM12 12a1.15 1.15 0 1 1 0 2.3A1.15 1.15 0 0 1 12 12zm3.2 0a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3z" />
          </svg>
        )}
      </button>

      {open && (
        <section
          id="assistant-panel"
          aria-label="Indigio assistant chat"
          className="fixed bottom-24 right-5 z-[60] flex w-[calc(100vw-2.5rem)] max-w-md flex-col overflow-hidden rounded-[26px] border border-line bg-white shadow-[0_30px_90px_rgba(9,23,40,0.28)]"
        >
          {/* Header */}
          <div className="on-dark bg-navy-gradient flex items-center gap-3 px-5 py-4 text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-lg" aria-hidden="true">
              ✦
            </span>
            <div className="min-w-0">
              <p className="text-sm font-black tracking-[-0.02em]">Indigio Assistant</p>
              <p className="flex items-center gap-1.5 text-[11px] text-slate-300">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                {streaming ? "Thinking…" : "Online"}
              </p>
            </div>
            <span className="badge-neutral ml-auto !border-white/15 !bg-white/10 !text-slate-200">
              Demo
            </span>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex h-80 flex-col gap-3 overflow-y-auto bg-canvas-ivory px-4 py-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "rounded-br-md bg-navy text-white"
                      : "rounded-bl-md border border-line bg-white text-ink"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <Content text={message.content} />
                  ) : (
                    <p className="whitespace-pre-wrap break-words text-sm leading-6">{message.content}</p>
                  )}
                </div>
              </div>
            ))}

            {!messages.some((message) => message.role === "user") && (
              <div className="mt-1 space-y-2">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => send(suggestion)}
                    className="block w-full rounded-xl border border-line bg-white px-3 py-2 text-left text-xs font-medium text-navy transition hover:border-gold/50 hover:bg-gold/10"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div role="alert" className="border-t border-red-200 bg-red-50 px-4 py-2.5 text-xs font-medium text-red-700">
              {error}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void send(input);
            }}
            className="flex items-center gap-2 border-t border-line bg-white p-3"
          >
            <label htmlFor="assistant-input" className="sr-only">
              Ask the assistant
            </label>
            <input
              id="assistant-input"
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void send(input);
                }
              }}
              placeholder="Ask about deals, KYC, the dashboard…"
              className="field !rounded-2xl !px-4 !py-2.5"
              autoComplete="off"
              disabled={streaming}
            />
            <button
              type="submit"
              disabled={streaming || input.trim().length === 0}
              aria-label="Send message"
              className="gold-button shrink-0 !min-h-0 !rounded-full !px-4 !py-2.5"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M3.4 20.4l17.4-7.5c.8-.36.8-1.48 0-1.84L3.4 3.6a1 1 0 0 0-1.38 1.27l1.8 6.13c.06.2.06.42 0 .62l-1.8 6.13a1 1 0 0 0 1.38 1.27zM6 13h5v-2H6V8l8 4-8 4v-3z" />
              </svg>
            </button>
          </form>

          <p className="bg-white px-4 pb-3 text-[10px] leading-relaxed text-ink-muted">
            Demo assistant — replies are for demonstration only and are not
            investment advice or an offer of securities.
          </p>
        </section>
      )}
    </>
  );
}