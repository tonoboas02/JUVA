"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  /* Parallax: content shifts up gently as user scrolls */
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ─── Layer 1: Animated gradient background ──────────────────────────
          IMAGE PLACEHOLDER: Replace this div with a Next.js <Image> or
          a CSS background-image pointing to a high-resolution photo of
          the JUVA interior — dark wood, warm lighting, stone textures.
          Set data-image-placeholder="hero-bg" to find it easily.
      ─────────────────────────────────────────────────────────────────────── */}
      <motion.div
        data-image-placeholder="hero-bg"
        aria-hidden="true"
        style={{ y: bgY }}
        className="absolute inset-0 -z-10"
      >
        {/* Base dark gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 60%, #1D201E 0%, #0D0F0E 70%)",
          }}
        />

        {/* Animated warm light sweep — replace with your hero image overlay later */}
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundSize: "200% 200%",
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(138,98,64,0.18) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(181,138,90,0.08) 0%, transparent 40%)",
          }}
        />

        {/* Subtle vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(13,15,14,0.6) 100%)",
          }}
        />
      </motion.div>

      {/* ─── Layer 2: Subtle dot grid texture ───────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #EFE7D8 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ─── Layer 3: Content ────────────────────────────────────────────── */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-juva-bronze text-xs tracking-[0.35em] uppercase mb-8"
        >
          Quito, Ecuador
        </motion.p>

        {/* Wordmark */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          className="font-serif text-[clamp(5rem,15vw,12rem)] leading-none tracking-[0.15em] text-juva-cream mb-6"
        >
          JUVA
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: "easeOut" }}
          className="font-serif text-[clamp(1.1rem,2.5vw,1.6rem)] text-juva-cream/70 tracking-wider mb-6 italic"
        >
          Bienestar. Fuerza. Longevidad.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="w-16 h-px bg-juva-bronze mx-auto mb-8"
        />

        {/* Body copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: "easeOut" }}
          className="text-juva-muted text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-12 tracking-wide"
        >
          Un club privado diseñado para la recuperación, el rendimiento y la
          vitalidad integral. Cada detalle pensado para quienes exigen un
          estándar diferente.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#membership"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center px-8 py-4 bg-juva-bronze text-juva-bg-deep text-sm tracking-[0.15em] uppercase font-medium transition-all duration-300 hover:bg-juva-wood-light"
          >
            Solicitar Acceso
          </motion.a>

          <motion.a
            href="#experience"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 border border-juva-cream/20 text-juva-cream/70 text-sm tracking-[0.15em] uppercase hover:border-juva-bronze/50 hover:text-juva-cream transition-all duration-300"
          >
            Ver la Experiencia
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* ─── Scroll indicator ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <p className="text-juva-muted/40 text-[10px] tracking-[0.3em] uppercase">
          Descubrir
        </p>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-juva-bronze/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
