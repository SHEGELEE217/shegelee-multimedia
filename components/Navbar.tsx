"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/studio", label: "Studio" },
  { href: "/instruments", label: "Instruments" },
  { href: "/events", label: "Events" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-bg/70 border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl tracking-tight">
          SHEGELEE <span className="text-accent">·</span>{" "}
          <span className="text-muted text-xs tracking-[0.3em] align-middle">MULTIMEDIA</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`transition ${
                pathname === l.href ? "text-accent" : "text-muted hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="px-4 py-2 rounded-full bg-accent text-white font-medium hover:opacity-90 transition"
          >
            Book now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg border border-border text-white"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-bg/95 backdrop-blur-md">
          <div className="px-6 py-4 flex flex-col gap-4 text-sm">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`transition ${
                  pathname === l.href ? "text-accent" : "text-muted hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-2 rounded-full bg-accent text-white font-medium text-center"
            >
              Book now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}