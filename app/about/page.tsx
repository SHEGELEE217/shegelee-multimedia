"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Music2, Users, Trophy } from "lucide-react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stats = [
  { icon: Music2, value: "120+", label: "Sessions recorded" },
  { icon: Users, value: "80+", label: "Events delivered" },
  { icon: Trophy, value: "8 yrs", label: "In the industry" },
];

const team = [
  {
    name: "Studio & Mix",
    role: "Recording engineers",
    desc: "Tracking, mixing, and mastering across genres — from afrobeats to gospel.",
  },
  {
    name: "Live Production",
    role: "Stage & sound crew",
    desc: "Stage builds, rigging, sound tuning, and lighting design for live events.",
  },
  {
    name: "Rentals & Logistics",
    role: "Gear & delivery team",
    desc: "Instrument prep, gear checks, delivery, and pickup across Lagos.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted hover:text-white text-sm mb-8 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back home
        </Link>

        <motion.div initial="hidden" animate="show" variants={fadeUp} className="mb-16">
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">About Us</p>
          <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-tight max-w-4xl">
            Built in Lagos. <span className="text-accent">Made for sound.</span>
          </h1>
          <p className="text-muted mt-6 max-w-2xl text-lg leading-relaxed">
            Shegelee Multimedia started as a printing and media business — and grew into a
            full production house: a recording studio, an instrument rental service, and a
            live event team supplying stages, lighting, screens, and sound across Nigeria.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="grid sm:grid-cols-3 gap-6 mb-20"
        >
          {stats.map((s) => (
            <div key={s.label} className="p-6 rounded-2xl bg-surface border border-border text-center">
              <s.icon className="w-7 h-7 text-accent mx-auto mb-3" />
              <p className="font-display text-3xl mb-1">{s.value}</p>
              <p className="text-muted text-sm">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Story */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="grid md:grid-cols-2 gap-10 items-center mb-20"
        >
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=80"
              alt="Shegelee studio"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-display text-3xl md:text-4xl mb-4 tracking-tight">One brand, three strengths</h2>
            <p className="text-muted leading-relaxed mb-4">
              We don&apos;t just record. We don&apos;t just rent gear. We don&apos;t just run events.
              We bring all three together so a project can go from the vocal booth to the
              concert stage without leaving our hands.
            </p>
            <p className="text-muted leading-relaxed">
              That&apos;s what makes us different from a single-service studio — and what makes
              us the right partner for clients who want the whole production handled well.
            </p>
          </div>
        </motion.div>

        {/* Team */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-10">
          <h2 className="font-display text-3xl md:text-4xl tracking-tight">The teams behind the work</h2>
          <p className="text-muted mt-3 max-w-xl">Small, focused, and hands-on with every project.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {team.map((t, i) => (
            <motion.div
              key={t.name}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-2xl bg-surface border border-border"
            >
              <p className="text-xs text-accent2 uppercase tracking-widest mb-2">{t.role}</p>
              <h3 className="font-display text-xl mb-2">{t.name}</h3>
              <p className="text-muted text-sm leading-relaxed">{t.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="rounded-2xl border border-border bg-surface p-8 md:p-12 text-center"
        >
          <h3 className="font-display text-2xl md:text-3xl mb-3">Let&apos;s work together</h3>
          <p className="text-muted mb-6 max-w-xl mx-auto">
            Whether it&apos;s a recording, a rental, or a full event production — we&apos;d love to hear about it.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-medium hover:opacity-90 transition"
          >
            Contact us <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}