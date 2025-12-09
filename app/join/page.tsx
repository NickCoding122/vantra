export default function JoinPage() {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-2xl md:text-3xl font-semibold leading-snug max-w-[18ch]">
        Join the private network.
      </h1>

      <p className="text-sm opacity-80 max-w-[34ch]">
        Share your details below. Every profile is reviewed by a working model or trusted industry professional.
      </p>

      <form className="mt-6 space-y-4">
        <input
          type="text"
          placeholder="First and last name"
          className="w-full border border-white/60 bg-transparent text-sm px-3 py-2 placeholder:opacity-70 outline-none rounded-none"
        />
        <select
          name="role"
          defaultValue=""
          className="w-full border border-white/60 bg-transparent text-sm px-3 py-2 outline-none rounded-none"
        >
          <option value="" disabled>
            Role (model, photographer, stylist…)
          </option>
          <option value="model">Model</option>
          <option value="photographer">Photographer</option>
          <option value="stylist">Stylist</option>
          <option value="mua">Makeup artist</option>
          <option value="designer">Designer</option>
          <option value="agency">Agency / scout</option>
          <option value="other">Other</option>
        </select>
        <input
          type="text"
          placeholder="Instagram handle"
          className="w-full border border-white/60 bg-transparent text-sm px-3 py-2 placeholder:opacity-70 outline-none rounded-none"
        />
        <select
          name="niche"
          defaultValue=""
          className="w-full border border-white/60 bg-transparent text-sm px-3 py-2 outline-none rounded-none"
        >
          <option value="" disabled>
            Niche (runway, commercial, editorial…)
          </option>
          <option value="runway">Runway</option>
          <option value="commercial">Commercial</option>
          <option value="editorial">Editorial</option>
          <option value="ecommerce">E-commerce</option>
          <option value="influencer">Content / influencer</option>
          <option value="other">Other</option>
        </select>
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-white/60 bg-transparent text-sm px-3 py-2 placeholder:opacity-70 outline-none rounded-none"
        />
        <input
          type="text"
          placeholder="Agency (optional)"
          className="w-full border border-white/60 bg-transparent text-sm px-3 py-2 placeholder:opacity-70 outline-none rounded-none"
        />
        <button
          type="button"
          className="w-full border border-white px-3 py-2 text-xs tracking-[0.2em] uppercase hover:opacity-80 transition-opacity mt-4"
        >
          Submit application
        </button>
      </form>

      <p className="text-xs opacity-70 mt-3 max-w-[36ch]">
        We review every profile manually. If accepted, you’ll receive a private invite when Vanta opens in your city.
      </p>
    </div>
  );
}
