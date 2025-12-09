"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCoursePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Nepavyko sukurti kurso");
        return;
      }

      // redirectinam į kursų sąrašą
      router.push("/courses");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Vidinė klaida");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: "32px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "16px" }}>Naujas kursas</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "4px" }}>
            Pavadinimas
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px 10px",
              borderRadius: 8,
              border: "1px solid #d1d5db",
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "4px" }}>
            Aprašymas
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            style={{
              width: "100%",
              padding: "8px 10px",
              borderRadius: 8,
              border: "1px solid #d1d5db",
            }}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "fit-content",
            padding: "8px 14px",
            borderRadius: 999,
            border: "none",
            background: "#2563eb",
            color: "white",
            cursor: "pointer",
          }}
        >
          {loading ? "Kuriama..." : "Sukurti"}
        </button>
      </form>
    </main>
  );
}
