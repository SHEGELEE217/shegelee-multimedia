"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Clock, Users, Music2, ArrowRight } from "lucide-react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const rooms = [
  {
    name: "The Live Room",
    tag: "Recording · Full band",
    price: "₦45,000 / hr",
    capacity: "Up to 8 people",
    gear: "Neumann mics, SSL console, drum kit, 2 guitar amps, grand piano",
    img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=80",
  },
  {
    name: "Vocal Booth A",
    tag: "Recording · Vocals",
    price: "₦20,000 / hr",
    capacity: "Up to 3 people",
    gear: "Neumann U87, Avalon preamp, Pro Tools HD, monitoring headphones",
    img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&q=80",
  },
  {
    name: "Mixing Suite",
    tag: "Mixing · Mastering",
    price: "₦35,000 / hr",
    capacity: "Up to 4 people",
    gear: "Genelec monitors, UAD plugins, outboard compressors, Pro Tools + Logic",
    img: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1200&q=80",
  },
];

export default function StudioPage() {
  return (
    <main className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">


        <motion.div initial="hidden" animate="show" variants={fadeUp} className="mb-14">
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">Recording Studio</p>
          <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-tight">
            Rooms built for <span className="text-accent">sound.</span>
          </h1>
          <p className="text-muted mt-4 max-w-2xl text-lg">
            Three purpose-built spaces, professional engineers on call, and gear that
            respects your music. Pick a room and book a session.
          </p>
        </motion.div>

        <div className="grid gap-6">
          {rooms.map((room, i) => (
            <motion.div
              key={room.name}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: i * 0.08 }}
              className="grid md:grid-cols-[280px_1fr] gap-6 p-6 rounded-2xl bg-surface border border-border hover:border-accent/50 transition group"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src={room.img}
                  alt={room.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-xs text-accent2 uppercase tracking-widest mb-2">{room.tag}</p>
                  <h3 className="font-display text-2xl mb-2">{room.name}</h3>
                  <p className="text-muted text-sm leading-relaxed mb-4">{room.gear}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-accent" /> {room.price}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-accent" /> {room.capacity}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Music2 className="w-4 h-4 text-accent" /> Engineer included
                    </span>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-accent text-sm mt-6 hover:gap-2 transition-all w-fit"
                >
                  Book this room <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
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
          <h3 className="font-display text-2xl md:text-3xl mb-3">Not sure which room you need?</h3>
          <p className="text-muted mb-6 max-w-xl mx-auto">
            Tell us about your project — vocals, full band, mixing — and we&apos;ll recommend the right setup.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-medium hover:opacity-90 transition"
          >
            Talk to us <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}