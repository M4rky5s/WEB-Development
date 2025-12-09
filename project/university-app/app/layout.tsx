// app/layout.tsx
export const dynamic = "force-dynamic";

import "./globals.css";
import type { ReactNode } from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton"; // jei turi tokį komponentą

export const metadata = {
  title: "University App",
  description: "Paprasta universiteto kursų sistema",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const name = user?.name || user?.email || "Svečias";
  const role = (user as any)?.role || "NEPRISIJUNGĘS";

  const firstLetter = name.charAt(0).toUpperCase();

  const isLoggedIn = !!session?.user;

  return (
    <html lang="lt">
      <body className="app-root">
        {/* SIDEBARAS */}
        <aside className="sidebar">
          <div className="sidebar__top">
            <div className="logo">
              <div className="logo__icon">U</div>
              <div className="logo__text">
                <span className="logo__title">University App</span>
                <span className="logo__subtitle">Kursų sistema</span>
              </div>
            </div>

            <nav className="nav">
              <Link href="/" className="nav__link">
                <span>🏠</span>
                <span>Pradžia</span>
              </Link>

              <Link href="/courses" className="nav__link">
                <span>📚</span>
                <span>Kursai</span>
              </Link>

              {!isLoggedIn && (
                <>
                  <Link href="/login" className="nav__link">
                    <span>🔐</span>
                    <span>Prisijungti</span>
                  </Link>
                  <Link href="/register" className="nav__link">
                    <span>📝</span>
                    <span>Registruotis</span>
                  </Link>
                </>
              )}
            </nav>
          </div>

          {/* APAČIA – VARTOTOJO BLOKAS */}
          <div className="sidebar__bottom">
            <div className="user-card">
              <div className="user-card__avatar">{firstLetter}</div>
              <div className="user-card__info">
                <div className="user-card__name">{name}</div>
                <div className="user-card__role">{role}</div>
              </div>
            </div>

            {isLoggedIn && (
              <div className="user-card__actions">
                <LogoutButton />
              </div>
            )}
          </div>
        </aside>

        {/* PAGRINDINIS TURINYS */}
        <main className="main">
          <div className="main__inner">{children}</div>
        </main>
      </body>
    </html>
  );
}
