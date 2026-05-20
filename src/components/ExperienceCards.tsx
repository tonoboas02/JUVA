"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { experienceCards } from "@/lib/data";

/* SVG icons keyed by card id */
const icons: Record<string, React.ReactNode> = {
  recovery: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
  ),
  performance: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  strength: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
  therapy: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function ExperienceCards() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      ref={ref}
      className="bg-juva-bg-base py-20 md:py-40 px-6 relative overflow-hidden"
    >
      {/* Top glow accent */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-juva-bronze/30 to-transparent"
      />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 md:mb-20"
        >
          <p className="text-juva-bronze text-xs tracking-[0.35em] uppercase mb-4">
            Lo que ofrecemos
          </p>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] text-juva-cream leading-tight max-w-lg">
            Cuatro experiencias,
            <br />
            <span className="italic text-juva-cream/70">
              un mismo propósito.
            </span>
          </h2>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {experienceCards.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              whileHover={{
                y: -6,
                boxShadow: "0 20px 60px rgba(181,138,90,0.1)",
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="glass-card rounded-none p-8 md:p-10 relative group cursor-default"
            >
              {/* Bronze top border accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-juva-bronze/60 via-juva-bronze/20 to-transparent" />

              {/* Icon */}
              <div className="text-juva-bronze/60 group-hover:text-juva-bronze mb-6 transition-colors duration-300">
                {icons[card.id]}
              </div>

              {/* Subtitle */}
              <p className="text-juva-bronze/60 text-[10px] tracking-[0.3em] uppercase mb-2">
                {card.subtitle}
              </p>

              {/* Title */}
              <h3 className="font-serif text-2xl md:text-3xl text-juva-cream mb-4 leading-snug">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-juva-muted text-sm md:text-base leading-relaxed">
                {card.description}
              </p>

              {/* Bottom-right glow on hover */}
              <div className="absolute bottom-0 right-0 w-32 h-32 glow-radial opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
