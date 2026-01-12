"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SetPasswordPage() {
  const params = useSearchParams();
  const token = params.get("t");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleContinue() {
    if (!token) return;

    setLoading(true);
    setError(null);

    const res = await fetch("/api/auth/set-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      setLoading(false);
      return;
    }

    window.location.href = data.redirectUrl;
  }

  return (
    <main style={{ background: "#000", color: "#fff", minHeight: "100vh", padding: 40 }}>
      <h1>Set your password</h1>
      <p>You’re almost in.</p>

      <button
        onClick={handleContinue}
        disabled={loading}
        style={{
          marginTop: 24,
          padding: "12px 24px",
          background: "#fff",
          color: "#000",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "Loading…" : "Continue"}
      </button>

      {error && <p style={{ color: "red", marginTop: 16 }}>{error}</p>}
    </main>
  );
}
