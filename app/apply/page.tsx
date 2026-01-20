"use client";

import type { FormEvent } from "react";
import { useState } from "react";

export default function ApplyPage() {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setStatus("idle");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: (formData.get("name") || "").toString().trim(),
      role: (formData.get("role") || "").toString().trim(),
      instagram: (formData.get("instagram") || "").toString().trim(),
      email: (formData.get("email") || "").toString().trim(),
      agency: (formData.get("agency") || "").toString().trim(),
    };

    console.log("Submitting application payload", payload);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Apply API error", res.status, text);
        throw new Error("Request failed");
      }

      form.reset();
      setStatus("success");
    } catch (err) {
      console.error("Submit failed", err);
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex flex-col text-white">
      <section className="relative w-full overflow-hidden bg-black px-6 py-20 text-center md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_55%)]" />
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center">
          <h1 className="title-vantra mt-6 text-4xl md:text-6xl leading-tight">
            Join the private network.
          </h1>
          <p className="body-vantra mt-6 text-base md:text-lg leading-7 text-white/70">
            Share your details below. Every profile is reviewed by a professional model or trusted industry
            professional.
          </p>
        </div>
      </section>

      <section className="bg-[#0b0b0b] px-6 py-20 md:py-28">
        <div className="mx-auto w-full max-w-4xl">
          <p className="body-vantra text-sm uppercase tracking-[0.4em] text-[#cbb68e]">
            Your Details
          </p>
          <form onSubmit={handleSubmit} className="mt-10 space-y-4">
            <input
              name="name"
              type="text"
              placeholder="First and last name"
              className="body-vantra w-full border border-white/50 bg-transparent px-4 py-3 text-sm uppercase tracking-[0.2em] text-white placeholder:text-white/40 outline-none"
            />
            <input
              name="role"
              placeholder="Role (model, photographer, stylist...)"
              className="body-vantra w-full border border-white/50 bg-transparent px-4 py-3 text-sm uppercase tracking-[0.2em] text-white placeholder:text-white/40 outline-none"
            />
            <input
              name="instagram"
              type="text"
              placeholder="Instagram handle"
              className="body-vantra w-full border border-white/50 bg-transparent px-4 py-3 text-sm uppercase tracking-[0.2em] text-white placeholder:text-white/40 outline-none"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="body-vantra w-full border border-white/50 bg-transparent px-4 py-3 text-sm uppercase tracking-[0.2em] text-white placeholder:text-white/40 outline-none"
            />
            <input
              name="agency"
              type="text"
              placeholder="Agency (optional)"
              className="body-vantra w-full border border-white/50 bg-transparent px-4 py-3 text-sm uppercase tracking-[0.2em] text-white placeholder:text-white/40 outline-none"
            />
            <button
              type="submit"
              disabled={submitting}
              className="body-vantra mt-6 w-full border border-white px-6 py-4 text-sm uppercase tracking-[0.35em] text-white transition hover:bg-white hover:text-black disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit application"}
            </button>
            {status === "success" && (
              <p className="body-vantra mt-4 text-sm uppercase tracking-[0.25em] text-[#cbb68e]">
                Application submitted. We’ll contact you if you’re a fit.
              </p>
            )}
            {status === "error" && (
              <p className="body-vantra mt-4 text-sm uppercase tracking-[0.25em] text-red-300">
                Something went wrong. Please try again later.
              </p>
            )}
          </form>

          <p className="body-vantra mt-8 text-xs uppercase tracking-[0.3em] text-white/50">
            We review every profile manually. If accepted, you’ll receive a private invite when Vantra opens in your
            city.
          </p>
        </div>
      </section>
    </main>
  );
}
