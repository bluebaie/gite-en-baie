import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_REVIEWS_TABLE;
  const view = process.env.AIRTABLE_REVIEWS_VIEW;

  if (!token || !baseId || !table || !view) {
    return NextResponse.json(
      { error: "Missing Airtable env vars" },
      { status: 500 }
    );
  }

  const url =
    `https://api.airtable.com/v0/${baseId}/${table}?view=${view}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ error: text }, { status: 500 });
  }

  const data = await res.json();

  return NextResponse.json(data);
}