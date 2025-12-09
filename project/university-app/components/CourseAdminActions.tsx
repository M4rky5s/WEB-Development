"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CourseAdminActions({ courseId }: { courseId: number }) {
  const router = useRouter();

  async function handleDelete() {
    const sure = window.confirm("Ar tikrai nori ištrinti šį kursą?");
    if (!sure) return;

    try {
      const res = await fetch(`/api/courses/${courseId}`, {
        method: "DELETE",
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        alert(data.error || "Nepavyko ištrinti kurso");
        return;
      }

      alert("Kursas ištrintas");
      router.push("/courses");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Vidinė klaida bandant ištrinti kursą");
    }
  }

  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Link href={`/courses/${courseId}/edit`} className="btn btn--outline">
        ✏️ Koreguoti kursą
      </Link>
      <button
        type="button"
        onClick={handleDelete}
        className="btn"
        style={{ background: "#b91c1c" }}
      >
        🗑 Ištrinti kursą
      </button>
    </div>
  );
}
