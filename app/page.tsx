import React from "react";

export default function HomePage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main className="min-h-screen px-6 py-8 text-white">
      <div className="max-w-xl space-y-6">
        <div className="text-sm font-semibold tracking-tight">VANTA</div>

        <p className="font-serif text-4xl font-semibold leading-tight md:text-5xl mt-16 mb-12 max-w-[14ch]">
          A private network for models in Milan.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="First and last name"
            className="w-full border border-white/60 bg-transparent px-3 py-2 text-white"
          />
          <input
            type="text"
            name="instagram"
            placeholder="Instagram handle"
            className="w-full border border-white/60 bg-transparent px-3 py-2 text-white"
          />
          <input
            type="text"
            name="niche"
            placeholder="Niche"
            className="w-full border border-white/60 bg-transparent px-3 py-2 text-white"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border border-white/60 bg-transparent px-3 py-2 text-white"
          />
          <input
            type="text"
            name="agency"
            placeholder="Signed with agency (optional)"
            className="w-full border border-white/60 bg-transparent px-3 py-2 text-white"
          />

          <button
            type="submit"
            className="w-full border border-white bg-transparent px-3 py-3 text-sm font-semibold tracking-tight transition-opacity hover:opacity-80"
          >
            Submit application
          </button>

          <p className="text-sm opacity-70 mt-4">
            We review every profile manually. If accepted, you’ll receive a private invite when
            Vanta opens in your city.
          </p>
        </form>

        <div className="pt-12 space-y-2">
          <div className="text-xs tracking-wide">FOUNDED BY A WORKING MODEL</div>
          <p className="text-sm leading-relaxed">
            Founded by a working model in Milan with six years in the industry. Vanta verifies every
            profile so models can connect with other models, photographers, stylists, and agencies
            already active in the city without dealing with fake accounts or filtering through
            hundreds of unsolicited DMs. It also gives newcomers a vetted way to meet peers, reducing
            the isolation most models face when they arrive.
          </p>
        </div>
      </div>
    </main>
  );
}
