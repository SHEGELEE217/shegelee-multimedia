"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { LayoutDashboard, Inbox, Guitar, Mic2, Image as ImageIcon, LogOut, Loader2 } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Protect the route
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      // If no session and not on the login page, redirect to login
      if (!session && pathname !== "/admin/login") {
        router.push("/admin/login");
      } else {
        setLoading(false);
      }
    };
    checkUser();
  }, [router, pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  // Don't show the sidebar on the login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg text-accent">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const navItems = [
    { name: "Overview & Inbox", href: "/admin", icon: LayoutDashboard },
    { name: "Instruments", href: "/admin/instruments", icon: Guitar },
    { name: "Studios", href: "/admin/studios", icon: Mic2 },
    { name: "Portfolio", href: "/admin/portfolio", icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen flex bg-bg text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-surface hidden md:flex flex-col">
        <div className="p-6 border-b border-border">
          <Link href="/" className="font-display text-lg tracking-tight">
            SHEGELEE <span className="text-accent">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm ${
                  isActive
                    ? "bg-accent/10 text-accent font-medium"
                    : "text-muted hover:text-white hover:bg-bg"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 transition text-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Mobile Header */}
        <header className="md:hidden p-4 border-b border-border flex items-center justify-between bg-surface">
          <span className="font-display">SHEGELEE Admin</span>
          <button onClick={handleLogout} className="text-red-400">
            <LogOut className="w-5 h-5" />
          </button>
        </header>
        
        <div className="p-6 md:p-10 max-w-6xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}