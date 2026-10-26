"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Lightbulb, Monitor, Speaker, Layers } from "lucide-react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const packages = [
  {
    title: "Concert Package",
    tag: "Live music · Large crowd",
    desc: "Full stage build, line-array sound, moving-head lighting, and LED backdrop for live shows.",
    items: ["12m × 8m stage", "Line-array PA system", "24 moving-head lights", "LED screen backdrop"],
    img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&q=80",
  },
  {
    title: "Wedding Package",
    tag: "Ceremony · Reception",
    desc: "Elegant stage, warm lighting, and crystal-clear sound for ceremonies and receptions.",
    items: ["6m × 4m stage", "Column PA system", "Warm ambient lighting", "Wireless mics ×4"],
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
  },
  {
    title: "Corporate Package",
    tag: "Conferences · Launches",
    desc: "Clean stage, professional lighting, and presentation-ready screens for corporate events.",
    items: ["Podium + backdrop", "Conference PA", "Stage wash lighting", "LED presentation screen"],
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
  },
];

const categories = [
  {
    icon: Layers,
    title: "Stages",
    desc: "Modular stage decks from 4m to 16m wide, with steps, skirting, and truss.",
  },
  {
    icon: Lightbulb,
    title: "Lighting",
    desc: "Moving heads, par cans, wash lights, and DMX control with an operator.",
  },
  {
    icon: Monitor,
    title: "Screens",
    desc: "LED walls and projection screens in multiple sizes, with playback.",
  },
  {
    icon: Speaker,
    title: "Sound Systems",
    desc: "Line arrays, subs, monitors, and wireless mics — set up and tuned on site.",
  },
];

export default function EventsPage() {
  return (
    <main className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div initial="hidden" animate="show" variants={fadeUp} className="mb-14">
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">Stage & Event Gear</p>
          <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-tight">
            We build the <span className="text-accent">scene.</span>
          </h1>
          <p className="text-muted mt-4 max-w-2xl text-lg">
            Stages, lighting, screens, and sound for concerts, weddings, and corporate events —
            delivered, set up, and operated by our team.
          </p>
        </motion.div>

        {/* Packages */}
        <div className="grid gap-6 mb-20">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: i * 0.08 }}
              className="grid md:grid-cols-[1fr_1fr] gap-0 rounded-2xl overflow-hidden bg-surface border border-border hover:border-accent/50 transition group"
            >
              <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[280px] overflow-hidden">
                <img
                  src={pkg.img}
                  alt={pkg.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <p className="text-xs text-accent2 uppercase tracking-widest mb-2">{pkg.tag}</p>
                <h3 className="font-display text-2xl mb-2">{pkg.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4">{pkg.desc}</p>
                <ul className="grid grid-cols-2 gap-2 text-sm text-muted mb-6">
                  {pkg.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-accent text-sm hover:gap-2 transition-all w-fit"
                >
                  Get a quote <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Categories */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-10">
          <h2 className="font-display text-3xl md:text-4xl tracking-tight">What we supply</h2>
          <p className="text-muted mt-3 max-w-xl">Mix and match — or let us build the full package.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c, i) => (
            <motion.div
              key={c.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: i * 0.06 }}
              className="p-6 rounded-2xl bg-surface border border-border hover:border-accent/50 transition"
            >
              <c.icon className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-display text-lg mb-2">{c.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-16 rounded-2xl border border-border bg-surface p-8 md:p-12 text-center"
        >
          <h3 className="font-display text-2xl md:text-3xl mb-3">Planning an event?</h3>
          <p className="text-muted mb-6 max-w-xl mx-auto">
            Send us the date and venue — we&apos;ll come back with a full equipment and setup plan.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-medium hover:opacity-90 transition"
          >
            Request a quote <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}