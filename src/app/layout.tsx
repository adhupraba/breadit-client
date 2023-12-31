import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/Toaster";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Breadit",
  description: "A Reddit clone built with Next.js, TypeScript and Go.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children, authModal }: { children: React.ReactNode; authModal: React.ReactNode }) {
  return (
    <html lang="en" className={cn("bg-white text-slate-900 antialiased light", inter.className)}>
      <body className="min-h-screen pt-12 bg-slate-50 antialiased">
        <Providers>
          {/* @ts-ignore */}
          <Navbar />
          {authModal}
          <div className="container max-w-7xl mx-auto h-full pt-12">{children}</div>
          <Analytics />
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
