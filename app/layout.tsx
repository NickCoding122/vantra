import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vanta",
  description: "A private network for models and industry associates."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-black text-white flex justify-center font-sans">
          <div className="w-full max-w-[480px] px-6 py-10">{children}</div>
        </main>
      </body>
    </html>
  );
}
