"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"STUDENT" | "PROFESSOR">("STUDENT");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || null,
          email: email.trim().toLowerCase(),
          password,
          role,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data?.error || "Registracija nepavyko");
        return;
      }

      router.push("/login");
    } catch (err) {
      console.error(err);
      setError("Įvyko klaida. Bandyk dar kartą.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950/60 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur">
        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-slate-100">Registracija</h1>
            <p className="text-sm text-slate-400 mt-1">
              Susikurk paskyrą ir pradėk naudotis sistema.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm text-slate-300">Vardas (nebūtina)</label>
              <input
                className="w-full rounded-xl bg-slate-900/60 border border-slate-800 px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="Pvz. Markas"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-slate-300">El. paštas</label>
              <input
                className="w-full rounded-xl bg-slate-900/60 border border-slate-800 px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="pvz. markas@gmail.com"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-slate-300">Slaptažodis</label>
              <input
                className="w-full rounded-xl bg-slate-900/60 border border-slate-800 px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="••••••••"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Role pasirinkimas (tokiu pačiu "blokų" stiliumi) */}
            <div className="space-y-2">
              <p className="text-sm text-slate-300">Rolė</p>

              <div className="grid grid-cols-2 gap-2">
                <label className={`cursor-pointer rounded-xl border px-3 py-2 text-sm transition
                  ${role === "STUDENT"
                    ? "border-blue-500 bg-blue-500/10 text-slate-100"
                    : "border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700"}`}>
                  <input
                    type="radio"
                    name="role"
                    value="STUDENT"
                    checked={role === "STUDENT"}
                    onChange={() => setRole("STUDENT")}
                    className="hidden"
                  />
                  Studentas
                </label>

                <label className={`cursor-pointer rounded-xl border px-3 py-2 text-sm transition
                  ${role === "PROFESSOR"
                    ? "border-blue-500 bg-blue-500/10 text-slate-100"
                    : "border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700"}`}>
                  <input
                    type="radio"
                    name="role"
                    value="PROFESSOR"
                    checked={role === "PROFESSOR"}
                    onChange={() => setRole("PROFESSOR")}
                    className="hidden"
                  />
                  Profesorius
                </label>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-900/40 bg-red-950/40 px-3 py-2 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:hover:bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
            >
              {loading ? "Registruojama..." : "Registruotis"}
            </button>
          </form>

          <div className="mt-6 text-sm text-slate-400">
            Jau turi paskyrą?{" "}
            <Link href="/login" className="text-blue-400 hover:text-blue-300">
              Prisijunk
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
