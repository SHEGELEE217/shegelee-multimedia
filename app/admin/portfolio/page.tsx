"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Loader2, Save, X } from "lucide-react";

export default function AdminPortfolio() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "Concerts",
    location: "",
    event_date: "",
    scope: "",
    image_url: "",
  });

  const fetchProjects = async () => {
    const { data } = await supabase.from("portfolio").select("*").order("created_at", { ascending: false });
    if (data) setProjects(data);
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("portfolio").insert([form]);
    if (!error) {
      setIsAdding(false);
      setForm({ title: "", category: "Concerts", location: "", event_date: "", scope: "", image_url: "" });
      fetchProjects();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await supabase.from("portfolio").delete().eq("id", id);
    fetchProjects();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl mb-2">Portfolio & Events</h1>
          <p className="text-muted text-sm">Showcase your past work.</p>
        </div>
        <button onClick={() => setIsAdding(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white font-medium hover:opacity-90 transition">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <form onSubmit={handleAdd} className="p-6 rounded-2xl bg-surface border border-accent/30 mb-8 space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-display text-xl text-accent">New Project</h2>
                <button type="button" onClick={() => setIsAdding(false)} className="text-muted hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input required placeholder="Project Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-bg border border-border focus:border-accent outline-none" />
                <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-bg border border-border focus:border-accent outline-none">
                  <option>Concerts</option>
                  <option>Weddings</option>
                  <option>Corporate</option>
                  <option>Studio</option>
                </select>
                <input placeholder="Location (e.g. Eko Hotel)" value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-bg border border-border focus:border-accent outline-none" />
                <input placeholder="Date (e.g. Mar 2025)" value={form.event_date} onChange={e => setForm({...form, event_date: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-bg border border-border focus:border-accent outline-none" />
                <input required placeholder="Scope (e.g. Stage, lighting, sound)" value={form.scope} onChange={e => setForm({...form, scope: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-bg border border-border focus:border-accent outline-none md:col-span-2" />
                <input required placeholder="Image URL" value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-bg border border-border focus:border-accent outline-none md:col-span-2" />
              </div>
              <button disabled={saving} type="submit" className="flex items-center gap-2 px-6 py-2 rounded-lg bg-accent text-white font-medium">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Project
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? <Loader2 className="w-6 h-6 animate-spin text-accent" /> : (
        <div className="grid gap-4">
          {projects.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-4 p-4 rounded-2xl bg-surface border border-border">
              <img src={item.image_url} alt={item.title} className="w-20 h-20 rounded-xl object-cover border border-border" />
              <div className="flex-1">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-muted">{item.category} • {item.location}</p>
              </div>
              <button onClick={() => handleDelete(item.id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-5 h-5" /></button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}