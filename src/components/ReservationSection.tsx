"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { SERVICES } from "@/lib/bookingServices";

type Slot = {
  time: string;
  available: boolean;
  remaining: number;
};

type Step = 1 | 2 | 3;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3 } },
};

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

function formatDisplayDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("es-EC", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ReservationSection() {
  const [step, setStep] = useState<Step>(1);

  // Step 1
  const [serviceId, setServiceId] = useState(SERVICES[0].id);
  const [date, setDate] = useState(todayISO());
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Step 2
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  // Step 3
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const selectedService = SERVICES.find((s) => s.id === serviceId)!;

  const fetchSlots = useCallback(async () => {
    setSlotsLoading(true);
    setSelectedTime(null);
    try {
      const res = await fetch(
        `/api/availability?serviceId=${serviceId}&date=${date}`
      );
      const data = await res.json();
      setSlots(data.slots ?? []);
    } catch {
      setSlots([]);
    } finally {
      setSlotsLoading(false);
    }
  }, [serviceId, date]);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  async function handleConfirm() {
    if (!selectedTime) return;
    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          date,
          startTime: selectedTime,
          name,
          email,
          phone,
          notes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? "Ocurrió un error. Intenta de nuevo.");
      } else {
        setSuccess(true);
      }
    } catch {
      setErrorMsg("Error de conexión. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setStep(1);
    setServiceId(SERVICES[0].id);
    setDate(todayISO());
    setSelectedTime(null);
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
    setSuccess(false);
    setErrorMsg(null);
  }

  const inputClass =
    "w-full bg-juva-bg-elevated border border-juva-cream/10 text-juva-cream placeholder-juva-muted/50 px-4 py-3 text-base focus:outline-none focus:border-juva-bronze/60 transition-colors";

  return (
    <section
      id="reservar"
      className="bg-juva-bg-base py-20 md:py-40 px-6 relative overflow-hidden"
    >
      {/* Glow accent */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-juva-bronze/30 to-transparent"
      />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-juva-bronze text-xs tracking-[0.35em] uppercase mb-4">
            Reservar
          </p>
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.2rem)] text-juva-cream leading-tight">
            Elige tu sesión
          </h2>
          <p className="text-juva-muted text-sm mt-4 max-w-md mx-auto leading-relaxed">
            Selecciona el servicio, la fecha y el horario. Te confirmaremos tu
            reserva de inmediato.
          </p>
        </div>

        {/* Progress indicator */}
        {!success && (
          <div className="flex items-center justify-center gap-3 mb-12">
            {([1, 2, 3] as Step[]).map((s) => (
              <div key={s} className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 flex items-center justify-center text-[10px] tracking-wider font-medium transition-colors duration-300 ${
                    step === s
                      ? "bg-juva-bronze text-juva-bg-deep"
                      : step > s
                      ? "bg-juva-bronze/30 text-juva-bronze"
                      : "bg-juva-bg-elevated text-juva-muted/50"
                  }`}
                >
                  {step > s ? (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  ) : (
                    s
                  )}
                </div>
                {s < 3 && (
                  <div
                    className={`w-12 h-px transition-colors duration-300 ${
                      step > s ? "bg-juva-bronze/50" : "bg-juva-cream/10"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* ── STEP 1: Service + Date + Time ── */}
          {!success && step === 1 && (
            <motion.div
              key="step1"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-8"
            >
              {/* Service selector */}
              <div>
                <label className="block text-juva-bronze/80 text-xs tracking-[0.2em] uppercase mb-3">
                  Servicio
                </label>
                <select
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className={inputClass + " appearance-none cursor-pointer"}
                >
                  {SERVICES.map((s) => (
                    <option
                      key={s.id}
                      value={s.id}
                      className="bg-juva-bg-elevated"
                    >
                      {s.name} — {s.durationMin} min
                    </option>
                  ))}
                </select>
                <p className="text-juva-muted/60 text-xs mt-2">
                  {selectedService.description}
                </p>
              </div>

              {/* Date picker */}
              <div>
                <label className="block text-juva-bronze/80 text-xs tracking-[0.2em] uppercase mb-3">
                  Fecha
                </label>
                <input
                  type="date"
                  value={date}
                  min={todayISO()}
                  onChange={(e) => setDate(e.target.value)}
                  className={inputClass + " cursor-pointer"}
                />
              </div>

              {/* Time slots */}
              <div>
                <label className="block text-juva-bronze/80 text-xs tracking-[0.2em] uppercase mb-3">
                  Horario disponible
                </label>

                {slotsLoading ? (
                  <div className="flex items-center gap-3 py-8 text-juva-muted/50 text-sm">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-4 h-4 border border-juva-bronze/40 border-t-juva-bronze rounded-full"
                    />
                    Cargando horarios…
                  </div>
                ) : slots.length === 0 ? (
                  <p className="text-juva-muted/50 text-sm py-4">
                    No hay horarios disponibles para esta fecha.
                  </p>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    {slots.map((slot) => (
                      <button
                        key={slot.time}
                        disabled={!slot.available}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`py-3 text-sm text-center transition-all duration-200 ${
                          !slot.available
                            ? "opacity-25 cursor-not-allowed bg-juva-bg-elevated text-juva-muted"
                            : selectedTime === slot.time
                            ? "bg-juva-bronze text-juva-bg-deep font-medium"
                            : "bg-juva-bg-elevated text-juva-cream border border-juva-cream/10 hover:border-juva-bronze/50 hover:text-juva-bronze"
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <motion.button
                onClick={() => setStep(2)}
                disabled={!selectedTime}
                whileHover={selectedTime ? { scale: 1.02 } : {}}
                whileTap={selectedTime ? { scale: 0.98 } : {}}
                className="w-full py-4 bg-juva-bronze text-juva-bg-deep text-sm tracking-[0.15em] uppercase font-medium transition-all duration-300 hover:bg-juva-wood-light disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continuar
              </motion.button>
            </motion.div>
          )}

          {/* ── STEP 2: Personal info ── */}
          {!success && step === 2 && (
            <motion.div
              key="step2"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              <div className="bg-juva-bg-elevated border border-juva-cream/10 px-5 py-4 text-sm text-juva-muted">
                <span className="text-juva-bronze font-medium">
                  {selectedService.name}
                </span>
                {" — "}
                {formatDisplayDate(date)} a las{" "}
                <span className="text-juva-cream">{selectedTime}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-juva-bronze/80 text-xs tracking-[0.2em] uppercase mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                    autoComplete="name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-juva-bronze/80 text-xs tracking-[0.2em] uppercase mb-2">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    autoComplete="email"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-juva-bronze/80 text-xs tracking-[0.2em] uppercase mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+593 99 000 0000"
                    autoComplete="tel"
                    inputMode="tel"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-juva-bronze/80 text-xs tracking-[0.2em] uppercase mb-2">
                    Notas adicionales
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Condiciones, preferencias…"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 border border-juva-cream/20 text-juva-muted text-sm tracking-[0.15em] uppercase hover:border-juva-bronze/40 hover:text-juva-cream transition-all duration-300"
                >
                  Atrás
                </button>
                <motion.button
                  onClick={() => setStep(3)}
                  disabled={!name.trim() || !email.trim()}
                  whileHover={name && email ? { scale: 1.02 } : {}}
                  whileTap={name && email ? { scale: 0.98 } : {}}
                  className="flex-[2] py-4 bg-juva-bronze text-juva-bg-deep text-sm tracking-[0.15em] uppercase font-medium transition-all duration-300 hover:bg-juva-wood-light disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Revisar reserva
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: Confirm ── */}
          {!success && step === 3 && (
            <motion.div
              key="step3"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              <div className="border border-juva-bronze/20 divide-y divide-juva-cream/[0.08]">
                {[
                  { label: "Servicio", value: selectedService.name },
                  {
                    label: "Duración",
                    value: `${selectedService.durationMin} minutos`,
                  },
                  { label: "Fecha", value: formatDisplayDate(date) },
                  { label: "Hora", value: selectedTime ?? "" },
                  { label: "Nombre", value: name },
                  { label: "Correo", value: email },
                  ...(phone ? [{ label: "Teléfono", value: phone }] : []),
                  ...(notes ? [{ label: "Notas", value: notes }] : []),
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between px-5 py-3 text-sm"
                  >
                    <span className="text-juva-muted/70">{row.label}</span>
                    <span className="text-juva-cream text-right max-w-[60%]">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              {errorMsg && (
                <p className="text-red-400/80 text-sm text-center">
                  {errorMsg}
                </p>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  disabled={submitting}
                  className="flex-1 py-4 border border-juva-cream/20 text-juva-muted text-sm tracking-[0.15em] uppercase hover:border-juva-bronze/40 hover:text-juva-cream transition-all duration-300 disabled:opacity-40"
                >
                  Atrás
                </button>
                <motion.button
                  onClick={handleConfirm}
                  disabled={submitting}
                  whileHover={!submitting ? { scale: 1.02 } : {}}
                  whileTap={!submitting ? { scale: 0.98 } : {}}
                  className="flex-[2] py-4 bg-juva-bronze text-juva-bg-deep text-sm tracking-[0.15em] uppercase font-medium transition-all duration-300 hover:bg-juva-wood-light disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {submitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-juva-bg-deep/30 border-t-juva-bg-deep rounded-full"
                      />
                      Confirmando…
                    </>
                  ) : (
                    "Confirmar reserva"
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ── SUCCESS ── */}
          {success && (
            <motion.div
              key="success"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-center py-12 space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 18,
                  delay: 0.1,
                }}
                className="w-16 h-16 mx-auto bg-juva-bronze/15 border border-juva-bronze/30 flex items-center justify-center"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="text-juva-bronze"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </motion.div>

              <div>
                <h3 className="font-serif text-2xl text-juva-cream mb-2">
                  Reserva confirmada
                </h3>
                <p className="text-juva-muted text-sm leading-relaxed max-w-sm mx-auto">
                  Tu sesión de{" "}
                  <span className="text-juva-bronze">{selectedService.name}</span>{" "}
                  el {formatDisplayDate(date)} a las{" "}
                  <span className="text-juva-cream">{selectedTime}</span> está
                  reservada. Te esperamos en JUVA.
                </p>
              </div>

              <motion.button
                onClick={reset}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-3 border border-juva-cream/20 text-juva-muted text-sm tracking-[0.15em] uppercase hover:border-juva-bronze/50 hover:text-juva-cream transition-all duration-300"
              >
                Nueva reserva
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
