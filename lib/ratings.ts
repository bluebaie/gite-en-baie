import type { Gite } from "./airtable";

function weightedAverage(items: { note?: number; avis?: number }[]) {
  const avisTotal = items.reduce((acc, x) => acc + (x.avis ?? 0), 0);
  if (!avisTotal) return { note: null as number | null, avis: 0 };

  const sum = items.reduce((acc, x) => acc + (x.note ?? 0) * (x.avis ?? 0), 0);
  return { note: sum / avisTotal, avis: avisTotal };
}

export function computeGlobalRatings(gites: Gite[]) {
  const airbnb = weightedAverage(gites.map(g => ({ note: g.airbnbNote, avis: g.airbnbAvis })));
  const booking = weightedAverage(gites.map(g => ({ note: g.bookingNote, avis: g.bookingAvis })));
  return { airbnb, booking };
}

export function formatNote(note: number | null, decimals = 2) {
  if (note == null) return "—";
  return note.toFixed(decimals).replace(".", ",");
}

export function formatInt(n?: number) {
  if (typeof n !== "number") return "0";
  return Math.round(n).toString();
}