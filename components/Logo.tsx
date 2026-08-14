import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  /** `onDark` inverts the wordmark for navy backgrounds. */
  tone?: "onLight" | "onDark";
  className?: string;
};

/**
 * Brand wordmark, served from /images/logo.png (116×25) via next/image.
 *
 * The bundled logo.svg was a 166KB traced file fixed to a pale blue that
 * disappears on light backgrounds — it has been retired. The PNG lockup is
 * light-weight, keeps its aspect ratio at any size, and inverts cleanly on
 * dark surfaces via a CSS filter (no extra asset needed).
 *
 * Always wrapped in a home link — an unclickable logo is a dead end users
 * reliably try anyway.
 */
export default function Logo({ tone = "onLight", className = "" }: LogoProps) {
  const onDark = tone === "onDark";

  return (
    <Link
      href="/"
      aria-label="RBC Indigio — home"
      className={`group flex shrink-0 items-center rounded-lg ${className}`}
    >
      <Image
        src="/images/logo.png"
        alt=""
        width={116}
        height={25}
        priority
        sizes="(min-width: 640px) 148px, 130px"
        className={`h-7 w-auto transition-transform duration-300 group-hover:scale-105 sm:h-8 ${
          onDark ? "brightness-0 invert" : ""
        }`}
      />
    </Link>
  );
}