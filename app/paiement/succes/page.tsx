import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { userHasAccess } from "@/lib/acces";
import { SuccesContent } from "./SuccesContent";

export default async function PaiementSuccesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/connexion?next=/paiement/succes");
  }

  const userId = (session.user as { id?: string }).id;
  const hasAccess = userId ? await userHasAccess(userId) : false;

  return <SuccesContent initialAccess={hasAccess} />;
}
