"use client";

import { useEffect, useState } from "react";

type Student = {
  id: number;
  name: string | null;
  email: string;
  role?: string;
};

export default function StudentListClient({ courseId }: { courseId: number }) {
  const [students, setStudents] = useState<Student[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadStudents() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/courses/${courseId}/students`, {
        cache: "no-store",
      });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.error || "Nepavyko gauti studentų");
        return;
      }

      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Tinklo klaida");
    } finally {
      setLoading(false);
    }
  }

  function handleToggle() {
    const newOpen = !open;
    setOpen(newOpen);
    if (newOpen && students.length === 0) {
      loadStudents();
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleToggle}
        className="btn btn--outline"
        style={{ marginBottom: "12px" }}
      >
        {open ? "Slėpti studentų sąrašą" : "Peržiūrėti pridėtų studentų sąrašą"}
      </button>

      {open && (
        <div>
          {loading && <p>Kraunama...</p>}
          {error && <p className="form__error">{error}</p>}

          {!loading && !error && students.length === 0 && (
            <p className="card__meta">Šiame kurse dar nėra studentų.</p>
          )}

          {!loading && !error && students.length > 0 && (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {students.map((s) => (
                <li
                  key={s.id}
                  style={{
                    padding: "8px 10px",
                    borderRadius: "10px",
                    background: "#020617",
                    border: "1px solid #1f2937",
                    marginBottom: "6px",
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "14px",
                  }}
                >
                  <div>
                    <strong>{s.name || "Be vardo"}</strong>{" "}
                    <span style={{ color: "#9ca3af" }}>({s.email})</span>
                  </div>
                  {s.role && (
                    <span style={{ fontSize: "12px", color: "#6b7280" }}>
                      {s.role}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
