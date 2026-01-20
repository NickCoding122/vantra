export default function AboutPage() {
  return (
    <main className="flex flex-col text-white">
      <section className="relative w-full overflow-hidden bg-black px-6 py-20 text-center md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_55%)]" />
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center">
          <p className="body-vantra text-sm uppercase tracking-[0.4em] text-white/60">
            About Vantra
          </p>
          <h1 className="title-vantra mt-6 text-4xl md:text-6xl leading-tight">
            Built for models, <em className="italic">by models</em>.
          </h1>
          <p className="body-vantra mt-6 text-base md:text-lg leading-7 text-white/70">
            A private network curated by working professionals who understand the pace, privacy, and craft of
            fashion.
          </p>
        </div>
      </section>

      <section className="bg-[#0b0b0b] px-6 py-20 md:py-28">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
          <p className="body-vantra text-sm uppercase tracking-[0.4em] text-[#cbb68e]">
            Our Story
          </p>
          <div className="body-vantra text-base md:text-lg leading-8 text-white/70 space-y-6">
            <p>
              Vantra is a private network for models and fashion professionals, founded by a working model in
              Milan with over six years of experience in the industry. Every member is verified by someone who
              is active in the work, so you only see people who are real and current.
            </p>
            <p>
              It is a quiet alternative to promoters, open calls, and unsolicited DMs. Models, photographers,
              and stylists connect through mutual introductions instead of random outreach.
            </p>
            <p>We launch in Milan and then expand to other fashion capitals, city by city.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
