import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import type { RowDataPacket } from "mysql2";

type CardRow = RowDataPacket & {
  id: number;
  user_id: number | null;
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
  views: number;
  taps: number;
  scans: number;
  bio: string | null;
  location_url: string | null;
  package_name: string | null;
  is_active: number;
  info_page_enabled: number;
};

const fallbackCards: CardRow[] = [
  {
    id: 1,
    user_id: null,
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
    views: 128,
    taps: 47,
    scans: 22,
    bio: "Helping businesses and professionals share contact details, social links, websites, and services instantly with NFC tap cards and QR scan profiles.",
    location_url: "https://maps.google.com",
    package_name: "Premium Tap Card + Info Page",
    is_active: 1,
    info_page_enabled: 1,
  } as CardRow,
];

function cleanPhone(phone: string | null) {
  return phone ? phone.replace(/[^\d]/g, "") : "";
}

function normalizeUrl(value: string | null) {
  if (!value) return "#";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `https://${value}`;
}

function logoPath(logo: string | null) {
  if (!logo) return "";
  if (logo.startsWith("http://") || logo.startsWith("https://")) return logo;
  if (logo.startsWith("/")) return logo;
  return `/${logo}`;
}

async function getCardBySlug(slug: string) {
  try {
    const [rows] = await db.query<CardRow[]>(
      `
      SELECT
        id,
        user_id,
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
    console.log("Database unavailable locally. Using fallback sample card.");
  }

  return fallbackCards.find((card) => card.slug === slug) || null;
}

export default async function DigitalCardPage({
  params,
}: {
  params: { slug: string };
}) {
  const card = await getCardBySlug(params.slug);

  if (!card) {
    notFound();
  }

  if (card.is_active === 0) {
    notFound();
  }

  const firstName = card.first_name || "";
  const lastName = card.last_name || "";
  const fullName = `${firstName} ${lastName}`.trim() || "Digital Card";

  const company = card.company || "Trinibuzz Tap Card";
  const title = card.title || "Digital Business Card";
  const bio =
    card.bio ||
    "Tap, scan, save, and connect instantly with this Trinibuzz digital contact card.";

  const phone = cleanPhone(card.phone);
  const whatsapp = cleanPhone(card.whatsapp || card.phone);
  const email = card.email || "";
  const website = normalizeUrl(card.website);
  const instagram = normalizeUrl(card.instagram);
  const facebook = normalizeUrl(card.facebook);
  const tiktok = normalizeUrl(card.tiktok);
  const locationUrl = normalizeUrl(card.location_url || "https://maps.google.com");
  const logo = logoPath(card.logo);

  const contactButtons = [
    {
      label: "Call Now",
      icon: "☎",
      href: phone ? `tel:${phone}` : "#",
      color: "text-[#ffd36b]",
      glow: "shadow-[#d4af37]/30",
    },
    {
      label: "WhatsApp",
      icon: "☘",
      href: whatsapp ? `https://wa.me/${whatsapp}` : "#",
      color: "text-[#31e981]",
      glow: "shadow-[#31e981]/25",
    },
    {
      label: "Email",
      icon: "✉",
      href: email ? `mailto:${email}` : "#",
      color: "text-[#5bbcff]",
      glow: "shadow-[#5bbcff]/25",
    },
    {
      label: "Save Contact",
      icon: "👤",
      href: `/api/vcard/${card.slug}`,
      color: "text-[#8ea2ff]",
      glow: "shadow-[#8ea2ff]/25",
    },
    {
      label: "Visit Website",
      icon: "◎",
      href: website,
      color: "text-[#29b6ff]",
      glow: "shadow-[#29b6ff]/25",
    },
    {
      label: "Location",
      icon: "●",
      href: locationUrl,
      color: "text-[#ff4b4b]",
      glow: "shadow-[#ff4b4b]/25",
    },
  ];

  const shareText = encodeURIComponent(
    `View ${fullName}'s Trinibuzz Tap Card: https://contact.trinibuzz.com/card/${card.slug}`
  );

  return (
    <main className="min-h-screen bg-[#02050d] px-4 py-6 text-white">
      <div className="mx-auto max-w-[520px]">
        <div className="relative overflow-hidden rounded-[2.4rem] border border-[#d4af37]/70 bg-[#050b18] p-4 shadow-2xl shadow-[#d4af37]/15">
          <div className="pointer-events-none absolute inset-0 rounded-[2.4rem] bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.22),_transparent_35%),radial-gradient(circle_at_center,_rgba(0,102,255,0.20),_transparent_35%),radial-gradient(circle_at_bottom,_rgba(212,175,55,0.12),_transparent_35%)]" />

          <div className="pointer-events-none absolute left-[-20%] top-[7%] h-[160px] w-[140%] rotate-[-12deg] border-t border-[#d4af37]/35" />
          <div className="pointer-events-none absolute left-[-20%] top-[13%] h-[180px] w-[140%] rotate-[-12deg] border-t border-[#1f8bff]/40" />

          <div className="relative rounded-[2rem] border border-white/10 bg-black/20 px-4 py-5 backdrop-blur">
            <div className="flex justify-center">
              <div className="rounded-full border border-[#d4af37]/40 bg-[#07101f]/80 px-5 py-2 text-xs font-black uppercase tracking-[0.35em] text-[#d4af37] shadow-lg shadow-[#d4af37]/10">
                • Trinibuzz Tap Card •
              </div>
            </div>

            <div className="mt-7 flex items-center justify-between gap-3">
              <div />

              <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-[#d4af37] bg-gradient-to-br from-[#07101f] to-[#02050d] text-4xl font-black text-[#d4af37] shadow-2xl shadow-[#d4af37]/35">
                {logo ? (
                  <img
                    src={logo}
                    alt={`${company} logo`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  "TB"
                )}
              </div>

              <div className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-bold text-white/85 shadow-lg shadow-black/30 backdrop-blur">
                NFC + QR Ready
              </div>
            </div>

            <div className="mt-6 text-center">
              <h1 className="text-4xl font-black tracking-tight md:text-5xl">
                {fullName}
              </h1>

              <div className="mt-3 flex items-center justify-center gap-4">
                <span className="h-px w-10 bg-[#d4af37]" />
                <p className="text-2xl font-black text-[#d4af37]">{company}</p>
                <span className="h-px w-10 bg-[#d4af37]" />
              </div>

              <p className="mt-3 text-base text-white/55">{title}</p>

              <p className="mx-auto mt-6 max-w-[410px] text-base leading-8 text-white/70">
                {bio}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {contactButtons.map((button) => (
                <a
                  key={button.label}
                  href={button.href}
                  target={button.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    button.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group flex items-center justify-between rounded-2xl border border-white/15 bg-[#07101f]/90 px-4 py-4 shadow-lg shadow-black/30 transition hover:border-[#d4af37]/70 hover:bg-[#0b1730]"
                >
                  <span className="flex items-center gap-4">
                    <span
                      className={`flex h-14 w-14 items-center justify-center rounded-full border border-[#d4af37]/50 bg-black/35 text-2xl ${button.color} shadow-lg ${button.glow}`}
                    >
                      {button.icon}
                    </span>
                    <span className="text-lg font-black">{button.label}</span>
                  </span>
                  <span className="text-3xl text-[#d4af37] transition group-hover:translate-x-1">
                    ›
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-3 overflow-hidden rounded-2xl border border-white/15 bg-[#06101f]/90">
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-r border-white/15 px-2 py-4 text-sm font-bold text-white/75 hover:text-[#d4af37]"
              >
                <span className="text-2xl">📸</span> Instagram
              </a>

              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-r border-white/15 px-2 py-4 text-sm font-bold text-white/75 hover:text-[#d4af37]"
              >
                <span className="text-2xl">f</span> Facebook
              </a>

              <a
                href={tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-2 py-4 text-sm font-bold text-white/75 hover:text-[#d4af37]"
              >
                <span className="text-2xl">♪</span> TikTok
              </a>
            </div>

            {card.info_page_enabled === 1 && (
              <a
                href={`/card/${card.slug}/info`}
                className="mt-5 flex items-center justify-between rounded-2xl border border-[#d4af37] bg-gradient-to-r from-[#d4af37] via-[#f2c85b] to-[#b88918] px-5 py-5 text-[#07101f] shadow-xl shadow-[#d4af37]/25 transition hover:scale-[1.01]"
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-black/25 bg-[#07101f] text-2xl text-[#d4af37]">
                    ↗
                  </span>
                  <span className="text-xl font-black">
                    Learn More / Services Page
                  </span>
                </span>
                <span className="text-4xl">›</span>
              </a>
            )}

            <a
              href={`https://wa.me/?text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex w-full items-center justify-center gap-4 rounded-2xl border border-white/15 bg-[#07101f]/90 px-5 py-5 text-xl font-black text-white/85 shadow-lg shadow-black/30 transition hover:border-[#d4af37]/70 hover:text-[#d4af37]"
            >
              <span className="text-3xl text-[#77baff]">⇧</span>
              Share Profile
            </a>
          </div>
        </div>

        <div className="mt-5 text-center text-xs font-semibold uppercase tracking-[0.25em] text-white/35">
          Powered by Trinibuzz Tap Card
        </div>
      </div>
    </main>
  );
}