import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET – visi kursai
export async function GET() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(courses);
}

// POST – sukurti naują kursą (tik ADMIN/PROFESSOR)
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = (session.user as any).role as string | undefined;

  if (role !== "PROFESSOR" && role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { title, description } = body;

  if (!title || typeof title !== "string") {
    return NextResponse.json(
      { error: "Trūksta pavadinimo" },
      { status: 400 }
    );
  }

  const course = await prisma.course.create({
    data: { title, description },
  });

  return NextResponse.json(course, { status: 201 });
}
