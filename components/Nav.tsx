"use client";

import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex gap-6 text-xs tracking-[0.18em] uppercase">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/apply">Apply</Link>
    </nav>
  );
}
