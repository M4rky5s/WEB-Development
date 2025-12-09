"use client";

import { useState } from "react";

interface Props {
  courseId: number;
}

export default function AddStudentForm({ courseId }: Props) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const res = await fetch(`/api/courses/${courseId}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Nepavyko pridėti studento");
      } else {
        setMessage("Studentas sėkmingai pridėtas!");
        setEmail("");
      }
    } catch (err) {
      console.error(err);
      setMessage("Įvyko klaida.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}
    >
      <input
        type="email"
        placeholder="studento@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{
          padding: "8px 10px",
          borderRadius: "999px",
          border: "1px solid #374151",
          background: "#020617",
          color: "white",
          minWidth: "220px",
        }}
      />
      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "8px 16px",
          borderRadius: "999px",
          border: "none",
          background: loading ? "#4b5563" : "#10b981",
          color: "white",
          cursor: loading ? "default" : "pointer",
        }}
      >
        {loading ? "Pridedama..." : "Pridėti"}
      </button>
      {message && (
        <span style={{ color: "#f97316", fontSize: "14px" }}>{message}</span>
      )}
    </form>
  );
}
