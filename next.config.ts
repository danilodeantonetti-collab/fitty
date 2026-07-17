import type { NextConfig } from "next";

// CSP ohne script-src: Next injiziert Inline-Scripts (Hydration, styled-jsx,
// SW-Registrierung) — eine strikte script-src bräuchte Nonces und würde die
// App brechen. frame-src/object-src/frame-ancestors decken die realen Risiken
// (Fremd-Embeds, Clickjacking) trotzdem ab.
const csp = [
  "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "geolocation=(), camera=(), microphone=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
