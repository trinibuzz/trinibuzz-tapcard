"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddNewCardPage() {
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    company: "",
    title: "",
    slug: "",
    package_name: "Starter Digital Card",
    bio: "",
    phone: "",
    whatsapp: "",
    email: "",
    website: "",
    location_url: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    is_active: true,
    info_page_enabled: false,
  });

  function updateField(
    name: string,
    value: string | boolean
  ) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function autoSlug(firstName: string, lastName: string, company: string) {
    const base = `${firstName} ${lastName}`.trim() || company;

    return base
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  async function handleSubmit() {
    setSaving(true);
    setMessage("");
    setError("");

    const payload = {
      ...form,
      slug: form.slug || autoSlug(form.first_name, form.last_name, form.company),
    };

    try {
      const response = await fetch("/api/admin/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Could not save card.");
        setSaving(false);
        return;
      }

      setMessage(`Card created successfully: /card/${data.slug}`);

      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 1000);
    } catch (err) {
      setError(
        "Could not save card. If you are testing locally, the database may only work after deployment to Hostinger."
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
              <p className="text-sm text-white/55">Add New Card</p>
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
            New Digital Card
          </p>
          <h1 className="mt-3 text-4xl font-black md:text-5xl">
            Add Client Tap Card
          </h1>
          <p className="mt-3 max-w-2xl text-white/60">
            Create a new NFC / QR digital contact card. On your local computer,
            saving may fail until the app is deployed to Hostinger with database access.
          </p>
        </div>

        {message && (
          <div className="mb-6 rounded-2xl border border-green-400/30 bg-green-500/10 p-4 font-bold text-green-300">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 font-bold text-red-300">
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
                  placeholder="Keith"
                  className="w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none placeholder:text-white/30 focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-white/70">
                  Last Name
                </label>
                <input
                  value={form.last_name}
                  onChange={(e) => updateField("last_name", e.target.value)}
                  placeholder="Guevara"
                  className="w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none placeholder:text-white/30 focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-white/70">
                  Business Name
                </label>
                <input
                  value={form.company}
                  onChange={(e) => updateField("company", e.target.value)}
                  placeholder="Trinibuzz Media"
                  className="w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none placeholder:text-white/30 focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-white/70">
                  Job Title / Tagline
                </label>
                <input
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="Digital Media • NFC Cards • Promotions"
                  className="w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none placeholder:text-white/30 focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-white/70">
                  Card Slug
                </label>
                <input
                  value={form.slug}
                  onChange={(e) => updateField("slug", e.target.value)}
                  placeholder="keith"
                  className="w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none placeholder:text-white/30 focus:border-[#d4af37]"
                />
                <p className="mt-2 text-xs text-white/40">
                  Example: /card/keith. Leave blank to auto-create from name.
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
                  Short Bio
                </label>
                <textarea
                  value={form.bio}
                  onChange={(e) => updateField("bio", e.target.value)}
                  placeholder="Helping businesses and professionals share contact details instantly..."
                  className="min-h-32 w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none placeholder:text-white/30 focus:border-[#d4af37]"
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
                  placeholder="18680000000"
                  className="w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none placeholder:text-white/30 focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-white/70">
                  WhatsApp
                </label>
                <input
                  value={form.whatsapp}
                  onChange={(e) => updateField("whatsapp", e.target.value)}
                  placeholder="18680000000"
                  className="w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none placeholder:text-white/30 focus:border-[#d4af37]"
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
                  placeholder="info@trinibuzz.com"
                  className="w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none placeholder:text-white/30 focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-white/70">
                  Website
                </label>
                <input
                  value={form.website}
                  onChange={(e) => updateField("website", e.target.value)}
                  placeholder="https://trinibuzz.com"
                  className="w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none placeholder:text-white/30 focus:border-[#d4af37]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold text-white/70">
                  Location / Google Maps Link
                </label>
                <input
                  value={form.location_url}
                  onChange={(e) => updateField("location_url", e.target.value)}
                  placeholder="https://maps.google.com/..."
                  className="w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none placeholder:text-white/30 focus:border-[#d4af37]"
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
                  placeholder="https://instagram.com/..."
                  className="w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none placeholder:text-white/30 focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-white/70">
                  Facebook
                </label>
                <input
                  value={form.facebook}
                  onChange={(e) => updateField("facebook", e.target.value)}
                  placeholder="https://facebook.com/..."
                  className="w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none placeholder:text-white/30 focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-white/70">
                  TikTok
                </label>
                <input
                  value={form.tiktok}
                  onChange={(e) => updateField("tiktok", e.target.value)}
                  placeholder="https://tiktok.com/@..."
                  className="w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none placeholder:text-white/30 focus:border-[#d4af37]"
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

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
            <a
              href="/admin/dashboard"
              className="rounded-full border border-white/10 bg-white/[0.04] px-7 py-4 text-center font-bold text-white/70 transition hover:border-[#d4af37]/60 hover:text-[#d4af37]"
            >
              Cancel
            </a>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving}
              className="rounded-full bg-[#d4af37] px-7 py-4 font-black text-[#07101f] shadow-xl shadow-[#d4af37]/15 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Card"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}