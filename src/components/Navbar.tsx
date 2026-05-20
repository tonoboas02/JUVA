"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Bienestar", href: "#philosophy" },
  { label: "Experiencia", href: "#experience" },
  { label: "Tecnologías", href: "#technologies" },
  { label: "Santuario", href: "#sanctuary" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-juva-bg-base/85 backdrop-blur-md border-b border-juva-bronze/10 shadow-[0_1px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-serif text-xl tracking-[0.25em] text-juva-cream hover:text-juva-bronze transition-colors duration-300"
            onClick={closeMenu}
          >
            JUVA
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-juva-muted hover:text-juva-cream text-sm tracking-wider transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-juva-bronze group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Desktop CTA + Mobile toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#membership"
              className="hidden md:inline-flex items-center px-5 py-2 text-xs tracking-[0.15em] uppercase border border-juva-bronze/50 text-juva-bronze hover:bg-juva-bronze hover:text-juva-bg-deep transition-all duration-300 rounded-none"
            >
              Únete
            </a>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-11 h-11 gap-1.5 -mr-1.5"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block w-6 h-px bg-juva-cream origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="block w-6 h-px bg-juva-cream"
              />
              <motion.span
                animate={
                  menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3 }}
                className="block w-6 h-px bg-juva-cream origin-center"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-16 left-0 right-0 z-40 bg-juva-bg-base/95 backdrop-blur-md border-b border-juva-bronze/10 md:hidden"
          >
            <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                  className="text-juva-cream text-lg font-serif tracking-wider hover:text-juva-bronze transition-colors duration-200"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#membership"
                onClick={closeMenu}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-2 inline-flex items-center justify-center px-6 py-3 border border-juva-bronze/50 text-juva-bronze text-sm tracking-[0.15em] uppercase hover:bg-juva-bronze hover:text-juva-bg-deep transition-all duration-300"
              >
                Solicitar Acceso
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
