const FORMATION_URL = "https://comprendrepourvendre.com/formation";
const CONTACT_URL = "https://comprendrepourvendre.com/contact";

export function buildWelcomeEmailHtml(): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bienvenue dans Comprendre pour Vendre</title>
</head>
<body style="margin:0;padding:0;background-color:#09090b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#09090b;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding:0 0 32px 0;text-align:center;">
              <span style="font-size:22px;font-weight:700;color:#ea580c;letter-spacing:-0.5px;">
                Comprendre pour Vendre
              </span>
            </td>
          </tr>

          <!-- Main card -->
          <tr>
            <td style="background-color:#18181b;border:1px solid #27272a;border-radius:16px;padding:40px 40px 32px 40px;">

              <!-- Title -->
              <p style="margin:0 0 8px 0;font-size:28px;font-weight:700;color:#ffffff;line-height:1.2;">
                Ton accès est activé.
              </p>
              <p style="margin:0 0 32px 0;font-size:16px;color:#a1a1aa;line-height:1.6;">
                Bienvenue ! Ta formation est maintenant accessible.<br />
                Tu peux commencer dès maintenant depuis ton espace membre.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:32px;">
                    <a href="${FORMATION_URL}"
                       style="display:inline-block;background-color:#ea580c;color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:10px;letter-spacing:0.2px;">
                      Accéder à ma formation →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-top:1px solid #27272a;padding-bottom:28px;"></td>
                </tr>
              </table>

              <!-- What's included -->
              <p style="margin:0 0 16px 0;font-size:13px;font-weight:600;color:#71717a;text-transform:uppercase;letter-spacing:1px;">
                Ce qui t&apos;attend
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:12px;">
                    <span style="color:#ea580c;font-weight:700;margin-right:10px;">✓</span>
                    <span style="color:#d4d4d8;font-size:15px;">8 modules sur la psychologie de la vente</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:12px;">
                    <span style="color:#ea580c;font-weight:700;margin-right:10px;">✓</span>
                    <span style="color:#d4d4d8;font-size:15px;">43 leçons actionnables</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:28px;">
                    <span style="color:#ea580c;font-weight:700;margin-right:10px;">✓</span>
                    <span style="color:#d4d4d8;font-size:15px;">Exercices pratiques à chaque module</span>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 0 0 0;text-align:center;">
              <p style="margin:0;font-size:13px;color:#52525b;line-height:1.6;">
                Des questions ? Réponds à cet email ou contacte-nous sur
                <a href="${CONTACT_URL}" style="color:#71717a;text-decoration:underline;">comprendrepourvendre.com/contact</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function buildInternalNotificationHtml({
  customerEmail,
  amount,
  date,
  stripeSessionId,
}: {
  customerEmail: string;
  amount: number;
  date: Date;
  stripeSessionId: string;
}): string {
  return `
<p><strong>Nouvelle vente confirmée</strong></p>
<ul>
  <li><strong>Email :</strong> ${customerEmail}</li>
  <li><strong>Montant :</strong> ${amount}€</li>
  <li><strong>Date :</strong> ${date.toLocaleString("fr-FR")}</li>
  <li><strong>Session Stripe :</strong> ${stripeSessionId}</li>
</ul>
  `.trim();
}
