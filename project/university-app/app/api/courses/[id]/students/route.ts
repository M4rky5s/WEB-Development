// app/api/courses/[id]/students/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type StudentsContext = {
  params: Promise<{ id: string }>;
};

// Gauti kurso studentus
export async function GET(req: Request, context: StudentsContext) {
  const { id } = await context.params;
  const courseId = Number(id);

  if (!id || !Number.isFinite(courseId)) {
    return NextResponse.json({ error: "Blogas kurso ID" }, { status: 400 });
  }

  const enrollments = await prisma.enrollment.findMany({
    where: { courseId },
    include: { user: true },
  });

  const students = enrollments.map((e) => ({
    id: e.user.id,
    name: e.user.name,
    email: e.user.email,
    role: e.user.role,
  }));

  return NextResponse.json(students);
}

// Pridėti studentą į kursą (tik ADMIN/PROFESSOR)
export async function POST(req: Request, context: StudentsContext) {
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
  const email =
    typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!email) {
    return NextResponse.json(
      { error: "El. paštas privalomas" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json(
      { error: "Toks vartotojas nerastas" },
      { status: 404 }
    );
  }

  try {
    await prisma.enrollment.create({
      data: {
        userId: user.id,
        courseId,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    // unikalumo klaida (tas pats user tas pats course)
    if (err?.code === "P2002") {
      return NextResponse.json(
        { error: "Šis studentas jau yra šiame kurse" },
        { status: 400 }
      );
    }

    console.error("Enroll klaida:", err);
    return NextResponse.json(
      { error: "Vidinė serverio klaida" },
      { status: 500 }
    );
  }
}
