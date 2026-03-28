import { NextResponse } from "next/server";
import { Resend } from "resend";

const RECIPIENT = process.env.ADMIN_EMAIL ?? "deneutao@gmail.com";

const SUBJECT_LABELS: Record<string, string> = {
  "question-formation": "Question sur la formation",
  "probleme-technique": "Problème technique",
  paiement: "Question sur le paiement",
  affiliation: "Programme d'affiliation",
  partenariat: "Proposition de partenariat",
  autre: "Autre",
};

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Service email non configuré. Contactez-nous via le site." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const body = await req.json();
    const { name, email, subject, message } = body as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    };

    // Validation
    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 });
    }
    if (message.trim().length < 10) {
      return NextResponse.json({ error: "Le message est trop court." }, { status: 400 });
    }
    if (message.length > 5000) {
      return NextResponse.json({ error: "Le message est trop long (5000 caractères max)." }, { status: 400 });
    }

    const subjectLabel = SUBJECT_LABELS[subject] ?? subject;
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

    const { error } = await resend.emails.send({
      from: `Comprendre pour Vendre <${fromEmail}>`,
      to: RECIPIENT,
      replyTo: email,
      subject: `[Contact] ${subjectLabel} — ${name}`,
      html: buildEmailHtml({ name, email, subjectLabel, message }),
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi. Veuillez réessayer." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ error: "Erreur serveur inattendue." }, { status: 500 });
  }
}

function buildEmailHtml({
  name,
  email,
  subjectLabel,
  message,
}: {
  name: string;
  email: string;
  subjectLabel: string;
  message: string;
}): string {
  const safeMessage = message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; color: #1a1a2e;">
      <div style="background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%); padding: 24px 32px; border-radius: 12px 12px 0 0;">
        <h1 style="color: #f97316; margin: 0; font-size: 20px;">Comprendre pour Vendre</h1>
        <p style="color: #8FA3BF; margin: 4px 0 0; font-size: 14px;">Nouveau message via le formulaire de contact</p>
      </div>
      <div style="background: #f8f9fa; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e0e0e0; border-top: none;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 10px 0; color: #666; font-size: 14px; width: 80px; vertical-align: top;">
              <strong>Nom</strong>
            </td>
            <td style="padding: 10px 0; font-size: 14px; color: #1a1a2e;">
              ${name.replace(/</g, "&lt;")}
            </td>
          </tr>
          <tr style="border-top: 1px solid #eee;">
            <td style="padding: 10px 0; color: #666; font-size: 14px; vertical-align: top;">
              <strong>Email</strong>
            </td>
            <td style="padding: 10px 0; font-size: 14px;">
              <a href="mailto:${email.replace(/"/g, "&quot;")}" style="color: #f97316;">${email.replace(/</g, "&lt;")}</a>
            </td>
          </tr>
          <tr style="border-top: 1px solid #eee;">
            <td style="padding: 10px 0; color: #666; font-size: 14px; vertical-align: top;">
              <strong>Sujet</strong>
            </td>
            <td style="padding: 10px 0; font-size: 14px; color: #1a1a2e;">
              ${subjectLabel.replace(/</g, "&lt;")}
            </td>
          </tr>
        </table>
        <div style="background: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
          <p style="margin: 0 0 8px; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
          <p style="margin: 0; font-size: 15px; color: #1a1a2e; line-height: 1.6;">${safeMessage}</p>
        </div>
        <p style="margin: 20px 0 0; font-size: 12px; color: #999;">
          Pour répondre, utilisez "Répondre" dans votre client email — la réponse ira directement à ${email.replace(/</g, "&lt;")}.
        </p>
      </div>
    </div>
  `;
}
