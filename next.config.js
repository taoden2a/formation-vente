/** @type {import('next').NextConfig} */

const securityHeaders = [
  // Interdit l'affichage du site dans un iframe (protection clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  // Interdit au navigateur de deviner le type MIME (protection MIME sniffing)
  { key: "X-Content-Type-Options", value: "nosniff" },
  // N'envoie que l'origine dans le Referer header sur les requêtes cross-origin
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Préchargement DNS activé (performance)
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // Permissions API — désactive les fonctionnalités non utilisées
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(self)",
  },
  // HSTS — force HTTPS pendant 1 an (incluant sous-domaines)
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  // CSP basique — empêche l'injection de scripts externes non autorisés
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Scripts : self + inline (Next.js en a besoin) + Stripe
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com",
      // Styles : self + inline (Tailwind)
      "style-src 'self' 'unsafe-inline'",
      // Polices
      "font-src 'self' data:",
      // Images : self + data URIs + Stripe
      "img-src 'self' data: https:",
      // Iframes : Stripe uniquement
      "frame-src https://js.stripe.com https://hooks.stripe.com",
      // Connexions : self + Stripe + Supabase
      "connect-src 'self' https://api.stripe.com https://*.supabase.co wss://*.supabase.co",
    ].join("; "),
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  async headers() {
    return [
      {
        // Appliqué à toutes les routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
