/* ─────────────────────────────────────────────────────────────────────────
   Footer — Server Component (no animations needed)
   To update: social links, email, WhatsApp, address — edit the constants below.
   ───────────────────────────────────────────────────────────────────────── */

/* CONTACT LINKS — Replace these with real values before launch */
const INSTAGRAM_URL = "https://instagram.com/juva.ec"; // ← Replace with real Instagram URL
const WHATSAPP_URL = "https://wa.me/593XXXXXXXXX"; // ← Replace with real WhatsApp number
const EMAIL = "hola@juva.ec"; // ← Replace with real contact email

const navLinks = [
  { label: "Bienestar", href: "#philosophy" },
  { label: "Experiencia", href: "#experience" },
  { label: "Tecnologías", href: "#technologies" },
  { label: "Santuario", href: "#sanctuary" },
  { label: "Membresía", href: "#membership" },
];

export default function Footer() {
  return (
    <footer className="bg-juva-bg-deep border-t border-juva-bronze/20 pt-16 pb-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Column 1: Brand */}
          <div>
            <p className="font-serif text-3xl tracking-widest text-juva-cream mb-2">
              JUVA
            </p>
            <p className="text-juva-muted text-sm tracking-wider mb-1">
              Bienestar. Fuerza. Longevidad.
            </p>
            <p className="text-juva-muted/60 text-xs tracking-wider mt-4">
              Guayaquil, Ecuador
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <p className="text-juva-bronze/70 text-xs tracking-[0.2em] uppercase mb-6">
              Explorar
            </p>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-juva-muted hover:text-juva-cream text-sm tracking-wide transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div>
            <p className="text-juva-bronze/70 text-xs tracking-[0.2em] uppercase mb-6">
              Contacto
            </p>
            <div className="flex flex-col gap-4">
              {/* Instagram */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="JUVA en Instagram"
                className="flex items-center gap-3 text-juva-muted hover:text-juva-cream transition-colors duration-200 group"
              >
                <span className="w-8 h-8 rounded-full border border-juva-bronze/20 group-hover:border-juva-bronze/50 flex items-center justify-center transition-colors duration-200">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                </span>
                <span className="text-sm">Instagram</span>
              </a>

              {/* WhatsApp */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactar por WhatsApp"
                className="flex items-center gap-3 text-juva-muted hover:text-juva-cream transition-colors duration-200 group"
              >
                <span className="w-8 h-8 rounded-full border border-juva-bronze/20 group-hover:border-juva-bronze/50 flex items-center justify-center transition-colors duration-200">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </span>
                <span className="text-sm">WhatsApp</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${EMAIL}`}
                aria-label="Enviar email a JUVA"
                className="flex items-center gap-3 text-juva-muted hover:text-juva-cream transition-colors duration-200 group"
              >
                <span className="w-8 h-8 rounded-full border border-juva-bronze/20 group-hover:border-juva-bronze/50 flex items-center justify-center transition-colors duration-200">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <span className="text-sm">{EMAIL}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-juva-bronze/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-juva-muted/40 text-xs tracking-wider">
            © {new Date().getFullYear()} JUVA. Todos los derechos reservados.
          </p>
          <p className="text-juva-muted/40 text-xs tracking-wider italic font-serif">
            Diseñado para quienes exigen lo mejor.
          </p>
        </div>
      </div>
    </footer>
  );
}
