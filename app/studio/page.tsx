"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Users, Music2 } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function StudioPage() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await supabase.from("studios").select("*");
      if (data) setRooms(data);
      setLoading(false);
    };
    fetchRooms();
  }, []);

  return (
    <main className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted hover:text-white text-sm mb-8 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back home
        </Link>

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

        {loading && <p className="text-muted text-center py-10">Loading rooms...</p>}

        <div className="grid gap-6">
          {rooms.map((room, i) => (
            <motion.div
              key={room.id}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: i * 0.08 }}
              className="grid md:grid-cols-[280px_1fr] gap-6 p-6 rounded-2xl bg-surface border border-border hover:border-accent/50 transition group"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src={room.image_url}
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