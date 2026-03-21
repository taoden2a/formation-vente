import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import crypto from "crypto";

const ONE_HOUR = 60 * 60 * 1000;

// Diagnostic au démarrage — visible dans les logs Vercel
const MISSING_VARS = ["NEXTAUTH_URL", "RESEND_API_KEY", "RESEND_FROM_EMAIL"].filter(
  (v) => !process.env[v]
);
if (MISSING_VARS.length > 0) {
  console.warn("[reset-password/request] Variables manquantes :", MISSING_VARS.join(", "));
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : null;

    if (!email) {
      return NextResponse.json({ error: "Email requis." }, { status: 400 });
    }

    // Toujours retourner 200 — ne pas révéler si l'email existe
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ success: true });
    }

    // Supprimer les tokens existants pour cet utilisateur (nettoyage)
    await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });

    // Générer un token sécurisé
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + ONE_HOUR);

    await prisma.passwordResetToken.create({
      data: { token, userId: user.id, expiresAt },
    });

    // Envoyer l'email via Resend
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[reset-password] RESEND_API_KEY non configuré — email non envoyé");
      return NextResponse.json({ success: true });
    }

    const resend = new Resend(apiKey);
    const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
    const resetUrl = `${baseUrl}/reinitialisation-mdp?token=${token}`;
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

    try {
      const { error: resendError } = await resend.emails.send({
        from: `Comprendre pour Vendre <${fromEmail}>`,
        to: email,
        subject: "Réinitialisation de ton mot de passe",
        html: buildResetEmailHtml({ resetUrl }),
      });

      if (resendError) {
        console.error("[reset-password] Resend API error:", JSON.stringify(resendError));
      }
    } catch (resendErr) {
      // Ne pas bloquer — le token est créé, l'email a échoué
      const msg = resendErr instanceof Error ? resendErr.message : String(resendErr);
      console.error("[reset-password] Resend exception:", msg);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[reset-password/request] Unexpected error:", message, err);
    return NextResponse.json(
      { error: `Erreur serveur : ${message}` },
      { status: 500 }
    );
  }
}

function buildResetEmailHtml({ resetUrl }: { resetUrl: string }): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
      <div style="background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%); padding: 24px 32px; border-radius: 12px 12px 0 0;">
        <h1 style="color: #f97316; margin: 0; font-size: 20px;">Comprendre pour Vendre</h1>
        <p style="color: #8FA3BF; margin: 4px 0 0; font-size: 14px;">Réinitialisation de mot de passe</p>
      </div>
      <div style="background: #f8f9fa; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e0e0e0; border-top: none;">
        <p style="font-size: 16px; color: #1a1a2e; margin: 0 0 16px;">Bonjour,</p>
        <p style="font-size: 15px; color: #444; line-height: 1.6; margin: 0 0 24px;">
          Tu as demandé à réinitialiser ton mot de passe. Clique sur le bouton ci-dessous pour choisir un nouveau mot de passe.
          Ce lien est valable <strong>1 heure</strong>.
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${resetUrl}"
            style="display: inline-block; background: #f97316; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 15px; font-weight: 600;">
            Réinitialiser mon mot de passe
          </a>
        </div>
        <p style="font-size: 13px; color: #888; margin: 24px 0 0; line-height: 1.5;">
          Si tu n'es pas à l'origine de cette demande, ignore cet email — ton mot de passe reste inchangé.<br>
          Ce lien expire dans 1 heure.
        </p>
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
        <p style="font-size: 12px; color: #aaa; margin: 0;">
          Lien si le bouton ne fonctionne pas :<br>
          <a href="${resetUrl}" style="color: #f97316; word-break: break-all;">${resetUrl}</a>
        </p>
      </div>
    </div>
  `;
}
