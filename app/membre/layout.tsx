import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { userHasAccess } from "@/lib/acces";

export default async function MembreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/?locked=1");
  }

  const userId = (session.user as { id?: string }).id;

  if (!userId || !(await userHasAccess(userId))) {
    redirect("/?locked=1");
  }

  return <>{children}</>;
}
