"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  courseId: number;
  initialTitle: string;
  initialDescription: string | null;
};

export default function EditCourseForm({
  courseId,
  initialTitle,
  initialDescription,
}: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const t = title.trim();
    if (!t) {
      setError("Įvesk kurso pavadinimą.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`/api/courses/${courseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: t,
          description: description.trim() || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error || `Nepavyko išsaugoti (status: ${res.status}).`);
        return;
      }

      router.push(`/courses/${courseId}`);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{
        background: "rgba(17, 24, 39, 0.65)",
        border: "1px solid rgba(148, 163, 184, 0.18)",
        borderRadius: 16,
        padding: 18,
        display: "grid",
        gap: 12,
        maxWidth: 720,
      }}
    >
      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ color: "#cbd5e1", fontSize: 14 }}>Pavadinimas</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Pvz. Duomenų bazės"
          style={{
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid rgba(148, 163, 184, 0.22)",
            background: "rgba(2, 6, 23, 0.6)",
            color: "white",
            outline: "none",
          }}
        />
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ color: "#cbd5e1", fontSize: 14 }}>Aprašymas</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Trumpas aprašymas (nebūtina)"
          rows={5}
          style={{
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid rgba(148, 163, 184, 0.22)",
            background: "rgba(2, 6, 23, 0.6)",
            color: "white",
            outline: "none",
            resize: "vertical",
          }}
        />
      </div>

      {error && (
        <div
          style={{
            color: "#fecaca",
            background: "rgba(127, 29, 29, 0.35)",
            border: "1px solid rgba(239, 68, 68, 0.35)",
            borderRadius: 12,
            padding: "10px 12px",
            fontSize: 14,
          }}
        >
          {error}
        </div>
      )}

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 14px",
            borderRadius: 999,
            border: "1px solid rgba(34, 197, 94, 0.35)",
            background: loading ? "rgba(34, 197, 94, 0.35)" : "#16a34a",
            color: "white",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 600,
          }}
        >
          {loading ? "Saugoma..." : "Išsaugoti"}
        </button>

        <button
          type="button"
          onClick={() => router.push(`/courses/${courseId}`)}
          style={{
            padding: "10px 14px",
            borderRadius: 999,
            border: "1px solid rgba(148, 163, 184, 0.25)",
            background: "transparent",
            color: "#e2e8f0",
            cursor: "pointer",
          }}
        >
          Atšaukti
        </button>
      </div>
    </form>
  );
}
