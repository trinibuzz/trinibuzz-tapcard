import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

function cleanSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function cleanPhone(value: string) {
  return value.replace(/[^\d+]/g, "");
}

function normalizeUrl(value: string) {
  const trimmed = value.trim();

  if (!trimmed) return "";

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("tel:") ||
    trimmed.startsWith("/")
  ) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export async function GET() {
  try {
    const [rows] = await db.query<RowDataPacket[]>(
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
        logo,
        views,
        taps,
        scans,
        bio,
        location_url,
        package_name,
        is_active,
        info_page_enabled,
        created_at
      FROM cards
      ORDER BY id DESC
      `
    );

    return NextResponse.json({
      success: true,
      cards: rows,
    });
  } catch (error) {
    console.error("GET /api/admin/cards error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Could not load cards.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const firstName = String(body.first_name || "").trim();
    const lastName = String(body.last_name || "").trim();
    const company = String(body.company || "").trim();
    const title = String(body.title || "").trim();
    const bio = String(body.bio || "").trim();

    const rawSlug =
      String(body.slug || "").trim() ||
      `${firstName}-${lastName}` ||
      company;

    const slug = cleanSlug(rawSlug);

    const phone = cleanPhone(String(body.phone || ""));
    const whatsapp = cleanPhone(String(body.whatsapp || body.phone || ""));
    const email = String(body.email || "").trim();
    const website = normalizeUrl(String(body.website || ""));
    const locationUrl = normalizeUrl(String(body.location_url || ""));
    const logo = normalizeUrl(String(body.logo || ""));

    const instagram = normalizeUrl(String(body.instagram || ""));
    const facebook = normalizeUrl(String(body.facebook || ""));
    const tiktok = normalizeUrl(String(body.tiktok || ""));

    const packageName = String(
      body.package_name || "Starter Digital Card"
    ).trim();

    const isActive = body.is_active ? 1 : 0;
    const infoPageEnabled = body.info_page_enabled ? 1 : 0;

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          message: "Card slug is required.",
        },
        { status: 400 }
      );
    }

    if (!firstName && !lastName && !company) {
      return NextResponse.json(
        {
          success: false,
          message: "Add at least a name or company.",
        },
        { status: 400 }
      );
    }

    const [existing] = await db.query<RowDataPacket[]>(
      `
      SELECT id
      FROM cards
      WHERE slug = ?
      LIMIT 1
      `,
      [slug]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "That slug already exists. Choose another slug.",
        },
        { status: 409 }
      );
    }

    const [result] = await db.query<ResultSetHeader>(
      `
      INSERT INTO cards (
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
        logo,
        views,
        taps,
        scans,
        bio,
        location_url,
        package_name,
        is_active,
        info_page_enabled
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 0, ?, ?, ?, ?, ?)
      `,
      [
        slug,
        firstName,
        lastName,
        title,
        company,
        phone,
        email,
        website,
        whatsapp,
        instagram,
        facebook,
        tiktok,
        logo,
        bio,
        locationUrl,
        packageName,
        isActive,
        infoPageEnabled,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Card created successfully.",
      card_id: result.insertId,
      slug,
      public_url: `/card/${slug}`,
    });
  } catch (error) {
    console.error("POST /api/admin/cards error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Could not save card. If you are testing locally, the database may only work after deployment to Hostinger.",
      },
      { status: 500 }
    );
  }
}