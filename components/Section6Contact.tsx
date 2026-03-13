"use client";

import { useEffect, useMemo, useState } from "react";

type ReasonId = "question" | "dates" | "access";
type Reason = { id: ReasonId; title: string; desc: string };

const REASONS: Reason[] = [
  { id: "dates",    title: "Vérifier une disponibilité", desc: "Indiquez vos dates : nous vous confirmons rapidement les options possibles." },
  { id: "question", title: "Poser une question",         desc: "Accès, équipements, arrivée, environnement : nous répondons avec précision." },
  { id: "access",   title: "Préparer votre arrivée",     desc: "Informations pratiques, adresse, stationnement et recommandations locales." },
];

function cn(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

export default function Section6ContactReservation() {
  const [reason, setReason] = useState<ReasonId>("dates");

  const [name,        setName]        = useState("");
  const [email,       setEmail]       = useState("");
  const [phone,       setPhone]       = useState("");
  const [guests,      setGuests]      = useState<string>("");
  const [arrival,     setArrival]     = useState("");
  const [departure,   setDeparture]   = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [bookingRef,  setBookingRef]  = useState("");
  const [gite,        setGite]        = useState("");
  const [message,     setMessage]     = useState("");

  const [isSending, setIsSending] = useState(false);
  const [status,    setStatus]    = useState<null | { type: "success" | "error"; text: string }>(null);

  // Mobile : sélecteur de motif rétractable
  const [reasonOpen, setReasonOpen] = useState(false);

  const showDatesFields  = reason === "dates";
  const showAccessFields = reason === "access";
  const showArrivalDepartureForAccess = true;

  useEffect(() => {
    setStatus(null);
    if (reason === "question") { setGuests(""); setArrival(""); setDeparture(""); setArrivalTime(""); setBookingRef(""); setGite(""); setPhone(""); }
    if (reason === "dates")    { setArrivalTime(""); setBookingRef(""); }
    if (reason === "access")   { setGite(""); setGuests(""); }
  }, [reason]);

  const mailto = useMemo(() => {
    const subject = encodeURIComponent("Demande - Gîtes en Baie");
    const body    = encodeURIComponent(`Bonjour,\n\nMotif : ${reason}\n\nNom : ${name}\nEmail : ${email}\n`);
    return `mailto:bluebaieconciergerie@gmail.com?subject=${subject}&body=${body}`;
  }, [reason, name, email]);

  function resetAll() { setName(""); setEmail(""); setPhone(""); setGuests(""); setArrival(""); setDeparture(""); setArrivalTime(""); setBookingRef(""); setGite(""); setMessage(""); }

  function validate() {
    if (!name.trim())    return "Merci d'indiquer votre nom.";
    if (!email.trim())   return "Merci d'indiquer votre email.";
    if (!message.trim()) return "Merci de préciser votre message.";
    if ((reason === "dates" || reason === "access") && arrival && departure && arrival > departure) return "Les dates semblent inversées.";
    if (reason === "dates" && guests && Number.isNaN(Number(guests))) return "Nombre de personnes invalide.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    const err = validate();
    if (err) { setStatus({ type: "error", text: err }); return; }
    setIsSending(true);
    try {
      const payload = { reason, name: name.trim(), email: email.trim(), phone: (showDatesFields || showAccessFields) ? (phone.trim() || null) : null, guests: showDatesFields && guests ? Number(guests) : null, arrival: (showDatesFields || (showAccessFields && showArrivalDepartureForAccess)) ? (arrival || null) : null, departure: (showDatesFields || (showAccessFields && showArrivalDepartureForAccess)) ? (departure || null) : null, arrivalTime: showAccessFields ? (arrivalTime.trim() || null) : null, bookingRef: showAccessFields ? (bookingRef.trim() || null) : null, gite: showDatesFields ? (gite.trim() || null) : null, message: message.trim() };
      const res  = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Erreur serveur. Veuillez réessayer.");
      setStatus({ type: "success", text: "Merci, votre demande a bien été envoyée. Nous revenons vers vous rapidement." });
      resetAll();
    } catch (error: any) {
      setStatus({ type: "error", text: error?.message || "Une erreur est survenue. Veuillez réessayer." });
    } finally {
      setIsSending(false);
    }
  }

  const currentReason = REASONS.find((r) => r.id === reason)!;

  const inputClass = "mt-2 w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-white/20";

  return (
    <section className="relative w-full overflow-hidden py-12 sm:py-16">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#2a5d5a] via-[#1c4a50] to-[#0f333c]" />
      <div className="absolute inset-0 -z-10 opacity-[0.25] [background:radial-gradient(1200px_600px_at_10%_20%,rgba(255,255,255,0.10),transparent_55%),radial-gradient(900px_500px_at_80%_60%,rgba(255,255,255,0.07),transparent_60%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.05]" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">

        {/* Header */}
        <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 sm:mb-3 text-[10px] sm:text-[11px] uppercase tracking-[0.38em] sm:tracking-[0.42em] text-white/70">
              CONTACT & RÉSERVATION
            </p>
            <h2 className="text-xl sm:text-3xl md:text-5xl font-light leading-[1.1] sm:leading-[1.08] text-white drop-shadow-[0_6px_18px_rgba(0,0,0,0.35)]">
              Une question, une date, une réservation
            </h2>
            <p className="mt-2 sm:mt-4 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed text-white/75">
              Indiquez votre demande : nous vous répondons rapidement avec des informations claires et les meilleures options pour votre séjour.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://beds24.com/booking2.php?ownerid=114927&referer=BookingLink"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white/15 px-5 py-2 text-sm text-white transition-all duration-200 ease-out hover:bg-white/25 hover:-translate-y-[1px] active:translate-y-0"
            >
              Réserver →
            </a>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 lg:grid-cols-12">

          {/* ── GAUCHE : sélecteur motif ── */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/10 p-4 sm:p-6 backdrop-blur">
              <div className="text-sm font-semibold text-white">Votre demande</div>
              <p className="mt-1 text-xs sm:text-sm text-white/70">Sélectionnez le motif : le formulaire s'adapte.</p>

              {/* Desktop : liste complète (inchangée) */}
              <div className="hidden sm:block mt-5 space-y-2">
                {REASONS.map((r) => {
                  const active = r.id === reason;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setReason(r.id)}
                      className={cn(
                        "group w-full rounded-2xl border p-4 text-left",
                        "transition-all duration-200 ease-out will-change-transform",
                        "hover:scale-[1.02] active:scale-[0.99]",
                        active
                          ? "border-white/25 bg-white/16 shadow-[0_14px_36px_rgba(0,0,0,0.30)]"
                          : "border-white/10 bg-white/8 hover:bg-white/12 hover:border-white/16"
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold text-white">{r.title}</div>
                          <div className="mt-1 text-sm leading-relaxed text-white/70">{r.desc}</div>
                        </div>
                        <span className={cn("mt-1 h-2 w-2 shrink-0 rounded-full transition", active ? "bg-white/90" : "bg-white/35 group-hover:bg-white/55")} />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Mobile : sélecteur compact avec dropdown */}
              <div className="sm:hidden mt-4 space-y-2">
                {/* Bouton actif affiché */}
                <button
                  type="button"
                  onClick={() => setReasonOpen((v) => !v)}
                  className="w-full rounded-2xl border border-white/25 bg-white/16 p-4 text-left"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-white">{currentReason.title}</div>
                      <div className="mt-0.5 text-xs text-white/60">{currentReason.desc}</div>
                    </div>
                    <svg
                      width="16" height="16" viewBox="0 0 16 16" fill="none"
                      className={cn("shrink-0 transition-transform", reasonOpen ? "rotate-180" : "")}
                    >
                      <path d="M4 6l4 4 4-4" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>

                {/* Autres options */}
                {reasonOpen && REASONS.filter((r) => r.id !== reason).map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => { setReason(r.id); setReasonOpen(false); }}
                    className="w-full rounded-2xl border border-white/10 bg-white/8 p-3.5 text-left"
                  >
                    <div className="text-sm font-semibold text-white">{r.title}</div>
                    <div className="mt-0.5 text-xs text-white/60">{r.desc}</div>
                  </button>
                ))}
              </div>

              <div className="mt-5 sm:mt-6 rounded-2xl border border-white/10 bg-white/8 p-3.5 sm:p-4">
                <div className="text-xs uppercase tracking-[0.28em] text-white/60">Réponse</div>
                <div className="mt-1 text-xs sm:text-sm text-white/75">
                  Nous revenons vers vous dans les meilleurs délais (selon l'activité et les périodes d'arrivée/départ).
                </div>
              </div>
            </div>
          </div>

          {/* ── DROITE : formulaire ── */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/10 p-4 sm:p-6 backdrop-blur">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="pointer-events-none absolute -top-24 right-0 h-56 w-56 rounded-full bg-white/10 blur-3xl opacity-40" />

              <div className="flex items-center justify-between gap-4">
                <div className="text-sm font-semibold text-white">Formulaire de contact</div>
                <div className="text-xs text-white/55 hidden sm:block">* Champs essentiels seulement</div>
              </div>

              <div key={reason} className="animate-[fadeInUp_220ms_ease-out]">
                <form className="mt-5 sm:mt-6 grid gap-3 sm:gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>

                  <div className="sm:col-span-1">
                    <label className="text-xs text-white/70">Nom</label>
                    <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Votre nom" />
                  </div>

                  <div className="sm:col-span-1">
                    <label className="text-xs text-white/70">Email</label>
                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="nom@email.com" />
                  </div>

                  {showDatesFields && (
                    <>
                      <div className="sm:col-span-1">
                        <label className="text-xs text-white/70">Téléphone (optionnel)</label>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="06 …" />
                      </div>
                      <div className="sm:col-span-1">
                        <label className="text-xs text-white/70">Nombre de personnes</label>
                        <input inputMode="numeric" value={guests} onChange={(e) => setGuests(e.target.value)} className={inputClass} placeholder="Ex : 2" />
                      </div>
                      <div className="sm:col-span-1">
                        <label className="text-xs text-white/70">Arrivée</label>
                        <input type="date" value={arrival} onChange={(e) => setArrival(e.target.value)} className={inputClass} />
                      </div>
                      <div className="sm:col-span-1">
                        <label className="text-xs text-white/70">Départ</label>
                        <input type="date" value={departure} onChange={(e) => setDeparture(e.target.value)} className={inputClass} />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-xs text-white/70">Gîte souhaité (optionnel)</label>
                        <input value={gite} onChange={(e) => setGite(e.target.value)} className={inputClass} placeholder="Ex : Balise en Baie" />
                      </div>
                    </>
                  )}

                  {showAccessFields && (
                    <>
                      <div className="sm:col-span-1">
                        <label className="text-xs text-white/70">Téléphone (optionnel)</label>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="06 …" />
                      </div>
                      {showArrivalDepartureForAccess && (
                        <>
                          <div className="sm:col-span-1">
                            <label className="text-xs text-white/70">Arrivée (optionnel)</label>
                            <input type="date" value={arrival} onChange={(e) => setArrival(e.target.value)} className={inputClass} />
                          </div>
                          <div className="sm:col-span-1">
                            <label className="text-xs text-white/70">Départ (optionnel)</label>
                            <input type="date" value={departure} onChange={(e) => setDeparture(e.target.value)} className={inputClass} />
                          </div>
                        </>
                      )}
                      <div className="sm:col-span-1">
                        <label className="text-xs text-white/70">Heure d'arrivée (optionnel)</label>
                        <input value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} className={inputClass} placeholder="Ex : vers 16h" />
                      </div>
                      <div className="sm:col-span-1">
                        <label className="text-xs text-white/70">Référence réservation (optionnel)</label>
                        <input value={bookingRef} onChange={(e) => setBookingRef(e.target.value)} className={inputClass} placeholder="Si vous en avez une" />
                      </div>
                    </>
                  )}

                  <div className="sm:col-span-2">
                    <label className="text-xs text-white/70">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm leading-relaxed text-white placeholder:text-white/35 outline-none focus:border-white/20"
                      placeholder={
                        reason === "dates"   ? "Indiquez vos dates, le gîte souhaité si vous en avez un, et toute précision utile." :
                        reason === "question"? "Posez votre question : nous vous répondons rapidement." :
                                               "Précisez votre heure d'arrivée approximative et vos besoins éventuels."
                      }
                    />
                  </div>

                  {/* Status + bouton */}
                  <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      {status && (
                        <div className={cn("mb-2 rounded-2xl border px-4 py-2 text-xs sm:text-sm", status.type === "success" ? "border-white/20 bg-white/12 text-white" : "border-red-200/30 bg-red-500/10 text-white")}>
                          {status.text}
                        </div>
                      )}
                      <div className="text-xs text-white/55 hidden sm:block">En envoyant, vous acceptez d'être recontacté(e) concernant votre demande.</div>
                    </div>

                    {/* Bouton pleine largeur sur mobile */}
                    <button
                      type="submit"
                      disabled={isSending}
                      className={cn(
                        "w-full sm:w-auto inline-flex items-center justify-center rounded-full px-5 py-3 sm:py-2 text-sm text-white",
                        "transition-all duration-200 ease-out will-change-transform",
                        isSending ? "bg-white/10 cursor-not-allowed" : "bg-white/15 hover:bg-white/25 hover:-translate-y-[1px] active:translate-y-0"
                      )}
                    >
                      {isSending ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border border-white/30 border-t-white/80" />
                          Envoi…
                        </span>
                      ) : "Envoyer →"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Contacts */}
              <div className="mt-5 sm:mt-6 grid gap-2 sm:gap-3 grid-cols-2">
                <a href="mailto:bluebaieconciergerie@gmail.com" className="rounded-2xl border border-white/10 bg-white/8 px-3 sm:px-4 py-2.5 sm:py-3 block">
                  <div className="text-[11px] sm:text-xs text-white/60">Email</div>
                  <div className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-white/85 truncate">bluebaieconciergerie@gmail.com</div>
                </a>
                <a href="tel:+33761757500" className="rounded-2xl border border-white/10 bg-white/8 px-3 sm:px-4 py-2.5 sm:py-3 block">
                  <div className="text-[11px] sm:text-xs text-white/60">Téléphone</div>
                  <div className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-white/85">07 61 75 75 00</div>
                </a>
              </div>
            </div>

            <p className="mt-3 sm:mt-4 text-xs text-white/45">
              * Votre demande est enregistrée et traitée par l'équipe Blue Baie Conciergerie.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}