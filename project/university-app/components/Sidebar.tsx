import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-950 border-r border-gray-800 p-6 text-white">
      <h2 className="text-lg font-semibold mb-6">Navigacija</h2>

      <ul className="space-y-4 text-gray-300">
        <li>
          <Link href="/" className="hover:text-white transition">
            Pagrindinis
          </Link>
        </li>
        <li>
          <Link href="/courses" className="hover:text-white transition">
            Kursai
          </Link>
        </li>
        <li>
          <Link href="/profile" className="hover:text-white transition">
            Mano profilis
          </Link>
        </li>
      </ul>
    </aside>
  );
}
