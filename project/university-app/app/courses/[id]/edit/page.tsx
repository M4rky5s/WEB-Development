import { notFound } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import EditCourseForm from "./EditCourseForm";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCoursePage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role as string | undefined;

  if (!session?.user || (role !== "ADMIN" && role !== "PROFESSOR")) {
    notFound(); // arba redirect("/login")
  }

  const { id } = await params;
  const courseId = Number(id);
  if (!Number.isFinite(courseId)) notFound();

  // svarbu: server-side fetch turi būti pilnas URL arba iš DB tiesiogiai.
  // paprasčiau — fetch iš tavo API su absolute URL:
  const baseUrl =
    process.env.NEXTAUTH_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/courses/${courseId}`, {
    cache: "no-store",
    headers: session ? { cookie: "" } : undefined,
  });

  if (!res.ok) notFound();

  const course = await res.json();

  return (
    <main style={{ padding: 32, maxWidth: 980, margin: "0 auto" }}>
      <div style={{ marginBottom: 16 }}>
        <Link href={`/courses/${courseId}`} style={{ color: "#93c5fd" }}>
          ← Grįžti į kursą
        </Link>
      </div>

      <h1 style={{ fontSize: 28, marginBottom: 14 }}>Koreguoti kursą</h1>

      <EditCourseForm
        courseId={courseId}
        initialTitle={course.title}
        initialDescription={course.description}
      />
    </main>
  );
}
