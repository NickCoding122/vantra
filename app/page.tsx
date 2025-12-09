import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <div className="text-xs tracking-[0.25em] uppercase">VANTA</div>

      <div className="flex flex-col gap-4">
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight max-w-[14ch]">
          A private network for models in Milan.
        </h1>
        <p className="text-sm md:text-base opacity-80 mt-4 max-w-[34ch]">
          Verified profiles only. Built for models, by models.
        </p>
      </div>

      <div className="flex flex-col">
        <Link
          href="/join"
          className="inline-flex items-center justify-center border border-white px-6 py-2 text-xs tracking-[0.2em] uppercase hover:opacity-80 transition-opacity"
        >
          Apply to join
        </Link>
        <Link
          href="/about"
          className="text-xs opacity-70 mt-4 underline-offset-4 hover:underline"
        >
          About Vanta
        </Link>
      </div>
    </div>
  );
}
