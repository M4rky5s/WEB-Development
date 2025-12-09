"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Neteisingas el. paštas arba slaptažodis");
      return;
    }

    router.push("/courses");
    router.refresh();
  }

  return (
    <main className="page">
      <div className="card">
        <h1 className="card-title">Login</h1>
        <p className="card-subtitle">
          Prisijunk su savo paskyra ir pasiek kursų sąrašą.
        </p>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit}>
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
              placeholder="••••••••"
            />
          </div>

          <div className="btn-row" style={{ marginTop: 8, marginBottom: 4 }}>
            <button type="submit" className="btn btn-primary">
              Prisijungti
            </button>
            <Link href="/">
              <button type="button" className="btn btn-secondary">
                Atgal
              </button>
            </Link>
          </div>
        </form>

        <p className="helper-text">
          Dar neturi paskyros?{" "}
          <Link href="/register" style={{ color: "#93c5fd" }}>
            Užsiregistruok čia
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
