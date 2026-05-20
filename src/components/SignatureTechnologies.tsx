"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { technologies } from "@/lib/data";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function SignatureTechnologies() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="technologies"
      ref={ref}
      className="bg-juva-bg-deep py-28 md:py-40 px-6 relative overflow-hidden"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] glow-radial opacity-40 pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <p className="text-juva-bronze text-xs tracking-[0.35em] uppercase mb-4">
              Equipamiento de élite
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] text-juva-cream leading-tight">
              Tecnologías
              <br />
              <span className="italic text-juva-cream/70">seleccionadas.</span>
            </h2>
          </div>
          <p className="text-juva-muted text-sm max-w-sm leading-relaxed">
            Cada equipo ha sido elegido con un criterio único: que funcione con
            precisión y que se integre en el ritmo de una sesión JUVA.
          </p>
        </motion.div>

        {/* Technologies grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-juva-bronze/10"
        >
          {technologies.map((tech) => (
            <motion.div
              key={tech.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                zIndex: 10,
                backgroundColor: "rgba(29,32,30,0.95)",
              }}
              className="bg-juva-bg-elevated p-7 relative group transition-colors duration-300 cursor-default"
              style={{ outline: "1px solid transparent" }}
            >
              {/* Bronze number */}
              <p className="font-serif text-juva-bronze/40 text-4xl leading-none mb-6 group-hover:text-juva-bronze/70 transition-colors duration-300">
                {tech.number}
              </p>

              {/* Name */}
              <h3 className="font-serif text-juva-cream text-lg mb-3 leading-snug">
                {tech.name}
              </h3>

              {/* Description */}
              <p className="text-juva-muted text-sm leading-relaxed">
                {tech.description}
              </p>

              {/* Bottom glow dot */}
              <div className="absolute bottom-4 left-7 w-1.5 h-1.5 rounded-full bg-juva-bronze/0 group-hover:bg-juva-bronze/50 transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
