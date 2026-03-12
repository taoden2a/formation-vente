import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ProfileDropdown } from "./ProfileDropdown";

export async function AuthStatus() {
  const session = await getServerSession(authOptions);
  const isAuthenticated = !!session?.user;

  return <ProfileDropdown isAuthenticated={isAuthenticated} />;
}
