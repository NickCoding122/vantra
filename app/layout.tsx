import type { Metadata } from "next";
import "./globals.css";
import Nav from "../components/Nav";

export const metadata: Metadata = {
  title: "Vanta",
  description: "A private network for models and industry associates.",
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-black text-white flex justify-center">
          <div className="w-full max-w-[480px] md:max-w-[720px] px-6 py-10 md:py-20 flex flex-col gap-12">
            <header className="flex items-center justify-between mb-16">
              <div className="text-xs tracking-[0.25em] uppercase">VANTA</div>
              <Nav />
            </header>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
