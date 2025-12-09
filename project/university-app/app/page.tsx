// app/page.tsx
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role || "SVEČIAS";

  return (
    <div className="page">
      <header className="page__header">
        <div>
          <h1 className="page__title">University App</h1>
          <p className="page__subtitle">
            Paprasta universiteto kursų sistema – kurk, tvarkyk ir peržiūrėk kursus.
          </p>
        </div>
      </header>

      <section className="card">
        <div className="card__title">Sveikas sugrįžęs 👋</div>
        <p className="card__meta">
          Dabar esi prisijungęs kaip <strong>{role}</strong>. 
          Peržiūrėk kursus arba prisijunk / užsiregistruok.
        </p>

        <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
          <Link href="/courses" className="btn btn--primary">
            📚 Žiūrėti kursus
          </Link>

          {!session && (
            <>
              <Link href="/login" className="btn btn--outline">
                🔐 Prisijungti
              </Link>
              <Link href="/register" className="btn btn--outline">
                📝 Registruotis
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
