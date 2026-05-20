"use client";

/* ─────────────────────────────────────────────────────────────────────────
   ReservationSection — HIDDEN UNTIL LAUNCH
   ─────────────────────────────────────────────────────────────────────────
   This component is NOT rendered yet. It is imported but commented out
   in src/app/page.tsx.

   When you are ready to launch bookings:
   1. Uncomment the import and <ReservationSection /> in page.tsx
   2. Connect a backend (see Backend section below)
   3. Replace AVAILABLE_SLOTS with real availability from your API
   4. Replace the handleSubmit mock with a real API call

   BACKEND OPTIONS (recommended):
   ─ Supabase (free tier) — create a "reservations" table, use their JS SDK
   ─ Cal.com (open source, self-hostable) — no per-booking fees
   ─ Calendly API — easiest integration, but has per-seat costs
   ─────────────────────────────────────────────────────────────────────────
*/

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { technologies } from "@/lib/data";

/* ─── Mock availability data — replace with real API call ─────────────────
   Structure: { date: string (ISO), slots: string[] }
   Fetch this from your backend based on the selected service.          */
const MOCK_SLOTS = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

/* Days to show in the date picker — generate from today + 14 days */
function getNext14Days(): { label: string; value: string }[] {
  const days: { label: string; value: string }[] = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const label = d.toLocaleDateString("es-EC", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    days.push({ label, value: d.toISOString().split("T")[0] });
  }
  return days;
}

interface ReservationForm {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  slot: string;
  notes: string;
}

