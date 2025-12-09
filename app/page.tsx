export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <div className="text-sm tracking-[0.25em] uppercase">VANTA</div>

      <div className="text-4xl md:text-5xl font-semibold leading-tight mt-10 max-w-[14ch]">
        A private network for models in Milan.
      </div>

      <form className="mt-10 space-y-4">
        <div className="flex flex-col">
          <label className="text-xs mb-1 opacity-70">First and last name</label>
          <input
            className="w-full border border-white/60 bg-transparent text-sm px-3 py-2 outline-none"
            placeholder="First and last name"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs mb-1 opacity-70">Instagram handle</label>
          <input
            className="w-full border border-white/60 bg-transparent text-sm px-3 py-2 outline-none"
            placeholder="@username"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs mb-1 opacity-70">Niche</label>
          <input
            className="w-full border border-white/60 bg-transparent text-sm px-3 py-2 outline-none"
            placeholder="Runway, commercial, editorial…"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs mb-1 opacity-70">Email</label>
          <input
            className="w-full border border-white/60 bg-transparent text-sm px-3 py-2 outline-none"
            placeholder="name@example.com"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs mb-1 opacity-70">Signed with agency (optional)</label>
          <input
            className="w-full border border-white/60 bg-transparent text-sm px-3 py-2 outline-none"
            placeholder="Agency name (optional)"
          />
        </div>

        <button
          type="button"
          className="w-full border border-white px-3 py-2 text-sm tracking-wide uppercase mt-4 hover:opacity-80 transition-opacity"
        >
          Submit application
        </button>

        <div className="text-sm opacity-70 mt-3">
          We review every profile manually. If accepted, you’ll receive a private invite when Vanta opens in your city.
        </div>
      </form>

      <section className="mt-12 space-y-2">
        <div className="text-xs tracking-[0.25em] uppercase">Founded by a working model</div>
        <p className="text-sm leading-relaxed">
          Founded by a working model in Milan with six years in the industry. Vanta verifies every profile so models can
          connect with other models, photographers, stylists, and agencies already active in the city without dealing with
          fake accounts or filtering through hundreds of unsolicited DMs. It also gives newcomers a vetted way to meet
          peers, reducing the isolation most models face when they arrive.
        </p>
      </section>
    </div>
  );
}
