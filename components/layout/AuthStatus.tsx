import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function AuthStatus() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">
          Connecté{session.user.email ? ` : ${session.user.email}` : ""}
        </span>
        <form action="/api/auth/signout" method="post">
          <button className="text-sm font-medium text-gray-600 hover:text-pedagogy-blue-600 underline">
            Se déconnecter
          </button>
        </form>
      </div>
    );
  }

  return (
    <Link
      href="/connexion"
      className="text-sm font-medium text-gray-600 hover:text-pedagogy-blue-600"
    >
      Connexion
    </Link>
  );
}
