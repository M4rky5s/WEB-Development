import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogoutButton from "../../components/LogoutButton";

export default async function UserHeader() {
    const session = await getServerSession(authOptions);

    if(!session?.user) return null;

    const name = session.user.name || "Vartotojas";
    const role = (session.user as any)?.role || "naudotojas";

     return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
            }}
        >
            <div style={{ fontSize: "16px" }}>
                Prisijungęs kaip:{" "}
                <strong>
                    {name} ({role})
                </strong>
            </div>

            <LogoutButton />
        </div>
    );
}