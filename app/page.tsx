import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h1 className="title-vantra text-4xl md:text-5xl font-semibold leading-tight max-w-[14ch]">
          A private network for models.
        </h1>
        <p className="text-sm md:text-base opacity-80 mt-4 max-w-[34ch]">
          Verified profiles only. Built for models and fashion professionals.
        </p>
      </div>

      <div className="flex flex-col">
        <Link
          href="/apply"
          className="border border-white px-6 py-3 text-xs tracking-[0.2em] uppercase hover:opacity-80 transition-opacity"
        >
          Apply to join
        </Link>
      </div>
    </div>
  );
}
