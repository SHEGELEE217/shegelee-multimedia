"use client";

import { motion } from "framer-motion";
import { Mic, Guitar, Lightbulb, ArrowRight, Play } from "lucide-react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const businesses = [
  {
    icon: Mic,
    title: "Recording Studio",
    desc: "Fully equipped live rooms, vocal booths, and mixing suites. Book a session with our engineers.",
    href: "/studio",
  },
  {
    icon: Guitar,
    title: "Instrument Rentals",
    desc: "Guitars, keyboards, drums, and sound gear by the day or week. Delivered across Lagos.",
    href: "/instruments",
  },
  {
    icon: Lightbulb,
    title: "Stage & Event Gear",
    desc: "Stages, lighting, screens, and full sound systems for concerts, weddings, and corporate events.",
    href: "/events",
  },
];

const portfolio = [
  { title: "Lagos Live Sessions", tag: "Concert", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80" },
  { title: "Album Recording — Vol. 1", tag: "Studio", img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80" },
  { title: "Wedding Stage & Lighting", tag: "Event", img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80" },
  { title: "Rooftop Sound System", tag: "Live", img: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80" },
];

export default function Home() {
  return (
    <main className="overflow-hidden">
  
     

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-24">
        {/* animated gradient backdrop */}
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "radial-gradient(circle at 20% 30%, rgba(124,58,237,0.35), transparent 45%), radial-gradient(circle at 80% 70%, rgba(245,158,11,0.18), transparent 45%), #0b0b0f",
            backgroundSize: "200% 200%",
          }}
        />
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.p
            initial="hidden" animate="show" variants={fadeUp}
            className="text-accent text-sm tracking-[0.35em] uppercase mb-6"
          >
            Lagos · Nigeria
          </motion.p>
          <motion.h1
            initial="hidden" animate="show" variants={fadeUp}
            className="font-display text-5xl md:text-7xl font-semibold leading-[1.05] tracking-tight"
          >
            Sound. Stage. <span className="text-accent">Story.</span>
          </motion.h1>
          <motion.p
            initial="hidden" animate="show" variants={fadeUp}
            className="mt-6 text-lg text-muted max-w-2xl mx-auto"
          >
            From the recording room to the concert stage — Shegelee Multimedia builds the
            sound and the scene behind Nigeria&apos;s most memorable moments.
          </motion.p>
          <motion.div
            initial="hidden" animate="show" variants={fadeUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-medium hover:opacity-90 transition"
            >
              Start a project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-white hover:bg-surface transition"
            >
              <Play className="w-4 h-4" /> See our work
            </Link>
          </motion.div>
        </div>
      </section>

      {/* THREE BUSINESSES */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mb-14"
        >
          <h2 className="font-display text-3xl md:text-4xl tracking-tight">Three ways we bring sound to life</h2>
          <p className="text-muted mt-3 max-w-xl">Pick the service you need — or talk to us about a full package.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {businesses.map((b, i) => (
            <motion.div
              key={b.title}
              initial="hidden" whileInView="show" viewport={{ once: true }}
              variants={fadeUp} transition={{ delay: i * 0.1 }}
            >
              <Link
                href={b.href}
                className="block p-8 rounded-2xl bg-surface border border-border hover:border-accent/60 hover:-translate-y-1 transition-all duration-300 group"
              >
                <b.icon className="w-8 h-8 text-accent mb-6" />
                <h3 className="font-display text-xl mb-2">{b.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{b.desc}</p>
                <span className="inline-flex items-center gap-1 text-accent text-sm mt-6 group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO STRIP */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-display text-3xl md:text-4xl tracking-tight">Recent work</h2>
          <Link href="/portfolio" className="text-accent text-sm hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {portfolio.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="relative aspect-[3/4] rounded-xl overflow-hidden group"
            >
              <img
                src={p.img}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-xs text-accent2 uppercase tracking-widest mb-1">{p.tag}</p>
                <p className="text-white font-medium text-sm">{p.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          className="relative rounded-3xl overflow-hidden border border-border bg-surface p-12 md:p-16 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-accent2/10 -z-10" />
          <h2 className="font-display text-3xl md:text-5xl tracking-tight">Ready to make some noise?</h2>
          <p className="text-muted mt-4 max-w-xl mx-auto">
            Tell us about your recording, rental, or event — we&apos;ll reply within 24 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 mt-8 px-7 py-3 rounded-full bg-white text-bg font-medium hover:opacity-90 transition"
          >
            Get a quote <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

    </main>
  );
}