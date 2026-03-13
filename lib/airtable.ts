export type Gite = {
  id: string;

  nom: string;
  slug: string;

  adresse?: string;
  codePostal?: string;
  ville: string;
  secteur?: string;

  seoTitle?: string;

  descriptionCourte?: string;
  descriptionLongue?: string;

  imageUrl?: string;
  images?: string[];

  capacite?: number;
  surface?: number;
  chambres?: number;
  lits?: string;
  sallesDeBain?: number;

  type?: string;
  etoiles?: number;

  terrasse?: boolean;
  parking?: boolean;
  animaux?: boolean;
  wifi?: boolean;

  beds24Url?: string;  // ← AJOUTÉ : lien Beds24 (prioritaire pour le bouton Réserver)
  bookingUrl?: string;

  airbnbNote?: number;
  airbnbAvis?: number;
  bookingNote?: number;
  bookingAvis?: number;

  misEnAvant?: boolean;
  ordreAffichage?: number;
};

function firstAttachmentUrl(v: any): string | undefined {
  if (!v) return undefined;
  if (Array.isArray(v) && v[0]?.url) return v[0].url;
  return undefined;
}

function attachmentUrls(v: any): string[] {
  if (!v || !Array.isArray(v)) return [];
  return v.map((item: any) => item?.url).filter(Boolean);
}

function toNumber(v: any): number | undefined {
  if (typeof v === "number") return v;
  return undefined;
}

function toBoolean(v: any): boolean {
  return v === true;
}

export async function fetchGites(): Promise<Gite[]> {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_TABLE;

  if (!token || !baseId || !table) {
    throw new Error(
      "Airtable env vars missing (AIRTABLE_TOKEN, AIRTABLE_BASE_ID, AIRTABLE_TABLE)"
    );
  }

  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(
    table
  )}?pageSize=100&sort%5B0%5D%5Bfield%5D=OrdreAffichage&sort%5B0%5D%5Bdirection%5D=asc`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Airtable fetch error: ${res.status} ${txt}`);
  }

  const data = await res.json();

  const mapped: Gite[] = (data.records || []).map((r: any) => {
    const f = r.fields || {};

    return {
      id: r.id,

      nom: f.Nom ?? "",
      slug: f.Slug ?? "",

      adresse: f.Adresse ?? "",
      codePostal: f.CodePostal ?? f["Code postal"] ?? "",
      ville: f.Ville ?? "",
      secteur: f.Secteur ?? "",

      seoTitle: f.SeoTitle ?? f.MetaTitle ?? "",

      descriptionCourte:
        f.DescriptionCourte ??
        f["Description courte"] ??
        "",

      descriptionLongue:
        f.Description ??
        f["Description longue"] ??
        f.DescriptionLongue ??
        "",

      imageUrl: firstAttachmentUrl(f.ImagePrincipale),
      images: attachmentUrls(f.Galerie),

      capacite: toNumber(f.Capacite),
      surface: toNumber(f.Surface),
      chambres: toNumber(f.Chambres),
      lits: f.Lits ?? "",
      sallesDeBain:
        toNumber(f.SallesDeBain) ??
        toNumber(f["Salles de bain"]),

      type: f.Type ?? "",
      etoiles: toNumber(f.Etoiles),

      terrasse: toBoolean(f.Terrasse ?? f["Terrasse"] ?? f.terrasse),
      parking: toBoolean(f.Parking ?? f["Parking"] ?? f.parking),
      animaux: toBoolean(
        f.Animaux ??
        f["Animaux acceptés"] ??
        f["Animaux acceptes"] ??
        f["AnimauxAcceptes"] ??
        f["Animaux autorisés"] ??
        f["Chiens"] ??
        f["ChiensAcceptes"] ??
        f["Chiens acceptés"]
      ),
      wifi: toBoolean(f.Wifi ?? f["Wifi"] ?? f.wifi),

      // ── URLs réservation ──
      // Le champ dans Airtable s'appelle "beds24Url" (visible dans ta base)
      // On teste plusieurs variantes au cas où
      beds24Url:
        f.LienReservation ??
        f["Lien réservation"] ??
        f["LienReservation"] ??
        undefined,

      bookingUrl:
        f.BookingUrl ??
        f["Booking URL"] ??
        f["Lien réservation"] ??
        undefined,

      airbnbNote: toNumber(f.AirbnbNote),
      airbnbAvis: toNumber(f.AirbnbAvis),
      bookingNote: toNumber(f.BookingNote),
      bookingAvis: toNumber(f.BookingAvis),

      misEnAvant: toBoolean(f.MisEnAvant),
      ordreAffichage: toNumber(f.OrdreAffichage) ?? 999,
    };
  });

  return mapped.filter((g) => !!g.slug && !!g.nom);
}