"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";
import { isActiveLink, primaryNav } from "@/lib/site";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Any navigation closes the menu; without this it stays open over the new page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Condense the bar once the user leaves the top of the page.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes, and focus returns to the toggle so keyboard users aren't
  // stranded in a collapsed panel.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!panelRef.current?.contains(target) && !toggleRef.current?.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <header
      className={`on-dark fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-white/10 bg-navy-deep/95 backdrop-blur-xl"
          : "border-transparent bg-navy-deep/80 backdrop-blur-md"
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo tone="onDark" />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((link) => {
            const active = isActiveLink(pathname, link);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "text-gold-light"
                    : "text-slate-200 hover:bg-white/5 hover:text-gold-light"
                }`}
              >
                {link.label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gold"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/login"
            className="hidden text-sm font-semibold text-slate-200 transition hover:text-gold-light sm:inline-flex sm:px-3 sm:py-2"
          >
            Sign in
          </Link>
          <Link href="/kyc" className="gold-button hidden !min-h-0 px-5 py-2.5 sm:inline-flex">
            Open Account
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
          >
            {/* Two bars that cross into an X — cheaper and smoother than swapping icons. */}
            <span className="relative block h-4 w-5" aria-hidden="true">
              <span
                className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${
                  open ? "top-1/2 rotate-45" : "top-0.5"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  open ? "top-1/2 -rotate-45" : "top-[0.875rem]"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile panel. Rendered but collapsed so the open/close transition works;
          `invisible` keeps it out of the tab order while closed. */}
      <div
        id="mobile-nav"
        ref={panelRef}
        className={`overflow-hidden border-t border-white/10 bg-navy-deep/98 backdrop-blur-xl transition-[max-height,opacity] duration-300 ease-out lg:hidden ${
          open ? "max-h-[30rem] opacity-100" : "invisible max-h-0 opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="container-page space-y-1 px-4 py-4 sm:px-6">
          {primaryNav.map((link) => {
            const active = isActiveLink(pathname, link);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                tabIndex={open ? undefined : -1}
                className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition ${
                  active
                    ? "bg-white/10 text-gold-light"
                    : "text-slate-200 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
                <span aria-hidden="true" className="text-gold/60">
                  →
                </span>
              </Link>
            );
          })}

          <div className="grid gap-3 pt-3 sm:grid-cols-2">
            <Link href="/login" className="ghost-button" tabIndex={open ? undefined : -1}>
              Sign in
            </Link>
            <Link href="/kyc" className="gold-button" tabIndex={open ? undefined : -1}>
              Open Account
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
