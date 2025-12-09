"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCoursePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Nepavyko sukurti kurso");
      return;
    }

    router.push("/courses");
  }

  return (
    <main className="page">
      <div className="card">
        <h1 className="card-title">Sukurti kursą</h1>
        <p className="card-subtitle">
          Užpildyk formą ir pridėk naują kursą į sąrašą.
        </p>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Pavadinimas</label>
            <input
              className="input"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Pvz. Programavimas 101"
            />
          </div>

          <div className="form-group">
            <label className="label">Aprašymas</label>
            <textarea
              className="input"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Trumpai aprašyk kursą"
            />
          </div>

          <div className="btn-row" style={{ marginTop: 8 }}>
            <button type="submit" className="btn btn-primary">
              Išsaugoti
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => router.push("/courses")}
            >
              Atšaukti
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
