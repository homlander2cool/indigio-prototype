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
 * The lockup is a pale blue (#bccae0-ish) on transparent — gorgeous on navy,
 * invisible on white. CSS filters make it behave on both surfaces: on light
 * it is darkened to solid ink (`brightness-0`), on dark it shows the brand
 * blue as-is. No extra assets needed, aspect ratio kept at any size.
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
          !onDark ? "brightness-0" : ""
        }`}
      />
    </Link>
  );
}