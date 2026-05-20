"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { sanctuarySpaces } from "@/lib/data";

const sanctuaryImages = [
  "/images/sauna.jpg",
  "/images/strength-room.jpg",
  "/images/infrared.jpg",
];

export default function SanctuarySection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="sanctuary"
      ref={ref}
      className="bg-juva-bg-base py-20 md:py-40 px-6 relative overflow-hidden"
    >
      {/* Top separator line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-juva-bronze/30 to-transparent"
      />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-juva-bronze text-xs tracking-[0.35em] uppercase mb-4">
            Los espacios
          </p>
          <h2 className="font-serif text-[clamp(2.2rem,5vw,4rem)] text-juva-cream leading-tight">
            El Santuario
          </h2>
          <p className="text-juva-muted text-sm md:text-base max-w-md mx-auto mt-5 leading-relaxed">
            Madera oscura, luz cálida, texturas naturales y espacios en silencio
            — un entorno que se siente más como un retiro privado que un espacio
            convencional.
          </p>
        </motion.div>

        {/* Editorial grid: one wide left, two stacked right on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left: large block (first space) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
            whileHover={{ scale: 1.015 }}
            className="relative overflow-hidden cursor-default group min-h-[320px] md:min-h-[520px]"
          >
            <Image
              src={sanctuaryImages[0]}
              alt={sanctuarySpaces[0].title}
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />

            {/* Warm texture overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse at 30% 70%, rgba(138,98,64,0.3) 0%, transparent 60%)",
              }}
            />

            {/* Text scrim */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(13,15,14,0.92) 0%, rgba(13,15,14,0.3) 50%, transparent 100%)",
              }}
            />

            {/* Text overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-juva-bronze/70 text-xs tracking-[0.25em] uppercase mb-2">
                01
              </p>
              <h3 className="font-serif text-2xl md:text-3xl text-juva-cream mb-2">
                {sanctuarySpaces[0].title}
              </h3>
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-juva-muted text-sm"
              >
                {sanctuarySpaces[0].tagline}
              </motion.p>
            </div>
          </motion.div>

          {/* Right: two stacked blocks */}
          <div className="flex flex-col gap-4">
            {sanctuarySpaces.slice(1).map((space, i) => (
              <motion.div
                key={space.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.9,
                  delay: 0.2 + i * 0.12,
                  ease: "easeOut",
                }}
                whileHover={{ scale: 1.015 }}
                className="relative overflow-hidden cursor-default group flex-1 min-h-[220px] md:min-h-[250px]"
              >
                <Image
                  src={sanctuaryImages[i + 1]}
                  alt={space.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Warm texture overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `radial-gradient(ellipse at ${i === 0 ? "70% 30%" : "30% 70%"}, rgba(181,138,90,0.2) 0%, transparent 60%)`,
                  }}
                />

                {/* Text scrim */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(13,15,14,0.9) 0%, rgba(13,15,14,0.2) 55%, transparent 100%)",
                  }}
                />

                {/* Text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-juva-bronze/70 text-xs tracking-[0.25em] uppercase mb-1">
                    0{i + 2}
                  </p>
                  <h3 className="font-serif text-xl md:text-2xl text-juva-cream mb-1">
                    {space.title}
                  </h3>
                  <p className="text-juva-muted text-xs">{space.tagline}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
