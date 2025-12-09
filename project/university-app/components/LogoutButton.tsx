"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      style={{
        padding: "6px 14px",
        borderRadius: "6px",
        fontWeight: "bold",
        cursor: "pointer",
        backgroundColor: "#d9534f",
        color: "white",
        border: "none",
      }}
    >
      Atsijungti
    </button>
  );
}