export default function ReservationSection() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<ReservationForm>({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    slot: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const days = getNext14Days();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const selectDate = (value: string) =>
    setForm((prev) => ({ ...prev, date: value, slot: "" }));

  const selectSlot = (slot: string) =>
    setForm((prev) => ({ ...prev, slot }));

  /* Replace this mock with a real fetch to your API or Supabase insert */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setConfirmed(true);
    }, 1200);
  };

  /* text-base (16px) on all inputs — prevents iOS auto-zoom */
  const inputClass =
    "w-full bg-juva-bg-elevated border border-juva-bronze/15 text-juva-cream text-base tracking-wide px-4 py-3.5 outline-none focus:border-juva-bronze/50 transition-colors duration-200 placeholder:text-juva-muted/40 rounded-none";

  return (
    <section
      id="reservar"
      className="bg-juva-bg-base py-20 md:py-40 px-6 relative overflow-hidden"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] glow-radial opacity-40 pointer-events-none"
      />

      <div className="max-w-2xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-juva-bronze text-xs tracking-[0.35em] uppercase mb-4">
            Reservas
          </p>
          <h2 className="font-serif text-[clamp(2.2rem,5vw,3.8rem)] text-juva-cream leading-tight mb-4">
            Reservar Sesión
          </h2>
          <div className="w-12 h-px bg-juva-bronze mx-auto mb-5" />
          <p className="text-juva-muted text-sm leading-relaxed max-w-sm mx-auto">
            Selecciona el servicio, elige fecha y hora, y confirma tu reserva.
          </p>
        </div>

        {/* Step progress indicator */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {([1, 2, 3] as const).map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs transition-all duration-300 ${
                  step >= s
                    ? "border-juva-bronze bg-juva-bronze text-juva-bg-deep font-medium"
                    : "border-juva-bronze/20 text-juva-muted"
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`w-8 h-px transition-colors duration-300 ${
                    step > s ? "bg-juva-bronze/60" : "bg-juva-bronze/15"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ─── Step 1: Select service + date + time ─── */}
          {step === 1 && !confirmed && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col gap-5"
            >
              {/* Service selector */}
              <div>
                <p className="text-juva-bronze/70 text-xs tracking-[0.2em] uppercase mb-3">
                  Servicio
                </p>
                <div className="relative">
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none cursor-pointer ${
                      form.service === "" ? "text-juva-muted/40" : ""
                    }`}
                  >
                    <option value="" disabled className="bg-juva-bg-elevated text-juva-muted">
                      Selecciona un servicio
                    </option>
                    {technologies.map((t) => (
                      <option key={t.id} value={t.id} className="bg-juva-bg-elevated text-juva-cream">
                        {t.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-juva-bronze/50">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Date picker */}
              <div>
                <p className="text-juva-bronze/70 text-xs tracking-[0.2em] uppercase mb-3">
                  Fecha
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {days.slice(0, 8).map((day) => (
                    <button
                      key={day.value}
                      type="button"
                      onClick={() => selectDate(day.value)}
                      className={`py-3 px-2 text-center text-xs border transition-all duration-200 ${
                        form.date === day.value
                          ? "border-juva-bronze bg-juva-bronze/10 text-juva-cream"
                          : "border-juva-bronze/15 text-juva-muted hover:border-juva-bronze/40 hover:text-juva-cream"
                      }`}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time slot picker */}
              {form.date && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-juva-bronze/70 text-xs tracking-[0.2em] uppercase mb-3">
                    Horario
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {MOCK_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => selectSlot(slot)}
                        className={`py-3 text-xs border transition-all duration-200 ${
                          form.slot === slot
                            ? "border-juva-bronze bg-juva-bronze/10 text-juva-cream"
                            : "border-juva-bronze/15 text-juva-muted hover:border-juva-bronze/40 hover:text-juva-cream"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              <motion.button
                type="button"
                disabled={!form.service || !form.date || !form.slot}
                onClick={() => setStep(2)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-2 w-full bg-juva-bronze text-juva-bg-deep py-4 text-sm tracking-[0.18em] uppercase font-medium hover:bg-juva-wood-light transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continuar
              </motion.button>
            </motion.div>
          )}

          {/* ─── Step 2: Personal info ─── */}
          {step === 2 && !confirmed && (
            <motion.form
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              onSubmit={(e) => { e.preventDefault(); setStep(3); }}
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
                required
                placeholder="Teléfono / WhatsApp"
                value={form.phone}
                onChange={handleChange}
                className={inputClass}
                autoComplete="tel"
                inputMode="tel"
              />
              <textarea
                name="notes"
                placeholder="Notas adicionales (opcional)"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                className={`${inputClass} resize-none`}
              />

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 border border-juva-bronze/20 text-juva-muted text-sm tracking-wider hover:border-juva-bronze/40 hover:text-juva-cream transition-all duration-300"
                >
                  Atrás
                </button>
                <motion.button
                  type="submit"
                  disabled={!form.name || !form.email || !form.phone}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-[2] bg-juva-bronze text-juva-bg-deep py-4 text-sm tracking-[0.18em] uppercase font-medium hover:bg-juva-wood-light transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Revisar
                </motion.button>
              </div>
            </motion.form>
          )}

          {/* ─── Step 3: Confirmation summary ─── */}
          {step === 3 && !confirmed && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
            >
              {/* Summary card */}
              <div className="glass-card p-6 mb-6 space-y-4">
                <p className="text-juva-bronze/70 text-xs tracking-[0.25em] uppercase mb-4">
                  Resumen de reserva
                </p>
                {[
                  { label: "Servicio", value: technologies.find(t => t.id === form.service)?.name || "" },
                  { label: "Fecha", value: form.date },
                  { label: "Hora", value: form.slot },
                  { label: "Nombre", value: form.name },
                  { label: "Correo", value: form.email },
                  { label: "Teléfono", value: form.phone },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between gap-4 text-sm">
                    <span className="text-juva-muted">{row.label}</span>
                    <span className="text-juva-cream text-right">{row.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 py-4 border border-juva-bronze/20 text-juva-muted text-sm tracking-wider hover:border-juva-bronze/40 hover:text-juva-cream transition-all duration-300"
                >
                  Editar
                </button>
                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-[2] bg-juva-bronze text-juva-bg-deep py-4 text-sm tracking-[0.18em] uppercase font-medium hover:bg-juva-wood-light transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Confirmando..." : "Confirmar Reserva"}
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ─── Success state ─── */}
          {confirmed && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16 glass-card px-8"
            >
              <div className="w-12 h-12 rounded-full border border-juva-bronze/40 flex items-center justify-center mx-auto mb-6">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B58A5A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-juva-cream mb-3">
                Reserva confirmada.
              </h3>
              <p className="text-juva-muted text-sm leading-relaxed max-w-xs mx-auto">
                Recibirás un correo de confirmación. El equipo de JUVA te contactará para coordinar los detalles.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
