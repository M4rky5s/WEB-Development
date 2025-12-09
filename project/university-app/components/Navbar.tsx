import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogoutButton from "./LogoutButton";
import Link from "next/link";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <nav className="w-full bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
      <Link href="/courses" className="text-xl font-bold text-white">
        University App
      </Link>

      <div className="flex items-center gap-4 text-white">
        {user ? (
          <>
            <div className="text-sm opacity-80">
              <p>{user.email}</p>
              <p className="text-xs">Role: <strong>{(user as any).role}</strong></p>
            </div>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link href="/login" className="hover:underline">
              Prisijungti
            </Link>
            <Link href="/register" className="hover:underline">
              Registruotis
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
