"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCourseForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Pavadinimas privalomas.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || null,
        }),
      });

      if (!res.ok) {
        let msg = "Nepavyko sukurti kurso.";
        try {
          const data = await res.json();
          if (data?.error) msg = data.error;
        } catch {
          // ignore
        }
        setError(msg);
        return;
      }

      // išvalom formą ir atnaujinam kursų sąrašą
      setTitle("");
      setDescription("");
      router.refresh();
    } catch (err) {
      console.error("Create course err:", err);
      setError("Įvyko klaida kuriant kursą.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px" }}>
      <div>
        <label
          style={{
            display: "block",
            fontSize: "14px",
            marginBottom: "4px",
            color: "#e5e7eb",
          }}
        >
          Kurso pavadinimas
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Pvz.: Įvadas į programavimą"
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: "999px",
            border: "1px solid #374151",
            background: "#020617",
            color: "#f9fafb",
            outline: "none",
          }}
        />
      </div>

      <div>
        <label
          style={{
            display: "block",
            fontSize: "14px",
            marginBottom: "4px",
            color: "#e5e7eb",
          }}
        >
          Aprašymas (nebūtinas)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Trumpas kurso aprašymas…"
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: "16px",
            border: "1px solid #374151",
            background: "#020617",
            color: "#f9fafb",
            resize: "vertical",
            outline: "none",
          }}
        />
      </div>

      {error && (
        <p style={{ color: "#f97316", fontSize: "14px" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          justifySelf: "flex-start",
          padding: "8px 18px",
          borderRadius: "999px",
          border: "none",
          background: loading ? "#4b5563" : "#22c55e",
          color: "#0b1120",
          fontWeight: 600,
          fontSize: "14px",
          cursor: loading ? "default" : "pointer",
          boxShadow: "0 8px 20px rgba(34,197,94,0.25)",
        }}
      >
        {loading ? "Kuriama..." : "Pridėti kursą"}
      </button>
    </form>
  );
}
