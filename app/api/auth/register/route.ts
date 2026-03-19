import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  console.log("[register] Début de la requête");

  // 1. Parse body
  let email: string, password: string;
  try {
    const body = await req.json();
    email = (body.email ?? "").trim().toLowerCase();
    password = body.password ?? "";
  } catch {
    console.log("[register] Erreur parsing body");
    return NextResponse.json({ error: "Données invalides." }, { status: 400 });
  }

  // 2. Validation basique
  if (!email || !password) {
    return NextResponse.json({ error: "Email et mot de passe requis." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json(
      { error: "Le mot de passe doit contenir au moins 8 caractères." },
      { status: 400 }
    );
  }

  // 3. DB + bcrypt — tout dans un try/catch global
  try {
    console.log("[register] Vérification email existant...");
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      console.log("[register] Email déjà utilisé");
      return NextResponse.json(
        { error: "Un compte existe déjà avec cet email." },
        { status: 409 }
      );
    }

    // Cost 10 : ~100ms sur Vercel (cost 12 peut dépasser le timeout serverless)
    console.log("[register] Hash du mot de passe (cost 10)...");
    const passwordHash = await bcrypt.hash(password, 10);

    console.log("[register] Création utilisateur...");
    await prisma.user.create({ data: { email, passwordHash } });

    console.log("[register] Utilisateur créé avec succès");
    return NextResponse.json({ success: true }, { status: 201 });

  } catch (err) {
    const errName = (err as { name?: string })?.name ?? "";
    const errMsg = (err as { message?: string })?.message ?? "";

    if (errName === "PrismaClientInitializationError") {
      console.error("[register] Connexion DB impossible:", errMsg);
      return NextResponse.json(
        { error: "Service temporairement indisponible. Veuillez réessayer." },
        { status: 503 }
      );
    }

    console.error("[register] Erreur interne:", errName, errMsg);
    return NextResponse.json(
      { error: "Erreur serveur. Veuillez réessayer dans quelques instants." },
      { status: 500 }
    );
  }
}
