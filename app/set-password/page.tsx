"use client";

import { Suspense, useState } from "react";
import type { FormEvent } from "react";
import { useSearchParams } from "next/navigation";

function SetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!token) {
      setError("Missing token. Please use the link from your email.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/set-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error ?? "Unable to set password.");
        return;
      }

      setSuccess(true);
      setPassword("");
    } catch {
      setError("Unable to set password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2">
        <h1 className="title-vantra text-3xl font-semibold">Set your password</h1>
        <p className="text-sm text-white/70">
          Create a password to activate your Vantra account.
        </p>
      </div>

      {success ? (
        <div className="space-y-3">
          <p className="text-sm text-emerald-300">
            Password set successfully.
          </p>
          <p className="text-sm text-white/70">
            You can now sign in. Return to the app to continue.
          </p>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded border border-white/30 bg-black px-3 py-2 text-white placeholder:text-white/40 focus:border-white focus:outline-none"
            placeholder="At least 8 characters"
            required
          />

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <button
            type="submit"
            className="w-full rounded border border-white py-2 text-sm uppercase tracking-[0.2em] transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Setting password..." : "Set password"}
          </button>
        </form>
      )}
    </div>
  );
}

export default function SetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6 py-12 text-white">
      <Suspense fallback={<div className="text-sm text-white/70">Loading…</div>}>
        <SetPasswordForm />
      </Suspense>
    </div>
  );
}
