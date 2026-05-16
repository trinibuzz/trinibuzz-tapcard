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
  views: number;
  taps: number;
  scans: number;
  package_name: string | null;
  is_active: number;
  info_page_enabled: number;
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
    views: 128,
    taps: 47,
    scans: 22,
    package_name: "Premium Tap Card + Info Page",
    is_active: 1,
    info_page_enabled: 1,
  } as CardRow,
  {
    id: 2,
    slug: "sample-client",
    first_name: "Sample",
    last_name: "Client",
    title: "Beauty • Wellness • Services",
    company: "Beauty Studio",
    phone: "18680000000",
    email: "client@example.com",
    website: "https://example.com",
    whatsapp: "18680000000",
    instagram: "",
    facebook: "",
    tiktok: "",
    logo: "",
    views: 0,
    taps: 0,
    scans: 0,
    package_name: "Business Tap Card",
    is_active: 0,
    info_page_enabled: 0,
  } as CardRow,
];

async function getCards() {
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
        logo,
        views,
        taps,
        scans,
        package_name,
        is_active,
        info_page_enabled
      FROM cards
      ORDER BY id DESC
      `
    );

    return rows;
  } catch (error) {
    console.log("Database unavailable locally. Using fallback dashboard cards.");
    return fallbackCards;
  }
}

function getFullName(card: CardRow) {
  return `${card.first_name || ""} ${card.last_name || ""}`.trim() || "Unnamed Card";
}

function getInitials(card: CardRow) {
  const name = getFullName(card);

  return (
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "TB"
  );
}

export default async function AdminDashboardPage() {
  const cards = await getCards();

  const totalCards = cards.length;
  const activeCards = cards.filter((card) => card.is_active === 1).length;
  const totalViews = cards.reduce((sum, card) => sum + Number(card.views || 0), 0);
  const totalTaps = cards.reduce((sum, card) => sum + Number(card.taps || 0), 0);
  const totalScans = cards.reduce((sum, card) => sum + Number(card.scans || 0), 0);

  return (
    <main className="min-h-screen bg-[#050814] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050814]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="/admin/dashboard" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#d4af37]/50 bg-[#d4af37]/10 text-lg font-black text-[#d4af37]">
              TB
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#d4af37]">
                Admin
              </p>
              <p className="text-sm text-white/55">Trinibuzz Tap Card</p>
            </div>
          </a>

          <div className="flex items-center gap-3">
            <a
              href="/"
              className="hidden rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-bold text-white/70 transition hover:border-[#d4af37]/60 hover:text-[#d4af37] sm:inline-flex"
            >
              View Website
            </a>

            <a
              href="/admin/login"
              className="rounded-full bg-[#d4af37] px-5 py-2.5 text-sm font-black text-[#07101f] transition hover:scale-105"
            >
              Logout
            </a>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="font-bold uppercase tracking-[0.3em] text-[#d4af37]">
              Dashboard
            </p>

            <h1 className="mt-3 text-4xl font-black md:text-5xl">
              Manage Digital Cards
            </h1>

            <p className="mt-3 max-w-2xl text-white/60">
              Add, edit, deactivate, and monitor client tap cards from one clean
              admin area.
            </p>
          </div>

          <a
            href="/admin/cards/new"
            className="rounded-full bg-[#d4af37] px-6 py-4 text-center font-black text-[#07101f] shadow-xl shadow-[#d4af37]/15 transition hover:scale-[1.02]"
          >
            + Add New Card
          </a>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-white/50">Total Cards</p>
            <p className="mt-2 text-4xl font-black text-[#d4af37]">
              {totalCards}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-white/50">Active Cards</p>
            <p className="mt-2 text-4xl font-black text-[#d4af37]">
              {activeCards}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-white/50">Profile Views</p>
            <p className="mt-2 text-4xl font-black text-[#d4af37]">
              {totalViews}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-white/50">Total Taps</p>
            <p className="mt-2 text-4xl font-black text-[#d4af37]">
              {totalTaps}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-white/50">QR Scans</p>
            <p className="mt-2 text-4xl font-black text-[#d4af37]">
              {totalScans}
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
          <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-black">Client Cards</h2>
              <p className="mt-1 text-sm text-white/50">
                This page will pull real records from MySQL on Hostinger. Locally,
                it uses fallback data if MySQL is unavailable.
              </p>
            </div>

            <input
              placeholder="Search cards..."
              className="w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-3 text-white outline-none placeholder:text-white/30 focus:border-[#d4af37] md:max-w-xs"
            />
          </div>

          <div className="grid gap-4">
            {cards.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-[#050814] p-8 text-center">
                <p className="text-2xl font-black">No cards found</p>
                <p className="mt-2 text-white/50">
                  Add your first Trinibuzz Tap Card to get started.
                </p>

                <a
                  href="/admin/cards/new"
                  className="mt-6 inline-flex rounded-full bg-[#d4af37] px-6 py-3 font-black text-[#07101f]"
                >
                  + Add New Card
                </a>
              </div>
            ) : (
              cards.map((card) => {
                const fullName = getFullName(card);
                const statusLabel = card.is_active === 1 ? "Active" : "Inactive";
                const infoPageLabel =
                  card.info_page_enabled === 1 ? "Info Page On" : "Card Only";

                return (
                  <div
                    key={card.id}
                    className="rounded-3xl border border-white/10 bg-[#050814] p-5 transition hover:border-[#d4af37]/50"
                  >
                    <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-[#d4af37]/40 bg-[#d4af37]/10 text-lg font-black text-[#d4af37]">
                          {card.logo ? (
                            <img
                              src={
                                card.logo.startsWith("http") ||
                                card.logo.startsWith("/")
                                  ? card.logo
                                  : `/${card.logo}`
                              }
                              alt={`${card.company || fullName} logo`}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            getInitials(card)
                          )}
                        </div>

                        <div>
                          <h3 className="text-xl font-black">{fullName}</h3>

                          <p className="mt-1 text-sm text-[#d4af37]">
                            {card.company || "No company name"}
                          </p>

                          <p className="mt-1 text-xs text-white/45">
                            /card/{card.slug} •{" "}
                            {card.package_name || "Starter Digital Card"}
                          </p>

                          <p className="mt-1 text-xs text-white/35">
                            {card.title || "No title added"}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-center sm:min-w-[280px]">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3">
                          <p className="text-lg font-black text-[#d4af37]">
                            {card.views || 0}
                          </p>
                          <p className="text-xs text-white/45">Views</p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3">
                          <p className="text-lg font-black text-[#d4af37]">
                            {card.taps || 0}
                          </p>
                          <p className="text-xs text-white/45">Taps</p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3">
                          <p className="text-lg font-black text-[#d4af37]">
                            {card.scans || 0}
                          </p>
                          <p className="text-xs text-white/45">Scans</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <span
                          className={`rounded-full px-4 py-2 text-xs font-black ${
                            card.is_active === 1
                              ? "bg-green-500/15 text-green-300"
                              : "bg-red-500/15 text-red-300"
                          }`}
                        >
                          {statusLabel}
                        </span>

                        <span className="rounded-full bg-blue-500/15 px-4 py-2 text-xs font-black text-blue-300">
                          {infoPageLabel}
                        </span>

                        <a
                          href={`/card/${card.slug}`}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-white/70 transition hover:border-[#d4af37]/60 hover:text-[#d4af37]"
                        >
                          View
                        </a>

                        <a
                          href={`/api/vcard/${card.slug}`}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-white/70 transition hover:border-[#d4af37]/60 hover:text-[#d4af37]"
                        >
                          vCard
                        </a>

                        <a
                          href={`/admin/cards/${card.id}/edit`}
                          className="rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-4 py-2 text-sm font-bold text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#07101f]"
                        >
                          Edit
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </main>
  );
}