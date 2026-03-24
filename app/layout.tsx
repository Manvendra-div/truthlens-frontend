import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { Navbar } from "@/components/navbar";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TruthLens – AI-powered fake news detection",
  description:
    "TruthLens uses AI and community discussion to detect misinformation and surface trustworthy news.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 bg-linear-to-b from-background to-muted/40">
              {children}
            </main>
            <footer className="border-t bg-background/80">
              <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-xs text-muted-foreground md:px-6">
                <span>© {new Date().getFullYear()} TruthLens</span>
                <span>AI-powered fake news detection &amp; discussion.</span>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
