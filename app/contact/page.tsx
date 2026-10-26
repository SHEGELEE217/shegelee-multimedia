"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Phone, MapPin, MessageCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const services = ["Recording session", "Instrument rental", "Event equipment", "Full production", "Other"];

export default function ContactPage() {
   const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: services[0],
    message: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "a39e485a-f89d-4e12-86dc-6df9024cc9fe", // 👈 Paste your key here!
          ...form,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSent(true);
      } else {
        alert("Something went wrong. Please try again or reach us on WhatsApp.");
      }
    } catch (error) {
      alert("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-6">
      

        <motion.div initial="hidden" animate="show" variants={fadeUp} className="mb-12">
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">Contact</p>
          <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-tight">
            Let&apos;s make <span className="text-accent">something.</span>
          </h1>
          <p className="text-muted mt-4 max-w-2xl text-lg">
            Tell us what you need — a session, a rental, or a full event. We&apos;ll reply within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10">
          {/* Contact info */}
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="space-y-6">
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <h2 className="font-display text-xl mb-4">Reach us directly</h2>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white">+234 814 025 3666</p>
                    <p className="text-muted">Mon–Sat, 9am–7pm</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white">samwebstudios01@gmail.com</p>
                    <p className="text-muted">We reply within 24 hours</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white">Lagos, Nigeria</p>
                    <p className="text-muted">Studio visits by appointment</p>
                  </div>
                </li>
              </ul>
            </div>

            <a
              href="https://wa.me/2348140253666"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition"
            >
              <MessageCircle className="w-6 h-6 text-[#25D366]" />
              <div>
                <p className="text-white text-sm font-medium">Chat on WhatsApp</p>
                <p className="text-muted text-xs">Fastest way to reach us</p>
              </div>
            </a>
          </motion.div>

          {/* Form */}
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="p-6 md:p-8 rounded-2xl bg-surface border border-border">
            {sent ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-14 h-14 text-accent mx-auto mb-4" />
                <h2 className="font-display text-2xl mb-2">Message received</h2>
                <p className="text-muted mb-6">
                  Thanks {form.name || "there"} — we&apos;ll get back to you at {form.email || "your email"} within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", email: "", phone: "", service: services[0], message: "" });
                  }}
                  className="text-accent text-sm hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-muted mb-2">Your name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-bg border border-border focus:border-accent outline-none"
                    placeholder="Full name"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-muted mb-2">Email</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-bg border border-border focus:border-accent outline-none"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted mb-2">Phone</label>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-bg border border-border focus:border-accent outline-none"
                      placeholder="+234 ..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-muted mb-2">What do you need?</label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-bg border border-border focus:border-accent outline-none"
                  >
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-muted mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-bg border border-border focus:border-accent outline-none resize-none"
                    placeholder="Tell us about your project, dates, and budget..."
                  />
                </div>
                               <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-accent text-white font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}