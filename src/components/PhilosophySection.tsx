"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

export default function PhilosophySection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const lineVariants: Variants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: { duration: 1, delay: 0.2, ease: "easeOut" },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: (delay: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.9, delay, ease: "easeOut" },
    }),
  };

  return (
    <section
      id="philosophy"
      ref={ref}
      className="bg-juva-bg-deep py-20 md:py-44 px-6 relative overflow-hidden"
    >
      {/* Subtle radial glow bottom-right */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-96 h-96 glow-radial opacity-60 pointer-events-none"
      />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-12 md:gap-20 items-start">
          {/* Left: bronze vertical accent line */}
          <div className="hidden md:flex flex-col items-center pt-3">
            <motion.div
              variants={lineVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="w-px h-32 bg-gradient-to-b from-juva-bronze to-transparent origin-top"
            />
          </div>

          {/* Right: content */}
          <div>
            {/* Eyebrow */}
            <motion.p
              variants={textVariants}
              custom={0.1}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-juva-bronze text-xs tracking-[0.35em] uppercase mb-8"
            >
              Nuestra Filosofía
            </motion.p>

            {/* Headline */}
            <motion.h2
              variants={textVariants}
              custom={0.25}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="font-serif text-[clamp(2.2rem,5vw,4rem)] text-juva-cream leading-tight mb-10 max-w-3xl"
            >
              Un nuevo ritmo
              <br />
              <span className="italic text-juva-cream/70">
                para el cuerpo y la mente.
              </span>
            </motion.h2>

            {/* Body paragraphs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Recuperación Intencional",
                  body: "JUVA reúne tecnología de recuperación avanzada y terapias de bienestar en un entorno privado. Cada sesión está diseñada para restaurar el cuerpo en profundidad.",
                  delay: 0.4,
                },
                {
                  title: "Rendimiento con Propósito",
                  body: "El movimiento tiene un propósito aquí. Desde el entrenamiento de fuerza hasta el análisis de capacidad aeróbica, todo apunta al mismo objetivo: rendir mejor.",
                  delay: 0.55,
                },
                {
                  title: "Un Espacio Diferente",
                  body: "No es un gimnasio. Es un espacio concebido para quienes entienden que el cuidado del cuerpo es una práctica diaria, no una obligación.",
                  delay: 0.7,
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={textVariants}
                  custom={item.delay}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  <p className="text-juva-bronze/80 text-xs tracking-[0.2em] uppercase mb-3">
                    {item.title}
                  </p>
                  <p className="text-juva-muted text-sm md:text-base leading-relaxed">
                    {item.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
