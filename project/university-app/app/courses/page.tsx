// app/courses/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import CreateCourseForm from "../../components/CreateCourseForm";

type Course = {
  id: number;
  title: string;
  description: string | null;
};

export default async function CoursesPage() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role as string | undefined;
  const userIdRaw = (session?.user as any)?.id;
  const userId = userIdRaw ? Number(userIdRaw) : undefined;

  if (!session || !session.user) {
    return (
      <main style={{ padding: "32px", maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "28px", marginBottom: "16px" }}>Kursai</h1>
        <p>Norėdami matyti kursus, prisijunkite.</p>
      </main>
    );
  }

  let courses: Course[] = [];

  if (role === "STUDENT") {
    if (!userId || Number.isNaN(userId)) {
      return (
        <main style={{ padding: "32px", maxWidth: "900px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "28px", marginBottom: "16px" }}>Kursai</h1>
          <p style={{ color: "#ef4444" }}>Blogas vartotojo ID.</p>
        </main>
      );
    }

    const enrollments = await prisma.enrollment.findMany({
      where: { userId },
      include: { course: true },
    });

    courses = enrollments.map((e) => ({
      id: e.course.id,
      title: e.course.title,
      description: e.course.description,
    }));
  } else {
    const allCourses = await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
    });

    courses = allCourses.map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description,
    }));
  }

  const isStaff = role === "ADMIN" || role === "PROFESSOR";

  return (
    <main style={{ padding: "32px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "8px" }}>Kursai</h1>

      <p style={{ marginBottom: "16px", color: "#9ca3af" }}>
        Prisijungęs kaip <strong>{role}</strong>
      </p>

      {/* Tik ADMIN / PROFESSOR – kurso kūrimo blokas */}
      {isStaff && (
        <section
          style={{
            marginBottom: "24px",
            padding: "16px 20px",
            borderRadius: "16px",
            background: "#020617",
            border: "1px solid #1f2937",
            boxShadow: "0 16px 35px rgba(15,23,42,0.9)",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              marginBottom: "8px",
              color: "#e5e7eb",
            }}
          >
            Pridėti naują kursą
          </h2>
          <p
            style={{
              marginBottom: "12px",
              fontSize: "14px",
              color: "#9ca3af",
            }}
          >
            Įvesk pavadinimą ir (jei reikia) aprašymą, kad sukurtum naują kursą.
          </p>

          <CreateCourseForm />
        </section>
      )}

      {courses.length === 0 ? (
        <div
          style={{
            padding: "16px 20px",
            borderRadius: "16px",
            background: "#020617",
            border: "1px solid #1f2937",
            color: "#9ca3af",
          }}
        >
          Kursų nerasta.
        </div>
      ) : (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "grid",
            gap: "16px",
          }}
        >
          {courses.map((course) => (
            <li
              key={course.id}
              style={{
                padding: "16px 20px",
                borderRadius: "16px",
                background: "#020617",
                border: "1px solid #1f2937",
                boxShadow: "0 18px 45px rgba(15,23,42,0.9)",
              }}
            >
              <h2 style={{ fontSize: "20px", marginBottom: "4px" }}>
                {course.title}
              </h2>
              <p style={{ marginBottom: "12px", color: "#9ca3af" }}>
                {course.description || "Aprašymo nėra."}
              </p>
              <Link
                href={`/courses/${course.id}`}
                style={{
                  display: "inline-block",
                  padding: "8px 14px",
                  borderRadius: "999px",
                  background: "#2563eb",
                  color: "white",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                Peržiūrėti kursą
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
