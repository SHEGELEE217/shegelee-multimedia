"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Mail, Phone, Calendar, Loader2, Inbox } from "lucide-react";

export default function AdminOverview() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setInquiries(data);
      }
      setLoading(false);
    };

    fetchInquiries();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-3 text-muted">
        <Loader2 className="w-5 h-5 animate-spin text-accent" />
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl mb-2">Welcome back</h1>
        <p className="text-muted text-sm">Here is what is happening with Shegelee Multimedia today.</p>
      </div>

      {/* Stats row */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-2xl bg-surface border border-border">
          <p className="text-sm text-muted mb-2">Total Inquiries</p>
          <p className="font-display text-4xl text-accent">{inquiries.length}</p>
        </div>
        <div className="p-6 rounded-2xl bg-surface border border-border">
          <p className="text-sm text-muted mb-2">Pending Bookings</p>
          <p className="font-display text-4xl">0</p>
        </div>
        <div className="p-6 rounded-2xl bg-surface border border-border">
          <p className="text-sm text-muted mb-2">Active Rentals</p>
          <p className="font-display text-4xl">0</p>
        </div>
      </div>

      {/* Inbox */}
      <div className="pt-6">
        <div className="flex items-center gap-3 mb-6">
          <Inbox className="w-6 h-6 text-accent" />
          <h2 className="font-display text-2xl">Recent Inquiries</h2>
        </div>

        {inquiries.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-border bg-surface border-dashed">
            <p className="text-muted">No messages yet. When a client uses the contact form, it will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {inquiries.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-2xl bg-surface border border-border"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-medium text-lg">{msg.name}</h3>
                    <div className="flex flex-wrap gap-4 text-xs text-muted mt-1">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {msg.email}</span>
                      {msg.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {msg.phone}</span>}
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs whitespace-nowrap">
                    {msg.service}
                  </span>
                </div>
                
                <p className="text-sm text-gray-300 leading-relaxed bg-bg/50 p-4 rounded-xl border border-border/50">
                  &quot;{msg.message}&quot;
                </p>
                
                <p className="text-xs text-muted mt-4 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> 
                  {new Date(msg.created_at).toLocaleDateString("en-NG", {
                    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                  })}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}