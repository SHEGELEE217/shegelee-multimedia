"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Search, Tag, Package } from "lucide-react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

type Category = "All" | "Guitars" | "Keyboards" | "Drums" | "Sound";

const instruments = [
  {
    name: "Fender Stratocaster",
    category: "Guitars" as Category,
    price: "₦15,000 / day",
    deposit: "₦50,000 deposit",
    img: "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=800&q=80",
  },
  {
    name: "Gibson Les Paul",
    category: "Guitars" as Category,
    price: "₦20,000 / day",
    deposit: "₦80,000 deposit",
    img: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=800&q=80",
  },
  {
    name: "Yamaha Motif XF",
    category: "Keyboards" as Category,
    price: "₦25,000 / day",
    deposit: "₦100,000 deposit",
    img: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80",
  },
  {
    name: "Roland RD-2000",
    category: "Keyboards" as Category,
    price: "₦22,000 / day",
    deposit: "₦90,000 deposit",
    img: "https://images.unsplash.com/photo-1571974599782-87624638275e?w=800&q=80",
  },
  {
    name: "Pearl Export Kit",
    category: "Drums" as Category,
    price: "₦30,000 / day",
    deposit: "₦120,000 deposit",
    img: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&q=80",
  },
  {
    name: "Roland TD-27 V-Drums",
    category: "Drums" as Category,
    price: "₦28,000 / day",
    deposit: "₦110,000 deposit",
    img: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
  },
  {
    name: "JBL SRX828 Subwoofer",
    category: "Sound" as Category,
    price: "₦18,000 / day",
    deposit: "₦70,000 deposit",
    img: "https://images.unsplash.com/photo-1545128485-c400e7702796?w=800&q=80",
  },
  {
    name: "Shure SM58 Pack (x4)",
    category: "Sound" as Category,
    price: "₦8,000 / day",
    deposit: "₦25,000 deposit",
    img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80",
  },
];

const categories: Category[] = ["All", "Guitars", "Keyboards", "Drums", "Sound"];

export default function InstrumentsPage() {
  const [active, setActive] = useState<Category>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return instruments.filter((i) => {
      const matchesCategory = active === "All" || i.category === active;
      const matchesQuery = i.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [active, query]);

  return (
    <main className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted hover:text-white text-sm mb-8 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back home
        </Link>

        <motion.div initial="hidden" animate="show" variants={fadeUp} className="mb-10">
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">Instrument Rentals</p>
          <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-tight">
            Gear that <span className="text-accent">performs.</span>
          </h1>
          <p className="text-muted mt-4 max-w-2xl text-lg">
            Professional instruments and sound gear available by the day or week — delivered
            across Lagos. Filter below and request what you need.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-4 py-2 rounded-full text-sm border transition ${
                  active === c
                    ? "bg-accent text-white border-accent"
                    : "bg-surface text-muted border-border hover:border-accent/50 hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search gear..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-surface border border-border focus:border-accent outline-none text-sm"
            />
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
                className="rounded-2xl bg-surface border border-border overflow-hidden hover:border-accent/50 transition group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur text-xs text-white">
                    {item.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg mb-1">{item.name}</h3>
                  <div className="flex flex-col gap-1 text-sm text-muted mb-4">
                    <span className="inline-flex items-center gap-1.5">
                      <Tag className="w-4 h-4 text-accent" /> {item.price}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Package className="w-4 h-4 text-accent" /> {item.deposit}
                    </span>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1 text-accent text-sm hover:gap-2 transition-all"
                  >
                    Request rental <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-muted text-center py-16">No gear matches that filter. Try another category.</p>
        )}

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-16 rounded-2xl border border-border bg-surface p-8 md:p-12 text-center"
        >
          <h3 className="font-display text-2xl md:text-3xl mb-3">Need something not listed?</h3>
          <p className="text-muted mb-6 max-w-xl mx-auto">
            We source specialty gear on request — tell us what you need and we&apos;ll get it to you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-medium hover:opacity-90 transition"
          >
            Make a request <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}