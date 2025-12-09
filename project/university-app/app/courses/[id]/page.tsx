// app/courses/[id]/page.tsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EnrollStudentForm from "@/components/EnrollStudentForm";
import CourseAdminActions from "@/components/CourseAdminActions";
import StudentListClient from "@/components/StudentListClient";

// DABAR: params yra Promise
type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function CoursePage({ params }: PageProps) {
  // išsiimam id iš Promise
  const { id: rawId } = await params;

  const courseId = Number(rawId);

  if (!rawId || !Number.isFinite(courseId)) {
    return notFound();
  }

  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });

  if (!course) {
    return notFound();
  }

  return (
    <main>
      <div className="page">
        <header className="page__header">
          <div>
            <h1 className="page__title">{course.title}</h1>
            <p className="page__subtitle">
              {course.description || "Aprašymo nėra."}
            </p>
          </div>

          <div className="page__actions">
            <CourseAdminActions courseId={courseId} />
          </div>
        </header>

        <section className="card card--muted">
          <h2 className="card__title">Pridėti studentą į kursą</h2>
          <p className="card__meta">
            Įvesk studento el. paštą ir jis bus priskirtas šiam kursui.
          </p>
          <EnrollStudentForm courseId={courseId} />
        </section>

        <section className="card">
          <h2 className="card__title">Pridėtų studentų sąrašas</h2>
          <p className="card__meta">
            Čia matai visus studentus, priskirtus šiam kursui.
          </p>
          <StudentListClient courseId={courseId} />
        </section>
      </div>
    </main>
  );
}
