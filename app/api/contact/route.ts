import { NextResponse } from "next/server";

type Payload = {
  reason?: "dates" | "question" | "access";
  name: string;
  email: string;
  phone?: string;
  guests?: string | number;
  arrival?: string;
  departure?: string;
  arrivalTime?: string;
  bookingRef?: string;
  gite?: string;
  message?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    if (!body?.name || !body?.email) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants (nom, email)." },
        { status: 400 }
      );
    }

    const baseId = process.env.AIRTABLE_BASE_ID;
    const token = process.env.AIRTABLE_TOKEN;
    const tableName =
      process.env.AIRTABLE_DEMANDE_TABLE ||
      process.env.AIRTABLE_DEMANDES_TABLE;

    // On accepte les 2 noms pour éviter toute ambiguïté
    const makeWebhookUrl =
      process.env.MAKE_CONTACT_WEBHOOK_URL ||
      process.env.NEXT_PUBLIC_MAKE_CONTACT_WEBHOOK;

    console.log("CONTACT API START");
    console.log("Webhook URL trouvée ?", !!makeWebhookUrl);
    console.log("Nom:", body.name, "| Email:", body.email, "| Motif:", body.reason);

    if (!baseId || !token || !tableName) {
      return NextResponse.json(
        { error: "Config serveur Airtable manquante (.env.local)." },
        { status: 500 }
      );
    }

    if (!makeWebhookUrl) {
      return NextResponse.json(
        {
          error:
            "Webhook Make manquant. Ajoute MAKE_CONTACT_WEBHOOK_URL ou NEXT_PUBLIC_MAKE_CONTACT_WEBHOOK dans .env.local.",
        },
        { status: 500 }
      );
    }

    const fields: Record<string, any> = {
      Nom: body.name,
      Email: body.email,
      Téléphone: body.phone || "",
      Motif:
        body.reason === "dates"
          ? "Disponibilité"
          : body.reason === "question"
          ? "Question"
          : body.reason === "access"
          ? "Préparer arrivée"
          : "",
      "Gîte souhaité": body.gite || "",
      "Nombre personnes":
        body.guests === "" || body.guests === undefined
          ? null
          : Number(body.guests),
      Arrivée: body.arrival || null,
      Départ: body.departure || null,
      "Heure arrivée": body.arrivalTime || "",
      "Référence réservation": body.bookingRef || "",
      Message: body.message || "",
    };

    // 1) Envoi Airtable
    const airtableUrl = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(
      tableName
    )}`;

    const airtableRes = await fetch(airtableUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ records: [{ fields }] }),
    });

    if (!airtableRes.ok) {
      const text = await airtableRes.text();
      console.log("Airtable ERROR:", text);
      return NextResponse.json(
        { error: "Erreur Airtable", details: text },
        { status: 500 }
      );
    }

    const airtableData = await airtableRes.json();
    const createdRecord = airtableData?.records?.[0];
    console.log("Airtable OK. Record ID:", createdRecord?.id);

    // 2) Envoi Make
    const makePayload = {
      source: "site-blue-baie",
      submittedAt: new Date().toISOString(),

      reason: body.reason || null,
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      guests:
        body.guests === "" || body.guests === undefined
          ? null
          : Number(body.guests),
      arrival: body.arrival || null,
      departure: body.departure || null,
      arrivalTime: body.arrivalTime || null,
      bookingRef: body.bookingRef || null,
      gite: body.gite || null,
      message: body.message || null,

      airtableRecordId: createdRecord?.id || null,
      airtableFields: fields,
    };

    console.log("Envoi vers Make...");
    const makeRes = await fetch(makeWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(makePayload),
    });

    console.log("Make status:", makeRes.status);

    if (!makeRes.ok) {
      const makeText = await makeRes.text();
      console.log("Make ERROR:", makeText);
      return NextResponse.json(
        {
          error: "Demande enregistrée dans Airtable mais erreur Make",
          details: makeText,
        },
        { status: 500 }
      );
    }

    console.log("Make OK");
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.log("API CONTACT ERROR:", e);
    return NextResponse.json(
      { error: "Erreur serveur (POST /api/contact)" },
      { status: 500 }
    );
  }
}