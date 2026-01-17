import type { Metadata } from "next";
import "./globals.css";
import Nav from "../components/Nav";
import { vantraSans, vantraSerif } from "./fonts";

export const metadata: Metadata = {
  title: "Vantra",
  description: "A private network for models and industry associates.",
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
        url: "/favicon.ico"
      }
    ],
    apple: "/apple-touch-icon.png"
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
          <div className="w-full max-w-[480px] md:max-w-[720px] px-6 py-10 md:py-20 flex flex-col gap-12 min-h-screen">
            <header className="flex items-center justify-between mb-16">
              <div className="logo-vantra text-xs">V A N T R A</div>
              <Nav />
            </header>
            {children}
            <footer className="mt-auto flex items-center gap-4 text-xs text-white/70">
              <a className="hover:text-white/90 transition-opacity" href="/privacy">
                Privacy
              </a>
              <span aria-hidden="true">•</span>
              <a className="hover:text-white/90 transition-opacity" href="/terms">
                Terms of Service
              </a>
            </footer>
          </div>
        </main>
      </body>
    </html>
  );
}
