"use client";

import { useState } from "react";

export default function EnrollStudentForm({ courseId }: { courseId: number }) {
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

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMessage(data.error || "Nepavyko pridėti studento");
      } else {
        setMessage(data.message || "Studentas sėkmingai pridėtas");
        setEmail("");
      }
    } catch (err) {
      console.error(err);
      setMessage("Tinklo klaida");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: "12px", marginTop: "12px" }}
    >
      <input
        type="email"
        placeholder="studentas@universitetas.lt"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{
          flex: 1,
          padding: "8px 12px",
          borderRadius: "999px",
          border: "1px solid #4b5563",
          background: "#020617",
          color: "white",
        }}
      />
      <button
        type="submit"
        disabled={loading}
        className="btn btn--primary"
      >
        {loading ? "Pridedama..." : "Pridėti"}
      </button>
      {message && (
        <p
          style={{
            marginTop: "8px",
            width: "100%",
            fontSize: "13px",
            color: message.startsWith("Studentas") ? "#4ade80" : "#f97373",
          }}
        >
          {message}
        </p>
      )}
    </form>
  );
}
