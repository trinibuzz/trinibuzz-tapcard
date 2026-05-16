export default function ClientInfoPage() {
  const services = [
    "Digital business card setup",
    "NFC tap card programming",
    "QR code profile setup",
    "Social media link setup",
    "Website and booking button setup",
    "Flyer, ad, and promotional design",
  ];

  const hours = [
    { day: "Monday - Friday", time: "9:00 AM - 6:00 PM" },
    { day: "Saturday", time: "10:00 AM - 4:00 PM" },
    { day: "Sunday", time: "By appointment only" },
  ];

  return (
    <main className="min-h-screen bg-[#050814] text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.18),_transparent_35%)]" />

        <div className="relative mx-auto max-w-5xl px-5 py-10">
          <a
            href="/card/keith"
            className="inline-flex rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm text-white/75 transition hover:border-[#d4af37]/60 hover:text-[#d4af37]"
          >
            ← Back to Digital Card
          </a>

          <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1224] shadow-2xl shadow-black/40">
            <div className="relative min-h-[260px] bg-gradient-to-br from-[#d4af37]/70 via-[#0ea5e9]/35 to-[#050814] p-8">
              <div className="absolute inset-0 bg-black/25" />
              <div className="relative max-w-2xl">
                <p className="text-sm font-bold uppercase tracking-[0.35em] text-white/70">
                  Trinibuzz Client Info Page
                </p>
                <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
                  More than a card. A mini page for your business.
                </h1>
                <p className="mt-5 max-w-xl text-lg leading-8 text-white/80">
                  Use this page for services, prices, opening hours, photos,
                  booking links, menus, or extra information your customers need.
                </p>
              </div>
            </div>

            <div className="grid gap-6 p-6 md:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:col-span-2">
                <p className="font-bold uppercase tracking-[0.25em] text-[#d4af37]">
                  About
                </p>
                <h2 className="mt-4 text-3xl font-black">
                  Trinibuzz Digital Media
                </h2>
                <p className="mt-4 leading-8 text-white/65">
                  We help businesses and professionals promote themselves with
                  modern digital tools, NFC tap cards, QR scan profiles, flyers,
                  media designs, and online contact sharing systems. This space
                  can be customized for any client who needs more than a simple
                  digital contact card.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <a
                    href="https://wa.me/18680000000"
                    className="rounded-2xl bg-[#d4af37] px-5 py-4 text-center font-black text-[#07101f] transition hover:scale-[1.02]"
                  >
                    WhatsApp Now
                  </a>
                  <a
                    href="#services"
                    className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-center font-bold text-white transition hover:border-[#d4af37]/60 hover:text-[#d4af37]"
                  >
                    View Services
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border border-[#d4af37]/25 bg-[#d4af37]/10 p-6">
                <p className="font-bold text-[#d4af37]">Quick Contact</p>
                <div className="mt-5 space-y-3 text-sm text-white/75">
                  <p>📞 868-000-0000</p>
                  <p>💬 WhatsApp Available</p>
                  <p>📧 info@trinibuzz.com</p>
                  <p>📍 Trinidad & Tobago</p>
                </div>
              </div>
            </div>
          </div>

          <section id="services" className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <p className="font-bold uppercase tracking-[0.25em] text-[#d4af37]">
              Services
            </p>
            <h2 className="mt-4 text-3xl font-black">What we offer</h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service}
                  className="rounded-2xl border border-white/10 bg-[#050814] p-5 text-white/75"
                >
                  <span className="text-[#d4af37]">✓</span> {service}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
              <p className="font-bold uppercase tracking-[0.25em] text-[#d4af37]">
                Opening Hours
              </p>
              <div className="mt-6 space-y-4">
                {hours.map((item) => (
                  <div
                    key={item.day}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#050814] px-5 py-4"
                  >
                    <span className="text-white/75">{item.day}</span>
                    <span className="font-bold text-[#d4af37]">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
              <p className="font-bold uppercase tracking-[0.25em] text-[#d4af37]">
                Gallery
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="flex aspect-square items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#d4af37]/20 to-[#0ea5e9]/20 text-white/40"
                  >
                    Image {item}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-8 rounded-[2rem] border border-[#d4af37]/25 bg-[#d4af37]/10 p-8 text-center">
            <h2 className="text-3xl font-black">
              Ready to connect with this business?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/65">
              This final call-to-action can send people to WhatsApp, a booking
              page, a menu, a price list, or the client’s main website.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="https://wa.me/18680000000"
                className="rounded-full bg-[#d4af37] px-7 py-4 font-black text-[#07101f] transition hover:scale-105"
              >
                WhatsApp Business
              </a>
              <a
                href="/card/keith"
                className="rounded-full border border-white/15 bg-white/5 px-7 py-4 font-bold text-white transition hover:border-[#d4af37]/60 hover:text-[#d4af37]"
              >
                Back to Contact Card
              </a>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}