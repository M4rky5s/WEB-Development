import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  // jei nėra sesijos – 401
  if (!session || !session.user) {
    return NextResponse.json({ error: "Neautorizuota" }, { status: 401 });
  }

  // id paimam iš session.user.id, kurį ką tik užpildėm auth.ts
  const rawId = (session.user as any).id;
  const userId = Number(rawId);

  if (!userId || Number.isNaN(userId)) {
    return NextResponse.json({ error: "Blogas vartotojo ID" }, { status: 400 });
  }

  // pasiimam visus įrašus iš Enrollment pagal userId
  const enrollments = await prisma.enrollment.findMany({
    where: { userId },
    include: { course: true },
  });

  const courses = enrollments.map((e) => e.course);

  return NextResponse.json(courses);
}
