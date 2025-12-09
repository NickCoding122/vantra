"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Nav() {
  const router = useRouter();
  const pathname = usePathname();

  const currentPath = pathname.startsWith("/join")
    ? "/join"
    : pathname.startsWith("/about")
      ? "/about"
      : "/";

  return (
    <nav className="flex items-center gap-4 text-white">
      <div className="hidden sm:flex gap-6 text-xs tracking-[0.18em] uppercase">
        <Link href="/">Home</Link>
        <Link href="/join">Apply</Link>
        <Link href="/about">About</Link>
      </div>
      <select
        value={currentPath}
        onChange={(e) => router.push(e.target.value)}
        className="sm:hidden bg-transparent border border-white/60 text-xs px-2 py-1 rounded-none"
      >
        <option value="/">Home</option>
        <option value="/join">Apply</option>
        <option value="/about">About</option>
      </select>
    </nav>
  );
}
