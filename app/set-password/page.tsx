"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getAuth, confirmPasswordReset } from "firebase/auth";
import "../../../lib/firebaseClient"; // IMPORTANT: ensures client SDK is initialised

function SetPasswordInner() {
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function submit() {
    if (!oobCode) {
      setError("Invalid or missing token.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const auth = getAuth();
      await confirmPasswordReset(auth, oobCode, password);
      setSuccess(true);
    } catch (err) {
      setError("This link is invalid or has expired.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-white text-2xl font-semibold">
          Set your password
        </h1>

        {success ? (
          <p className="text-white">
            Password set successfully. You can now log in.
          </p>
        ) : (
          <>
            <input
              type="password"
              placeholder="Enter a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-white text-black placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
            />

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <button
              onClick={submit}
              disabled={loading}
              className="w-full rounded-lg bg-white text-black py-3 font-medium disabled:opacity-50"
            >
              {loading ? "Setting password…" : "Set password"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function SetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <SetPasswordInner />
    </Suspense>
  );
}
