"use client";

import { Sora, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body className="font-sans bg-bg text-white">
        {/* Only show Navbar if NOT on an admin page */}
        {!isAdmin && <Navbar />}
        
        {children}
        
        {/* Only show Footer if NOT on an admin page */}
        {!isAdmin && <Footer />}
      </body>
    </html>
  );
}