export default function AboutPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-xs tracking-[0.25em] uppercase">About Vanta</div>

      <h1 className="text-2xl md:text-3xl font-semibold leading-snug max-w-[18ch]">
        Built for models, by models.
      </h1>

      <div className="text-sm leading-relaxed opacity-80 space-y-4">
        <p>
          Vanta is a private network for models in Milan. Every member is verified by a working model, so you only see people who
          are real and active in the industry.
        </p>
        <p>
          It is a quiet alternative to promoters, open calls and unsolicited DMs. Models, photographers and stylists connect
          through mutual introductions instead of random outreach.
        </p>
        <p>We start in Milan, then expand to other fashion cities.</p>
      </div>
    </div>
  );
}
