"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const interestOptions = [
  { value: "", label: "Área de interés" },
  { value: "recovery", label: "Recuperación & Longevidad" },
  { value: "performance", label: "Rendimiento & Condicionamiento" },
  { value: "strength", label: "Fuerza & Movilidad" },
  { value: "therapy", label: "Terapias de Bienestar" },
  { value: "corporate", label: "Bienestar Corporativo" },
  { value: "all", label: "Todo incluido" },
];

export default function MembershipCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /* No backend yet — on submit we just show the success message.
     To connect a real form handler, replace the setTimeout below with
     your fetch/API call and handle errors as needed. */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  /* text-base (16px) is critical on iOS — anything below 16px triggers auto-zoom on input focus */
  const inputClass =
    "w-full bg-juva-bg-elevated border border-juva-bronze/15 text-juva-cream text-base tracking-wide px-4 py-3.5 outline-none focus:border-juva-bronze/50 transition-colors duration-200 placeholder:text-juva-muted/40 rounded-none";

  return (
    <section
      id="membership"
      ref={ref}
      className="bg-juva-bg-deep py-20 md:py-40 px-6 relative overflow-hidden"
    >
      {/* Radial glow behind the form */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] glow-radial opacity-50 pointer-events-none"
      />

      <div className="max-w-2xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <p className="text-juva-bronze text-xs tracking-[0.35em] uppercase mb-5">
            Membresías
          </p>
          <h2 className="font-serif text-[clamp(2.2rem,5vw,3.8rem)] text-juva-cream leading-tight mb-5">
            Únete a JUVA
          </h2>
          <div className="w-12 h-px bg-juva-bronze mx-auto mb-6" />
          <p className="text-juva-muted text-sm md:text-base leading-relaxed max-w-md mx-auto">
            JUVA abre sus puertas a todos los que buscan un enfoque diferente
            hacia el bienestar, la recuperación y el rendimiento. Regístrate y
            te contactamos pronto.
          </p>
        </motion.div>

        {/* Form / Success */}
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                name="name"
                required
                placeholder="Nombre completo"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
                autoComplete="name"
              />

              <input
                type="email"
                name="email"
                required
                placeholder="Correo electrónico"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
                autoComplete="email"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Teléfono / WhatsApp"
                value={form.phone}
                onChange={handleChange}
                className={inputClass}
                autoComplete="tel"
                inputMode="tel"
              />

              <div className="relative">
                <select
                  name="interest"
                  value={form.interest}
                  onChange={handleChange}
                  className={`${inputClass} appearance-none cursor-pointer ${
                    form.interest === "" ? "text-juva-muted/40" : ""
                  }`}
                >
                  {interestOptions.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}
                      disabled={opt.value === ""}
                      className="bg-juva-bg-elevated text-juva-cream"
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
                {/* Custom select arrow */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-juva-bronze/50">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-2 w-full bg-juva-bronze text-juva-bg-deep py-4 text-sm tracking-[0.18em] uppercase font-medium hover:bg-juva-wood-light transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block w-4 h-4 border border-juva-bg-deep/40 border-t-juva-bg-deep rounded-full"
                    />
                    Enviando...
                  </span>
                ) : (
                  "Solicitar Acceso Anticipado"
                )}
              </motion.button>

              <p className="text-juva-muted/40 text-xs text-center tracking-wide mt-1">
                Tu información es privada y nunca será compartida.
              </p>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center py-16 glass-card px-8"
            >
              {/* Bronze check mark */}
              <div className="w-12 h-12 rounded-full border border-juva-bronze/40 flex items-center justify-center mx-auto mb-6">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#B58A5A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-juva-cream mb-3">
                Solicitud recibida.
              </h3>
              <p className="text-juva-muted text-sm leading-relaxed max-w-xs mx-auto">
                El equipo de JUVA se pondrá en contacto contigo pronto.
                Agradecemos tu interés.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
