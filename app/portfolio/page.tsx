"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin, Calendar } from "lucide-react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

type Filter = "All" | "Concerts" | "Weddings" | "Corporate" | "Studio";

const projects = [
  {
    title: "Lagos Live Sessions",
    category: "Concerts" as Filter,
    location: "Eko Hotel, Lagos",
    date: "Mar 2025",
    scope: "Stage, line-array sound, 24 moving heads, LED backdrop",
    img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&q=80",
  },
  {
    title: "The Amaka Wedding",
    category: "Weddings" as Filter,
    location: "Ikoyi, Lagos",
    date: "Feb 2025",
    scope: "Elegant stage, warm lighting, 4 wireless mics, column PA",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
  },
  {
    title: "TechCo Product Launch",
    category: "Corporate" as Filter,
    location: "Victoria Island, Lagos",
    date: "Jan 2025",
    scope: "Podium build, LED presentation screen, stage wash lighting",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
  },
  {
    title: "Album Recording — Vol. 1",
    category: "Studio" as Filter,
    location: "Shegelee Studio, Lagos",
    date: "Dec 2024",
    scope: "Full band live tracking, mixing, and mastering",
    img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=80",
  },
  {
    title: "Rooftop Sound Experience",
    category: "Concerts" as Filter,
    location: "Lekki, Lagos",
    date: "Nov 2024",
    scope: "Rooftop stage, compact line array, ambient lighting",
    img: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200&q=80",
  },
  {
    title: "Corporate Gala Night",
    category: "Corporate" as Filter,
    location: "Ikeja, Lagos",
    date: "Oct 2024",
    scope: "Stage build, conference PA, projection screens, lighting",
    img: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80",
  },
  {
    title: "Vocal Sessions — Single",
    category: "Studio" as Filter,
    location: "Shegelee Studio, Lagos",
    date: "Sep 2024",
    scope: "Vocal recording, comping, tuning, and mix",
    img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&q=80",
  },
  {
    title: "Outdoor Wedding Stage",
    category: "Weddings" as Filter,
    location: "Ajah, Lagos",
    date: "Aug 2024",
    scope: "Outdoor stage, weatherproof rig, lighting, sound",
    img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80",
  },
];

const filters: Filter[] = ["All", "Concerts", "Weddings", "Corporate", "Studio"];

export default function PortfolioPage() {
  const [active, setActive] = useState<Filter>("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <main className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div initial="hidden" animate="show" variants={fadeUp} className="mb-10">
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">Portfolio</p>
          <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-tight">
            Work that <span className="text-accent">speaks.</span>
          </h1>
          <p className="text-muted mt-4 max-w-2xl text-lg">
            Concerts, weddings, corporate events, and studio sessions — a look at what
            we&apos;ve built and recorded.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-2 rounded-full text-sm border transition ${
                active === f
                  ? "bg-accent text-white border-accent"
                  : "bg-surface text-muted border-border hover:border-accent/50 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.article
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="rounded-2xl overflow-hidden bg-surface border border-border hover:border-accent/50 transition group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur text-xs text-white">
                    {p.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg mb-2">{p.title}</h3>
                  <div className="flex flex-wrap gap-3 text-xs text-muted mb-3">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-accent" /> {p.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-accent" /> {p.date}
                    </span>
                  </div>
                  <p className="text-muted text-sm leading-relaxed">{p.scope}</p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-16 rounded-2xl border border-border bg-surface p-8 md:p-12 text-center"
        >
          <h3 className="font-display text-2xl md:text-3xl mb-3">Want to be next?</h3>
          <p className="text-muted mb-6 max-w-xl mx-auto">
            Tell us about your event or recording project — we&apos;ll show you exactly how we&apos;d deliver it.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-medium hover:opacity-90 transition"
          >
            Start a project <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}