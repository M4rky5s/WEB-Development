import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password, role } = body;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Trūksta duomenų" },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    return NextResponse.json(
      { error: "Vartotojas jau egzistuoja" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // LEISTINOS ROLĖS
  const allowedRoles = ["STUDENT", "PROFESSOR"] as const;
  const safeRole = allowedRoles.includes(role) ? role : "STUDENT";

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: safeRole,
    },
  });

  return NextResponse.json(
    { id: user.id, email: user.email },
    { status: 201 }
  );
}
