"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Nepavyko užregistruoti");
      return;
    }

    router.push("/login");
  }

  return (
    <main className="page">
      <div className="card">
        <h1 className="card-title">Registracija</h1>
        <p className="card-subtitle">
          Susikurk paskyrą ir gauk prieigą prie universiteto kursų sistemos.
        </p>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Vardas (nebūtina)</label>
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jonas"
            />
          </div>

          <div className="form-group">
            <label className="label">El. paštas</label>
            <input
              className="input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jonas@example.com"
            />
          </div>

          <div className="form-group">
            <label className="label">Slaptažodis</label>
            <input
              className="input"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Bent 6 simboliai"
            />
          </div>

          <div className="btn-row" style={{ marginTop: 8, marginBottom: 4 }}>
            <button type="submit" className="btn btn-primary">
              Registruotis
            </button>
            <Link href="/">
              <button type="button" className="btn btn-secondary">
                Atgal
              </button>
            </Link>
          </div>
        </form>

        <p className="helper-text">
          Jau turi paskyrą?{" "}
          <Link href="/login" style={{ color: "#93c5fd" }}>
            Prisijunk čia
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
