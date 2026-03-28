import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/connexion",
  },
});

export const config = {
  matcher: [
    "/membre/:path*",
    "/formation/:path*",
    "/exercices/:path*",
    "/notes/:path*",
    "/ressources/:path*",
    "/admin/:path*",
  ],
};
