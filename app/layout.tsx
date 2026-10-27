import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import "tailwindcss/tailwind.css"; // 👈 ADD THIS LINE
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Shegelee Multimedia — Sound. Stage. Story.",
  description:
    "Premium recording studio, musical instrument rentals, and stage, lighting & screen rentals for events. Based in Lagos, Nigeria.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body className="font-sans bg-bg text-white">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}