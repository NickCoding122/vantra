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
      niche: (formData.get("niche") || "").toString().trim(),
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
    <div className="flex flex-col gap-10">
      <h1 className="text-2xl md:text-3xl font-semibold leading-snug max-w-[18ch]">
        Join the private network.
      </h1>

      <p className="text-sm opacity-80 max-w-[34ch]">
        Share your details below. Every profile is reviewed by a working model or trusted industry professional.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          name="name"
          type="text"
          placeholder="First and last name"
          className="w-full border border-white/60 bg-transparent text-sm px-3 py-2 placeholder:opacity-70 outline-none rounded-none"
        />
        <input
          name="role"
          placeholder="Role (model, photographer, stylist...)"
          className="w-full border border-white/60 bg-transparent text-sm px-3 py-2 placeholder:opacity-70 outline-none rounded-none"
        />
        <input
          name="instagram"
          type="text"
          placeholder="Instagram handle"
          className="w-full border border-white/60 bg-transparent text-sm px-3 py-2 placeholder:opacity-70 outline-none rounded-none"
        />
        <input
          name="niche"
          placeholder="Niche (runway, commercial, editorial...)"
          className="w-full border border-white/60 bg-transparent text-sm px-3 py-2 placeholder:opacity-70 outline-none rounded-none"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border border-white/60 bg-transparent text-sm px-3 py-2 placeholder:opacity-70 outline-none rounded-none"
        />
        <input
          name="agency"
          type="text"
          placeholder="Agency (optional)"
          className="w-full border border-white/60 bg-transparent text-sm px-3 py-2 placeholder:opacity-70 outline-none rounded-none"
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full border border-white px-3 py-2 text-xs tracking-[0.2em] uppercase hover:opacity-80 transition-opacity mt-4"
        >
          {submitting ? "Submitting..." : "Submit application"}
        </button>
        {status === "success" && (
          <p className="mt-3 text-sm text-gray-400">
            Application submitted. We’ll contact you if you’re a fit.
          </p>
        )}
        {status === "error" && (
          <p className="mt-3 text-sm text-red-400">
            Something went wrong. Please try again later.
          </p>
        )}
      </form>

      <p className="text-xs opacity-70 mt-3 max-w-[36ch]">
        We review every profile manually. If accepted, you’ll receive a private invite when Vantra opens in your city.
      </p>
    </div>
  );
}
