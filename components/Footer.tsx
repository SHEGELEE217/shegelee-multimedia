import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-6 text-sm text-muted">
        <div>
          <p className="font-display text-white mb-1">
            SHEGELEE <span className="text-accent">·</span> MULTIMEDIA
          </p>
          <p>© {new Date().getFullYear()} Shegelee Multimedia. Lagos, Nigeria.</p>
        </div>
        <div className="flex flex-wrap gap-6">
          <Link href="/studio" className="hover:text-white transition">Studio</Link>
          <Link href="/instruments" className="hover:text-white transition">Instruments</Link>
          <Link href="/events" className="hover:text-white transition">Events</Link>
          <Link href="/portfolio" className="hover:text-white transition">Portfolio</Link>
          <Link href="/contact" className="hover:text-white transition">Contact</Link>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition">Instagram</a>
          <a href="#" className="hover:text-white transition">YouTube</a>
          <a href="https://wa.me/2348140253666" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}