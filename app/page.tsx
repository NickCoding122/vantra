import Link from "next/link";

const heroImage =
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=2400&q=80";

export default function Home() {
  return (
    <main className="flex flex-col text-white">
      <section
        className="relative min-h-screen w-full overflow-hidden"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <div className="logo-vantra text-xs tracking-[0.4em]">Vantra</div>
          <h1 className="logo-vantra mt-6 text-3xl md:text-5xl tracking-[0.25em]">
            V A N T R A
          </h1>
          <p className="body-vantra mt-6 text-xs uppercase tracking-[0.3em] text-white/70">
            Private Fashion Network
          </p>
          <p className="body-vantra mt-6 max-w-[48ch] text-xs uppercase tracking-[0.28em] text-white/50">
            An invitation-only collective for those who shape the future of fashion
          </p>
          <button
            type="button"
            className="body-vantra mt-10 border border-white px-6 py-3 text-xs uppercase tracking-[0.3em] text-white hover:bg-white hover:text-black"
          >
            Request Access
          </button>
        </div>
      </section>

      <section className="bg-black px-6 py-24 md:py-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="body-vantra text-xs uppercase tracking-[0.35em] text-[#cbb68e]">
            The Network
          </p>
          <h2 className="title-vantra mt-6 text-3xl md:text-5xl leading-tight">
            Where visionaries connect, <em className="italic">creativity flourishes</em>
          </h2>
          <p className="body-vantra mt-6 text-sm md:text-base leading-8 text-white/70">
            Vantra is an exclusive sanctuary for fashion&apos;s most discerning minds. A
            private collective where designers, creatives, and connoisseurs converge
            to shape the future of style. Here, connections transcend the ordinary,
            and every interaction is an opportunity to inspire.
          </p>
          <div className="mt-10 h-px w-20 bg-white/30" />
        </div>
      </section>

      <section className="bg-[#0b0b0b] px-6 py-24 md:py-32">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <p className="body-vantra text-xs uppercase tracking-[0.35em] text-[#cbb68e]">
            Membership
          </p>
          <h2 className="title-vantra mt-4 text-3xl md:text-5xl">The Vantra Experience</h2>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2">
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
              <p className="body-vantra text-xs uppercase tracking-[0.3em] text-[#cbb68e]">
                {item.index}
              </p>
              <h3 className="title-vantra text-2xl md:text-3xl">{item.title}</h3>
              <p className="body-vantra text-sm md:text-base leading-7 text-white/70">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f1eee7] px-6 py-24 md:py-32 text-black">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="logo-vantra text-xs tracking-[0.35em]">V A N T R A</p>
          <h2 className="title-vantra mt-6 text-3xl md:text-5xl">Begin Your Journey</h2>
          <p className="body-vantra mt-6 text-sm md:text-base leading-7 text-black/60">
            Membership is by invitation or application. Submit your interest and
            our team will be in touch.
          </p>
          <form className="mt-10 flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="body-vantra w-full border border-black bg-transparent px-4 py-3 text-sm uppercase tracking-[0.2em] text-black placeholder:text-black/40"
            />
            <button
              type="submit"
              className="body-vantra w-full bg-black px-6 py-3 text-xs uppercase tracking-[0.3em] text-white sm:w-auto"
            >
              Apply
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-black px-6 py-16 text-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <p className="logo-vantra text-xs tracking-[0.35em]">V A N T R A</p>
            <div className="flex gap-6 text-xs uppercase tracking-[0.3em] text-white/70">
              <Link href="/privacy" className="hover:opacity-80">
                Privacy
              </Link>
              <Link href="/terms" className="hover:opacity-80">
                Terms
              </Link>
              <Link href="/contact" className="hover:opacity-80">
                Contact
              </Link>
            </div>
          </div>
          <p className="text-center text-[10px] uppercase tracking-[0.3em] text-white/40">
            © 2026 Vantra. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
