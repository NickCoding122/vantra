import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import Nav from "../components/Nav";
import { vantraSans, vantraSerif } from "./fonts";

export const metadata: Metadata = {
  title: "Vantra",
  description: "A private network for models and industry associates.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png"
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png"
      },
      {
        url: "/favicon.ico",
        type: "image/x-icon"
      }
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${vantraSerif.variable} ${vantraSans.variable}`}>
      <body className="bg-black text-white font-sans">
        <main className="min-h-screen bg-black text-white flex justify-center">
          <div className="w-full max-w-none px-6 py-10 md:px-12 md:py-20 flex flex-col gap-12 min-h-screen">
            <header className="flex items-center justify-between mb-16">
              <div className="logo-vantra text-xs">V A N T R A</div>
              <Nav />
            </header>
            {children}
            <footer className="mt-auto w-full text-white">
              <div className="flex w-full flex-col gap-8">
                <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                  <p className="logo-vantra text-sm tracking-[0.4em]">V A N T R A</p>
                  <div className="flex gap-6 text-sm uppercase tracking-[0.3em] text-white/70">
                    <Link href="/privacy" className="hover:opacity-80">
                      Privacy
                    </Link>
                    <Link href="/terms" className="hover:opacity-80">
                      Terms
                    </Link>
                    <a
                      href="mailto:info@vantra.app"
                      className="hover:opacity-80"
                    >
                      Contact
                    </a>
                  </div>
                </div>
                <p className="text-center text-[10px] uppercase tracking-[0.3em] text-white/40">
                  © 2026 Vantra. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </main>
      </body>
    </html>
  );
}
