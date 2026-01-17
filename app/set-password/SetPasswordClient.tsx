"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SetPasswordClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function submit() {
    if (!token) {
      setMessage("Invalid or missing token.");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    setMessage(null);

    const res = await fetch("/api/auth/set-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error ?? "Something went wrong.");
    } else {
      setMessage("Password set successfully. You can now log in.");
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: 320 }}>
        <h1 className="title-vantra text-2xl font-semibold mb-4">Set your password</h1>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 12,
            borderRadius: 8,
            border: "none",
          }}
        />

        <button
          onClick={submit}
          disabled={loading}
          style={{
            width: "100%",
            padding: 12,
            background: "white",
            color: "black",
            borderRadius: 8,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {loading ? "Setting…" : "Set password"}
        </button>

        {message && (
          <p style={{ marginTop: 12, opacity: 0.8 }}>{message}</p>
        )}
      </div>
    </div>
  );
}
