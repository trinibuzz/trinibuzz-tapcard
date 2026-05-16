import { db } from "@/lib/db";
import type { RowDataPacket } from "mysql2";

type CardRow = RowDataPacket & {
  id: number;
  slug: string;
  first_name: string | null;
  last_name: string | null;
  title: string | null;
  company: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  whatsapp: string | null;
  instagram: string | null;
  facebook: string | null;
  tiktok: string | null;
  logo: string | null;
};

const fallbackCards: CardRow[] = [
  {
    id: 1,
    slug: "keith",
    first_name: "Keith",
    last_name: "Guevara",
    title: "Digital Media • NFC Cards • Promotions",
    company: "Trinibuzz Media",
    phone: "18680000000",
    email: "info@trinibuzz.com",
    website: "https://trinibuzz.com",
    whatsapp: "18680000000",
    instagram: "https://instagram.com/trinibuzz",
    facebook: "https://facebook.com/trinibuzz",
    tiktok: "https://tiktok.com/@trinibuzz",
    logo: "",
  } as CardRow,
];

function cleanPhone(phone: string | null) {
  return phone ? phone.replace(/[^\d+]/g, "") : "";
}

function normalizeUrl(value: string | null) {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `https://${value}`;
}

function escapeVcard(value: string | null) {
  return (value || "")
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

async function getCardBySlug(slug: string) {
  try {
    const [rows] = await db.query<CardRow[]>(
      `
      SELECT
        id,
        slug,
        first_name,
        last_name,
        title,
        company,
        phone,
        email,
        website,
        whatsapp,
        instagram,
        facebook,
        tiktok,
        logo
      FROM cards
      WHERE slug = ?
      LIMIT 1
      `,
      [slug]
    );

    if (rows.length > 0) {
      return rows[0];
    }
  } catch (error) {
    console.log("Database unavailable locally. Using fallback vCard data.");
  }

  return fallbackCards.find((card) => card.slug === slug) || null;
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const card = await getCardBySlug(params.slug);

  if (!card) {
    return new Response("Contact not found", {
      status: 404,
    });
  }

  const firstName = card.first_name || "";
  const lastName = card.last_name || "";
  const fullName = `${firstName} ${lastName}`.trim() || "Digital Contact";

  const company = card.company || "Trinibuzz Tap Card";
  const title = card.title || "Digital Business Card";
  const phone = cleanPhone(card.phone);
  const whatsapp = cleanPhone(card.whatsapp || card.phone);
  const email = card.email || "";
  const website = normalizeUrl(card.website);

  const fileName =
    fullName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || card.slug;

  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escapeVcard(lastName)};${escapeVcard(firstName)};;;`,
    `FN:${escapeVcard(fullName)}`,
    `ORG:${escapeVcard(company)}`,
    `TITLE:${escapeVcard(title)}`,
    phone ? `TEL;TYPE=CELL:${phone}` : "",
    whatsapp ? `TEL;TYPE=WHATSAPP:${whatsapp}` : "",
    email ? `EMAIL;TYPE=INTERNET:${escapeVcard(email)}` : "",
    website ? `URL:${escapeVcard(website)}` : "",
    "NOTE:Saved from Trinibuzz Tap Card",
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\r\n");

  return new Response(vcard, {
    status: 200,
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${fileName}.vcf"`,
    },
  });
}