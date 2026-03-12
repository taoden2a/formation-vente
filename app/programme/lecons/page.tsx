import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { userHasAccess } from "@/lib/acces";

export default async function LeconsRedirectPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    const userId = (session.user as { id?: string }).id;
    if (userId) {
      const hasAccess = await userHasAccess(userId);
      if (hasAccess) {
        redirect("/formation");
      }
    }
  }

  redirect("/programme");
}
