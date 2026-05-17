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

type ButtonIconName =
  | "phone"
  | "whatsapp"
  | "email"
  | "contact"
  | "website"
  | "location";

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

function initials(firstName: string, lastName: string, company: string) {
  const fromName = `${firstName} ${lastName}`
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (fromName) return fromName;

  return (
    company
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "TB"
  );
}

function ButtonIcon({ name }: { name: ButtonIconName }) {
  const baseClass = "h-7 w-7";

  if (name === "phone") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={baseClass}>
        <path
          d="M7.2 4.5 9.4 8c.4.6.3 1.4-.2 1.9l-1.1 1.1c1.3 2.6 3.4 4.7 6 6l1.1-1.1c.5-.5 1.3-.6 1.9-.2l3.4 2.2c.7.4 1 1.3.7 2.1-.5 1.2-1.7 2-3 2C9.3 22 2 14.7 2 5.8c0-1.3.8-2.5 2-3 .8-.3 1.7 0 2.1.7Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={baseClass}>
        <path
          d="M4.2 20 5.4 16.5A8.2 8.2 0 1 1 8 19.1L4.2 20Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.1 8.5c.2-.4.4-.4.7-.4h.5c.2 0 .5.1.6.5l.6 1.4c.1.3.1.6-.1.8l-.4.5c.8 1.4 1.8 2.3 3.2 3l.5-.5c.2-.2.5-.3.8-.2l1.5.7c.3.2.5.4.5.7v.4c0 .4-.1.7-.4.9-.5.5-1.5.6-2.1.4-3.4-1-6-3.6-7.1-6.8-.2-.6 0-1.6.6-2.1Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (name === "email") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={baseClass}>
        <path
          d="M4 6.5h16v11H4v-11Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="m4.7 7.2 7.3 5.5 7.3-5.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "contact") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={baseClass}>
        <path
          d="M7 3.5h10A2.5 2.5 0 0 1 19.5 6v12A2.5 2.5 0 0 1 17 20.5H7A2.5 2.5 0 0 1 4.5 18V6A2.5 2.5 0 0 1 7 3.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M9 15.8c.7-1.3 1.7-2 3-2s2.3.7 3 2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M12 11.6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  if (name === "website") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={baseClass}>
        <path
          d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M3.6 9h16.8M3.6 15h16.8M12 3c2.2 2.4 3.3 5.4 3.3 9s-1.1 6.6-3.3 9c-2.2-2.4-3.3-5.4-3.3-9S9.8 5.4 12 3Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={baseClass}>
      <path
        d="M12 21s6-5.3 6-11A6 6 0 1 0 6 10c0 5.7 6 11 6 11Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
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
  const fallbackInitials = initials(firstName, lastName, company);

  const contactButtons: {
    label: string;
    icon: ButtonIconName;
    href: string;
    accent: string;
    glow: string;
  }[] = [
    {
      label: "Call Now",
      icon: "phone",
      href: phone ? `tel:${phone}` : "#",
      accent: "text-[#ffd36b]",
      glow: "shadow-[#d4af37]/40",
    },
    {
      label: "WhatsApp",
      icon: "whatsapp",
      href: whatsapp ? `https://wa.me/${whatsapp}` : "#",
      accent: "text-[#2df079]",
      glow: "shadow-[#2df079]/35",
    },
    {
      label: "Email",
      icon: "email",
      href: email ? `mailto:${email}` : "#",
      accent: "text-[#5ab8ff]",
      glow: "shadow-[#5ab8ff]/35",
    },
    {
      label: "Save Contact",
      icon: "contact",
      href: `/api/vcard/${card.slug}`,
      accent: "text-[#8ea2ff]",
      glow: "shadow-[#8ea2ff]/35",
    },
    {
      label: "Visit Website",
      icon: "website",
      href: website,
      accent: "text-[#23b8ff]",
      glow: "shadow-[#23b8ff]/35",
    },
    {
      label: "Location",
      icon: "location",
      href: locationUrl,
      accent: "text-[#ff4545]",
      glow: "shadow-[#ff4545]/35",
    },
  ];

  const shareText = encodeURIComponent(
    `View ${fullName}'s Trinibuzz Tap Card: https://contact.trinibuzz.com/${card.slug}`
  );

  return (
    <main className="min-h-screen bg-[#01040b] px-3 py-5 text-white">
      <div className="mx-auto max-w-[560px]">
        <div className="relative overflow-hidden rounded-[2.8rem] border border-[#d4af37]/75 bg-[#050b16] p-[3px] shadow-2xl shadow-[#d4af37]/20">
          <div className="absolute inset-0 rounded-[2.8rem] bg-gradient-to-br from-[#d4af37]/70 via-[#0c2448]/40 to-[#d4af37]/30 opacity-70" />

          <div className="relative overflow-hidden rounded-[2.65rem] bg-[#040914] px-5 pb-6 pt-6 shadow-inner">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(212,175,55,0.28),transparent_24%),radial-gradient(circle_at_50%_18%,rgba(0,103,255,0.35),transparent_28%),radial-gradient(circle_at_85%_12%,rgba(212,175,55,0.13),transparent_20%),radial-gradient(circle_at_bottom,rgba(212,175,55,0.16),transparent_32%)]" />
            <div className="pointer-events-none absolute -left-24 top-28 h-36 w-[760px] -rotate-12 rounded-full border-t border-[#d4af37]/35" />
            <div className="pointer-events-none absolute -left-28 top-36 h-40 w-[780px] -rotate-12 rounded-full border-t border-[#138bff]/45" />
            <div className="pointer-events-none absolute right-0 top-0 h-72 w-52 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:10px_10px] opacity-35" />

            <div className="relative flex justify-center">
              <div className="rounded-full border border-[#d4af37]/35 bg-[#071325]/80 px-6 py-2 text-xs font-black uppercase tracking-[0.38em] text-[#e6c35a] shadow-lg shadow-black/40 backdrop-blur">
                • Trinibuzz Tap Card •
              </div>
            </div>

            <div className="relative mt-8">
              <div className="flex justify-end">
                <div className="rounded-full border border-[#d4af37]/30 bg-[#0b1526]/80 px-3 py-2 text-[11px] font-bold text-white/85 shadow-lg shadow-black/40 backdrop-blur sm:px-4 sm:text-xs">
                  ))) NFC + QR Ready
                </div>
              </div>

              <div className="relative mx-auto mt-4 flex max-w-[315px] justify-center">
                <div className="absolute inset-x-8 top-1/2 h-16 -translate-y-1/2 rounded-full bg-[#0b7cff]/25 blur-2xl" />
                <div className="absolute inset-x-10 top-1/2 h-16 -translate-y-1/2 rounded-full bg-[#d4af37]/25 blur-2xl" />

                <div className="relative rounded-[999px] border border-[#d4af37]/80 bg-gradient-to-br from-[#f7d978]/80 via-[#6f5315]/40 to-[#07101f]/80 p-[2px] shadow-[0_0_45px_rgba(212,175,55,0.38)]">
                  <div className="relative flex min-h-[132px] min-w-[245px] items-center justify-center overflow-hidden rounded-[999px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_30%),linear-gradient(135deg,#101827,#030711_60%,#111827)] px-8 py-5 shadow-inner">
                    <div className="pointer-events-none absolute left-6 top-4 h-10 w-24 rotate-[-18deg] rounded-full bg-white/10 blur-xl" />
                    <div className="pointer-events-none absolute bottom-3 right-7 h-10 w-28 rounded-full bg-[#d4af37]/12 blur-xl" />

                    {logo ? (
                      <img
                        src={logo}
                        alt={`${company} logo`}
                        className="relative z-10 max-h-[96px] max-w-[210px] object-contain drop-shadow-[0_0_18px_rgba(255,255,255,0.22)]"
                      />
                    ) : (
                      <span className="relative z-10 text-6xl font-black text-[#d4af37] drop-shadow-[0_0_16px_rgba(212,175,55,0.75)]">
                        {fallbackInitials}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-7 text-center">
              <h1 className="text-4xl font-black tracking-tight text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.18)] sm:text-5xl">
                {fullName}
              </h1>

              <div className="mt-4 flex items-center justify-center gap-4">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4af37]" />
                <p className="text-2xl font-black text-[#d4af37] drop-shadow-[0_0_10px_rgba(212,175,55,0.35)]">
                  {company}
                </p>
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4af37]" />
              </div>

              <p className="mt-3 text-base text-white/55">{title}</p>

              <p className="mx-auto mt-6 max-w-[430px] text-base leading-8 text-white/72">
                {bio}
              </p>
            </div>

            <div className="relative mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                  className="group relative flex min-h-[88px] items-center justify-between overflow-hidden rounded-3xl border border-white/14 bg-[#071426]/90 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_12px_30px_rgba(0,0,0,0.38)] transition hover:-translate-y-0.5 hover:border-[#d4af37]/85 hover:bg-[#0c1d36]"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                  <div className="pointer-events-none absolute -left-12 top-0 h-full w-20 rotate-12 bg-white/5 blur-xl transition group-hover:left-full" />

                  <span className="relative z-10 flex items-center gap-4">
                    <span
                      className={`relative flex h-15 w-15 shrink-0 items-center justify-center rounded-2xl border border-[#d4af37]/55 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_35%),linear-gradient(135deg,#111827,#02050d)] p-3 ${button.accent} shadow-lg ${button.glow}`}
                    >
                      <span className="absolute inset-0 rounded-2xl border border-white/10" />
                      <ButtonIcon name={button.icon} />
                    </span>

                    <span className="text-lg font-black text-white">
                      {button.label}
                    </span>
                  </span>

                  <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 text-3xl leading-none text-[#d4af37] transition group-hover:translate-x-1 group-hover:bg-[#d4af37] group-hover:text-[#07101f]">
                    ›
                  </span>
                </a>
              ))}
            </div>

            <div className="relative mt-5 grid grid-cols-3 overflow-hidden rounded-3xl border border-white/15 bg-[#06101f]/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_10px_28px_rgba(0,0,0,0.35)]">
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-r border-white/15 px-2 py-5 text-sm font-bold text-white/75 transition hover:text-[#d4af37]"
              >
                <span className="text-2xl">📸</span>
                <span className="hidden sm:inline">Instagram</span>
                <span className="sm:hidden">IG</span>
              </a>

              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-r border-white/15 px-2 py-5 text-sm font-bold text-white/75 transition hover:text-[#d4af37]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1877f2] text-lg font-black text-white">
                  f
                </span>
                <span className="hidden sm:inline">Facebook</span>
                <span className="sm:hidden">FB</span>
              </a>

              <a
                href={tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-2 py-5 text-sm font-bold text-white/75 transition hover:text-[#d4af37]"
              >
                <span className="text-2xl">♪</span>
                <span>TikTok</span>
              </a>
            </div>

            {card.info_page_enabled === 1 && (
              <a
                href={`/card/${card.slug}/info`}
                className="relative mt-5 flex items-center justify-between rounded-3xl border border-[#ffe28a]/70 bg-gradient-to-r from-[#d4af37] via-[#ffe081] to-[#b88918] px-5 py-5 text-[#07101f] shadow-[0_0_28px_rgba(212,175,55,0.35)] transition hover:scale-[1.01]"
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-black/25 bg-[#07101f] text-2xl text-[#d4af37] shadow-lg shadow-black/30">
                    ↗
                  </span>

                  <span className="text-lg font-black sm:text-xl">
                    Learn More / Services Page
                  </span>
                </span>

                <span className="text-4xl leading-none">›</span>
              </a>
            )}

            <a
              href={`https://wa.me/?text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-5 flex w-full items-center justify-center gap-4 rounded-3xl border border-white/15 bg-[#071426]/90 px-5 py-5 text-xl font-black text-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_10px_28px_rgba(0,0,0,0.35)] transition hover:border-[#d4af37]/70 hover:text-[#d4af37]"
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