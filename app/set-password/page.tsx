"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { confirmPasswordReset, getAuth } from "firebase/auth";
import "../../lib/firebaseClient";

function SetPasswordForm() {
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!oobCode) {
      setError("Invalid or missing password reset code.");
      return;
    }

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    setIsSubmitting(true);
    try {
      const auth = getAuth();
      await confirmPasswordReset(auth, oobCode, password);
      setSuccess(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to set password.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="w-full max-w-md space-y-4 text-center">
          <h1 className="text-2xl font-semibold">Password set</h1>
          <p>Your password has been updated. You can now log in.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-semibold">Set your password</h1>
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">
            New password
          </label>
          <input
            id="password"
            name="password"
            type="text"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded border border-white/20 bg-black px-3 py-2 text-white"
            placeholder="Enter your new password"
          />
        </div>
        {error ? (
          <div className="rounded border border-red-500/60 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {error}
          </div>
        ) : null}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-white px-4 py-2 text-black transition disabled:opacity-60"
        >
          {isSubmitting ? "Setting password..." : "Set password"}
        </button>
      </form>
    </div>
  );
}

export default function SetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-black text-white">
          <p>Loading...</p>
        </div>
      }
    >
      <SetPasswordForm />
    </Suspense>
  );
}
