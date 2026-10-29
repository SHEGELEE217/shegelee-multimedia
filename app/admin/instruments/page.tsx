"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Loader2, Save, X } from "lucide-react";

export default function AdminInstruments() {
  const [instruments, setInstruments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form state
  const [form, setForm] = useState({
    name: "",
    category: "Guitars",
    price: "",
    deposit: "",
    image_url: "",
  });

  // Fetch instruments
  const fetchInstruments = async () => {
    const { data, error } = await supabase
      .from("instruments")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (!error && data) setInstruments(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchInstruments();
  }, []);

  // Add instrument
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("instruments").insert([form]);
    
    if (error) {
      alert("Error adding instrument: " + error.message);
    } else {
      setIsAdding(false);
      setForm({ name: "", category: "Guitars", price: "", deposit: "", image_url: "" });
      fetchInstruments(); // Refresh list
    }
    setSaving(false);
  };

  // Delete instrument
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this instrument?")) return;
    
    const { error } = await supabase.from("instruments").delete().eq("id", id);
    if (!error) fetchInstruments();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl mb-2">Instrument Inventory</h1>
          <p className="text-muted text-sm">Manage the gear available for rent.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white font-medium hover:opacity-90 transition"
        >
          <Plus className="w-4 h-4" /> Add Instrument
        </button>
      </div>

      {/* Add Form Modal */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleAdd} className="p-6 rounded-2xl bg-surface border border-accent/30 mb-8 space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-display text-xl text-accent">New Instrument</h2>
                <button type="button" onClick={() => setIsAdding(false)} className="text-muted hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted mb-1">Name</label>
                  <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-bg border border-border focus:border-accent outline-none" placeholder="e.g. Fender Stratocaster" />
                </div>
                <div>
                  <label className="block text-sm text-muted mb-1">Category</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-bg border border-border focus:border-accent outline-none">
                    <option>Guitars</option>
                    <option>Keyboards</option>
                    <option>Drums</option>
                    <option>Sound</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-muted mb-1">Price per day</label>
                  <input required value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-bg border border-border focus:border-accent outline-none" placeholder="e.g. ₦15,000 / day" />
                </div>
                <div>
                  <label className="block text-sm text-muted mb-1">Deposit</label>
                  <input value={form.deposit} onChange={e => setForm({...form, deposit: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-bg border border-border focus:border-accent outline-none" placeholder="e.g. ₦50,000 deposit" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-muted mb-1">Image URL</label>
                  <input required value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-bg border border-border focus:border-accent outline-none" placeholder="https://images.unsplash.com/..." />
                </div>
              </div>
              
              <button disabled={saving} type="submit" className="flex items-center gap-2 px-6 py-2 rounded-lg bg-accent text-white font-medium hover:opacity-90 transition mt-2">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? "Saving..." : "Save Instrument"}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inventory List */}
      {loading ? (
        <div className="flex items-center gap-3 text-muted"><Loader2 className="w-5 h-5 animate-spin text-accent" /> Loading gear...</div>
      ) : instruments.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-border bg-surface border-dashed">
          <p className="text-muted">No instruments in the database yet. Click "Add Instrument" to start.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {instruments.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-surface border border-border"
            >
              <img src={item.image_url} alt={item.name} className="w-20 h-20 rounded-xl object-cover border border-border" />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted">{item.category} • {item.price}</p>
              </div>
              <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition">
                <Trash2 className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}