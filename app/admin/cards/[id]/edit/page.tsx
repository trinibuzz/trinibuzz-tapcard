"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type CardForm = {
  first_name: string;
  last_name: string;
  company: string;
  title: string;
  slug: string;
  logo: string;
  package_name: string;
  bio: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  location_url: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  is_active: boolean;
  info_page_enabled: boolean;
};

const fallbackCard: CardForm = {
  first_name: "Keith",
  last_name: "Guevara",
  company: "Trinibuzz Media",
  title: "Digital Media • NFC Cards • Promotions",
  slug: "keith",
  logo: "",
  package_name: "Premium Tap Card + Info Page",
  bio: "Helping businesses and professionals share contact details, social links, websites, and services instantly with NFC tap cards and QR scan profiles.",
  phone: "18680000000",
  whatsapp: "18680000000",
  email: "info@trinibuzz.com",
  website: "https://trinibuzz.com",
  location_url: "https://maps.google.com",
  instagram: "https://instagram.com/trinibuzz",
  facebook: "https://facebook.com/trinibuzz",
  tiktok: "https://tiktok.com/@trinibuzz",
  is_active: true,
  info_page_enabled: true,
};

export default function EditCardPage() {
  const router = useRouter();
  const params = useParams();

  const cardId = String(params.id || "");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState<CardForm>(fallbackCard);

  function updateField(name: keyof CardForm, value: string | boolean) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  useEffect(() => {
    async function loadCard() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`/api/admin/cards/${cardId}`);
        const data = await response.json();

        if (!response.ok || !data.success) {
          setError(
            "Could not load from database locally. Showing fallback sample card."
          );
          setForm(fallbackCard);
          setLoading(false);
          return;
        }

        const card = data.card;

        setForm({
          first_name: card.first_name || "",
          last_name: card.last_name || "",
          company: card.company || "",
          title: card.title || "",
          slug: card.slug || "",
          logo: card.logo || "",
          package_name: card.package_name || "Starter Digital Card",
          bio: card.bio || "",
          phone: card.phone || "",
          whatsapp: card.whatsapp || "",
          email: card.email || "",
          website: card.website || "",
          location_url: card.location_url || "",
          instagram: card.instagram || "",
          facebook: card.facebook || "",
          tiktok: card.tiktok || "",
          is_active: Number(card.is_active) === 1,
          info_page_enabled: Number(card.info_page_enabled) === 1,
        });
      } catch (err) {
        setError(
          "Could not connect to database locally. Showing fallback sample card."
        );
        setForm(fallbackCard);
      } finally {
        setLoading(false);
      }
    }

    loadCard();
  }, [cardId]);

  async function handleSave() {
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/admin/cards/${cardId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Could not save card.");
        setSaving(false);
        return;
      }

      setMessage(`Card updated successfully: /card/${data.slug}`);
    } catch (err) {
      setError(
        "Could not save card. If you are testing locally, the database may only work after deployment to Hostinger."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDeactivate() {
    const confirmDeactivate = window.confirm(
      "Deactivate this card? The slug will stay in the database, but the public card will stop showing."
    );

    if (!confirmDeactivate) return;

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/admin/cards/${cardId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Could not deactivate card.");
        setSaving(false);
        return;
      }

      setMessage("Card deactivated successfully.");

      setForm((current) => ({
        ...current,
        is_active: false,
      }));
    } catch (err) {
      setError(
        "Could not deactivate card. If you are testing locally, the database may only work after deployment to Hostinger."
      );
    } finally {
      setSaving(false);
    }
  }

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
              <p className="text-sm text-white/55">Edit Card</p>
            </div>
          </a>

          <a
            href="/admin/dashboard"
            className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-bold text-white/70 transition hover:border-[#d4af37]/60 hover:text-[#d4af37]"
          >
            ← Back to Dashboard
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-5 py-8">
        <div className="mb-8">
          <p className="font-bold uppercase tracking-[0.3em] text-[#d4af37]">
            Edit Digital Card
          </p>

          <h1 className="mt-3 text-4xl font-black md:text-5xl">
            {loading
              ? "Loading..."
              : `${form.first_name} ${form.last_name}`.trim() ||
                form.company ||
                "Edit Card"}
          </h1>

          <p className="mt-3 max-w-2xl text-white/60">
            Update client details, profile buttons, logo, socials, and card
            settings.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={`/card/${form.slug || "keith"}`}
              className="rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-5 py-2.5 text-sm font-bold text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#07101f]"
            >
              View Public Card
            </a>

            <a
              href={`/card/${form.slug || "keith"}/info`}
              className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-bold text-white/70 transition hover:border-[#d4af37]/60 hover:text-[#d4af37]"
            >
              View Info Page
            </a>

            <a
              href={`/api/vcard/${form.slug || "keith"}`}
              className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-bold text-white/70 transition hover:border-[#d4af37]/60 hover:text-[#d4af37]"
            >
              Download vCard
            </a>
          </div>
        </div>

        {message && (
          <div className="mb-6 rounded-2xl border border-green-400/30 bg-green-500/10 p-4 font-bold text-green-300">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-2xl border border-yellow-400/30 bg-yellow-500/10 p-4 font-bold text-yellow-200">
            {error}
          </div>
        )}

        <form className="grid gap-6" onSubmit={(e) => e.preventDefault()}>
          <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-black">Basic Information</h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold text-white/70">
                  First Name
                </label>
                <input
                  value={form.first_name}
                  onChange={(e) => updateField("first_name", e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-white/70">
                  Last Name
                </label>
                <input
                  value={form.last_name}
                  onChange={(e) => updateField("last_name", e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-white/70">
                  Business Name
                </label>
                <input
                  value={form.company}
                  onChange={(e) => updateField("company", e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-white/70">
                  Job Title / Tagline
                </label>
                <input
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-white/70">
                  Card Slug
                </label>
                <input
                  value={form.slug}
                  onChange={(e) => updateField("slug", e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none focus:border-[#d4af37]"
                />

                <p className="mt-2 text-xs text-white/40">
                  Public link: /card/{form.slug || "slug"}
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-white/70">
                  Package
                </label>

                <select
                  value={form.package_name}
                  onChange={(e) => updateField("package_name", e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none focus:border-[#d4af37]"
                >
                  <option>Starter Digital Card</option>
                  <option>Business Tap Card</option>
                  <option>Premium Tap Card + Info Page</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold text-white/70">
                  Logo URL / Logo Path
                </label>

                <input
                  value={form.logo}
                  onChange={(e) => updateField("logo", e.target.value)}
                  placeholder="/uploads/logos/client-logo.png"
                  className="w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none placeholder:text-white/30 focus:border-[#d4af37]"
                />

                <p className="mt-2 text-xs leading-5 text-white/40">
                  Example:{" "}
                  <span className="text-[#d4af37]">
                    /uploads/logos/logo.png
                  </span>{" "}
                  or a full image URL. Leave blank to show initials.
                </p>
              </div>

              {form.logo && (
                <div className="md:col-span-2">
                  <div className="rounded-3xl border border-[#d4af37]/30 bg-[#07101f] p-5">
                    <p className="mb-3 text-sm font-bold text-[#d4af37]">
                      Logo Preview
                    </p>

                    <div className="flex min-h-28 items-center justify-center rounded-2xl border border-white/10 bg-[#050814] p-5">
                      <img
                        src={form.logo}
                        alt="Logo preview"
                        className="max-h-24 max-w-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold text-white/70">
                  Short Bio
                </label>

                <textarea
                  value={form.bio}
                  onChange={(e) => updateField("bio", e.target.value)}
                  className="min-h-32 w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-black">Contact Details</h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold text-white/70">
                  Phone
                </label>
                <input
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-white/70">
                  WhatsApp
                </label>
                <input
                  value={form.whatsapp}
                  onChange={(e) => updateField("whatsapp", e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-white/70">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-white/70">
                  Website
                </label>
                <input
                  value={form.website}
                  onChange={(e) => updateField("website", e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold text-white/70">
                  Location / Google Maps Link
                </label>
                <input
                  value={form.location_url}
                  onChange={(e) => updateField("location_url", e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-black">Social Links</h2>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-bold text-white/70">
                  Instagram
                </label>
                <input
                  value={form.instagram}
                  onChange={(e) => updateField("instagram", e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-white/70">
                  Facebook
                </label>
                <input
                  value={form.facebook}
                  onChange={(e) => updateField("facebook", e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-white/70">
                  TikTok
                </label>
                <input
                  value={form.tiktok}
                  onChange={(e) => updateField("tiktok", e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-black">Card Options</h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-[#050814] p-5">
                <div>
                  <p className="font-bold">Active Card</p>
                  <p className="mt-1 text-sm text-white/45">
                    Turn this card on or off.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) => updateField("is_active", e.target.checked)}
                  className="h-5 w-5"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-[#050814] p-5">
                <div>
                  <p className="font-bold">Enable Info Page</p>
                  <p className="mt-1 text-sm text-white/45">
                    Adds /card/slug/info page.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={form.info_page_enabled}
                  onChange={(e) =>
                    updateField("info_page_enabled", e.target.checked)
                  }
                  className="h-5 w-5"
                />
              </label>
            </div>
          </section>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={handleDeactivate}
              disabled={saving}
              className="rounded-full border border-red-400/40 bg-red-500/10 px-7 py-4 font-bold text-red-300 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              Deactivate Card
            </button>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => router.push("/admin/dashboard")}
                className="rounded-full border border-white/10 bg-white/[0.04] px-7 py-4 text-center font-bold text-white/70 transition hover:border-[#d4af37]/60 hover:text-[#d4af37]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="rounded-full bg-[#d4af37] px-7 py-4 font-black text-[#07101f] shadow-xl shadow-[#d4af37]/15 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}