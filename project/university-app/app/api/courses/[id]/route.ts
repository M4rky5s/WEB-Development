// app/api/courses/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type RouteContext = {
  params: Promise<{ id: string }>;
};

// (nebūtina, bet gali turėti ir GET /api/courses/[id] jei prireiks)
export async function GET(req: Request, context: RouteContext) {
  const { id } = await context.params;
  const courseId = Number(id);

  if (!id || !Number.isFinite(courseId)) {
    return NextResponse.json({ error: "Blogas kurso ID" }, { status: 400 });
  }

  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });

  if (!course) {
    return NextResponse.json({ error: "Kursas nerastas" }, { status: 404 });
  }

  return NextResponse.json(course);
}

// PATCH – atnaujinti kursą
export async function PATCH(req: Request, context: RouteContext) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role as string | undefined;

  if (!session || !role || (role !== "ADMIN" && role !== "PROFESSOR")) {
    return NextResponse.json({ error: "Neleidžiama" }, { status: 403 });
  }

  const { id } = await context.params;
  const courseId = Number(id);

  if (!id || !Number.isFinite(courseId)) {
    return NextResponse.json({ error: "Blogas kurso ID" }, { status: 400 });
  }

  const body = await req.json().catch(() => null);
  const title = body?.title?.trim();
  const description = body?.description?.trim() ?? null;

  if (!title) {
    return NextResponse.json(
      { error: "Pavadinimas privalomas" },
      { status: 400 }
    );
  }

  const updated = await prisma.course.update({
    where: { id: courseId },
    data: { title, description },
  });

  return NextResponse.json(updated);
}

// DELETE – ištrinti kursą
export async function DELETE(req: Request, context: RouteContext) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role as string | undefined;

  if (!session || !role || (role !== "ADMIN" && role !== "PROFESSOR")) {
    return NextResponse.json({ error: "Neleidžiama" }, { status: 403 });
  }

  const { id } = await context.params;
  const courseId = Number(id);

  if (!id || !Number.isFinite(courseId)) {
    return NextResponse.json({ error: "Blogas kurso ID" }, { status: 400 });
  }

  // pirmiau ištrinam enrolments, kad neliktų orphan įrašų
  await prisma.enrollment.deleteMany({ where: { courseId } });
  await prisma.course.delete({ where: { id: courseId } });

  return NextResponse.json({ ok: true });
}
