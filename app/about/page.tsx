export default function AboutPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl md:text-3xl font-semibold leading-snug max-w-[18ch]">
        Built for models, by models.
      </h1>

      <div className="text-sm leading-relaxed opacity-80 space-y-4">
        <p>
          Vanta is a private network for models and fashion professionals, founded by a working model in Milan with over six years of experience in the industry. Every member is verified by someone who is active in the work, so you only see people who are real and current.
        </p>
        <p>
          It is a quiet alternative to promoters, open calls and unsolicited DMs. Models, photographers and stylists connect through mutual introductions instead of random outreach.
        </p>
        <p>We launch in Milan and then expand to other fashion capitals, city by city.</p>
      </div>
    </div>
  );
}
