export default function Home() {
  return (
    <main className="flex flex-col text-white">
      <section
        className="relative min-h-screen w-full overflow-hidden bg-black"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_55%)]" />
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center lg:px-12">
          <div className="logo-vantra text-sm tracking-[0.5em]">Vantra</div>
          <h1 className="logo-vantra mt-6 text-4xl md:text-6xl lg:text-7xl tracking-[0.3em]">
            V A N T R A
          </h1>
          <p className="body-vantra mt-6 text-sm uppercase tracking-[0.35em] text-white/70">
            Private Fashion Network
          </p>
          <p className="body-vantra mt-6 max-w-[60ch] text-sm uppercase tracking-[0.3em] text-white/50">
            An invitation-only collective for those who shape the future of fashion
          </p>
          <button
            type="button"
            className="body-vantra mt-10 border border-white px-8 py-4 text-sm uppercase tracking-[0.35em] text-white hover:bg-white hover:text-black"
          >
            Request Access
          </button>
        </div>
      </section>

      <section className="bg-black px-6 py-24 md:py-32 lg:px-12">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
          <p className="body-vantra text-sm uppercase tracking-[0.4em] text-[#cbb68e]">
            The Network
          </p>
          <h2 className="title-vantra mt-6 text-4xl md:text-6xl leading-tight">
            Where visionaries connect, <em className="italic">creativity flourishes</em>
          </h2>
          <p className="body-vantra mt-6 text-base md:text-lg leading-8 text-white/70">
            Vantra is an exclusive sanctuary for fashion&apos;s most discerning minds. A
            private collective where designers, creatives, and connoisseurs converge
            to shape the future of style. Here, connections transcend the ordinary,
            and every interaction is an opportunity to inspire.
          </p>
          <div className="mt-10 h-px w-20 bg-white/30" />
        </div>
      </section>

      <section className="bg-[#0b0b0b] px-6 py-24 md:py-32 lg:px-12">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
          <p className="body-vantra text-sm uppercase tracking-[0.4em] text-[#cbb68e]">
            Membership
          </p>
          <h2 className="title-vantra mt-4 text-4xl md:text-6xl">The Vantra Experience</h2>
        </div>
        <div className="mx-auto mt-16 grid w-full max-w-6xl grid-cols-1 gap-12 md:grid-cols-2">
          {[
            {
              index: "01",
              title: "Curated Connections",
              body: "Access to an exclusive network of industry leaders, emerging talents, and visionary creators.",
            },
            {
              index: "02",
              title: "Private Events",
              body: "Invitations to intimate gatherings, runway previews, and cultural experiences worldwide.",
            },
            {
              index: "03",
              title: "First Access",
              body: "Priority access to limited collections, collaborations, and investment opportunities.",
            },
            {
              index: "04",
              title: "Creative Exchange",
              body: "A platform for meaningful dialogue, mentorship, and collaborative innovation.",
            },
          ].map((item) => (
            <div key={item.index} className="flex flex-col gap-4">
              <p className="body-vantra text-sm uppercase tracking-[0.35em] text-[#cbb68e]">
                {item.index}
              </p>
              <h3 className="title-vantra text-3xl md:text-4xl">{item.title}</h3>
              <p className="body-vantra text-base md:text-lg leading-7 text-white/70">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f1eee7] px-6 py-24 md:py-32 lg:px-12 text-black">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
          <p className="logo-vantra text-sm tracking-[0.4em]">V A N T R A</p>
          <h2 className="title-vantra mt-6 text-4xl md:text-6xl">Begin Your Journey</h2>
          <p className="body-vantra mt-6 text-base md:text-lg leading-7 text-black/60">
            Membership is by invitation or application. Submit your interest and
            our team will be in touch.
          </p>
          <form className="mt-10 flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="body-vantra w-full border border-black bg-transparent px-4 py-3 text-base uppercase tracking-[0.2em] text-black placeholder:text-black/40"
            />
            <button
              type="submit"
              className="body-vantra w-full bg-black px-6 py-3 text-sm uppercase tracking-[0.3em] text-white sm:w-auto"
            >
              Apply
            </button>
          </form>
        </div>
      </section>

    </main>
  );
}
