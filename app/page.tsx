const packages = [
  {
    name: "Starter Digital Card",
    price: "$150",
    description: "Perfect for individuals who need a simple digital contact card.",
    features: [
      "Digital contact profile",
      "Call, WhatsApp, email buttons",
      "Social media links",
      "QR code ready",
      "Basic design setup",
    ],
  },
  {
    name: "Business Tap Card",
    price: "$295",
    description: "Best for business owners, sales reps, and service providers.",
    features: [
      "NFC tap card setup",
      "Digital profile page",
      "Save contact button",
      "Website and booking links",
      "Profile views tracking",
    ],
    highlighted: true,
  },
  {
    name: "Premium Tap Card + Info Page",
    price: "$595",
    description: "For clients who want a card plus a mini business info page.",
    features: [
      "Everything in Business",
      "Optional services/info page",
      "Opening hours section",
      "Gallery placeholders",
      "Premium layout design",
    ],
  },
];

const benefits = [
  "No app needed",
  "Works with NFC and QR code",
  "Save contact instantly",
  "Share WhatsApp, call, email, and socials",
  "Perfect for businesses and professionals",
  "Mobile-first design",
];

const steps = [
  {
    number: "01",
    title: "We create your profile",
    text: "Your business contact details, logo, links, and call-to-action buttons are added to your digital card.",
  },
  {
    number: "02",
    title: "We program your NFC card",
    text: "Your physical tap card and QR code are connected to your live digital contact profile.",
  },
  {
    number: "03",
    title: "Customers tap or scan",
    text: "Anyone can tap your card or scan your QR code to open your profile instantly.",
  },
  {
    number: "04",
    title: "They save or contact you",
    text: "Visitors can call, WhatsApp, email, visit your website, follow socials, or save your contact.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050814] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050814]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#d4af37]/50 bg-[#d4af37]/10 text-lg font-black text-[#d4af37] shadow-lg shadow-[#d4af37]/10">
              TB
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.28em] text-[#d4af37]">
                TRINIBUZZ
              </p>
              <p className="text-sm text-white/70">Tap Card</p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-white/75 md:flex">
            <a className="transition hover:text-[#d4af37]" href="#how">
              How It Works
            </a>
            <a className="transition hover:text-[#d4af37]" href="#sample">
              Sample Card
            </a>
            <a className="transition hover:text-[#d4af37]" href="#packages">
              Packages
            </a>
            <a className="transition hover:text-[#d4af37]" href="#contact">
              Contact
            </a>
          </nav>

          <a
            href="#contact"
            className="rounded-full bg-[#d4af37] px-5 py-2.5 text-sm font-bold text-[#07101f] shadow-lg shadow-[#d4af37]/20 transition hover:scale-105"
          >
            Get Started
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#0ea5e9]/20 blur-[120px]" />
        <div className="absolute right-0 top-20 h-[420px] w-[420px] rounded-full bg-[#d4af37]/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-[#d4af37]/30 bg-white/5 px-4 py-2 text-sm text-[#d4af37]">
              NFC Tap Cards • QR Scan Profiles • Digital Contact Sharing
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Tap. Scan. Share Your Contact Instantly.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              Trinibuzz Tap Card helps professionals and businesses share contact
              details, social links, websites, menus, services, and booking links
              with one tap or scan.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#sample"
                className="rounded-full bg-[#d4af37] px-7 py-4 text-center font-bold text-[#07101f] shadow-xl shadow-[#d4af37]/20 transition hover:scale-105"
              >
                View Sample Card
              </a>
              <a
                href="#contact"
                className="rounded-full border border-white/20 bg-white/5 px-7 py-4 text-center font-bold text-white transition hover:border-[#d4af37]/60 hover:text-[#d4af37]"
              >
                Get Your Tap Card
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-black text-[#d4af37]">1</p>
                <p className="mt-1 text-xs text-white/60">Tap</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-black text-[#d4af37]">1</p>
                <p className="mt-1 text-xs text-white/60">Scan</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-black text-[#d4af37]">∞</p>
                <p className="mt-1 text-xs text-white/60">Connections</p>
              </div>
            </div>
          </div>

          {/* Phone mockup */}
          <div className="mx-auto w-full max-w-sm">
            <div className="rounded-[2.5rem] border border-white/15 bg-[#0b1224] p-4 shadow-2xl shadow-black/50">
              <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#101a33] to-[#050814] p-5">
                <div className="h-32 rounded-[1.5rem] bg-gradient-to-br from-[#d4af37]/70 via-[#0ea5e9]/40 to-[#101a33]" />
                <div className="-mt-10 flex justify-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#050814] bg-[#d4af37] text-3xl font-black text-[#07101f]">
                    TB
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <h2 className="text-2xl font-black">Keith Guevara</h2>
                  <p className="mt-1 text-[#d4af37]">Trinibuzz Media</p>
                  <p className="mt-2 text-sm text-white/60">
                    Digital Media • NFC Cards • Promotions
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  {["Call Now", "WhatsApp", "Save Contact", "Website", "Instagram"].map(
                    (item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-white/7 px-4 py-3 text-center text-sm font-semibold"
                      >
                        {item}
                      </div>
                    )
                  )}
                </div>

                <div className="mt-5 rounded-2xl border border-[#d4af37]/25 bg-[#d4af37]/10 p-4 text-center text-sm text-[#d4af37]">
                  Tap card profile preview
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y border-white/10 bg-white/[0.03] py-14">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="rounded-3xl border border-white/10 bg-[#0b1224]/70 p-5 text-white/80 shadow-lg shadow-black/20"
              >
                <span className="mr-3 text-[#d4af37]">✓</span>
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-7xl px-5 py-20">
        <div className="max-w-2xl">
          <p className="font-bold uppercase tracking-[0.3em] text-[#d4af37]">
            How It Works
          </p>
          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            From first tap to new customer in seconds.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <p className="text-4xl font-black text-[#d4af37]/70">
                {step.number}
              </p>
              <h3 className="mt-5 text-xl font-bold">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/60">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sample Card */}
      <section id="sample" className="bg-[#081020] py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:grid-cols-2">
          <div>
            <p className="font-bold uppercase tracking-[0.3em] text-[#d4af37]">
              Sample Digital Card
            </p>
            <h2 className="mt-4 text-4xl font-black md:text-5xl">
              A clean mobile profile for every client.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/65">
              Each card is designed to help people contact you quickly. No app.
              No confusion. Just tap, scan, and connect.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Call button",
                "WhatsApp button",
                "Save contact",
                "Website button",
                "Social links",
                "Optional info page",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/75"
                >
                  <span className="text-[#d4af37]">●</span> {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[#050814] p-6">
            <div className="rounded-[1.5rem] bg-gradient-to-r from-[#d4af37]/25 to-[#0ea5e9]/20 p-5">
              <p className="text-sm uppercase tracking-[0.3em] text-white/50">
                Live Profile
              </p>
              <h3 className="mt-4 text-3xl font-black">Trinibuzz Sample Card</h3>
              <p className="mt-2 text-white/60">
                Professional digital contact page with everything in one place.
              </p>
            </div>

            <div className="mt-5 grid gap-3">
              {[
                "📞 Call",
                "💬 WhatsApp",
                "📩 Email",
                "💾 Save Contact",
                "🌐 Website",
                "📍 Location",
              ].map((button) => (
                <div
                  key={button}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 font-semibold"
                >
                  {button}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="mx-auto max-w-7xl px-5 py-20">
        <div className="text-center">
          <p className="font-bold uppercase tracking-[0.3em] text-[#d4af37]">
            Packages
          </p>
          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            Simple packages for every business.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`rounded-3xl border p-7 ${
                pkg.highlighted
                  ? "border-[#d4af37]/70 bg-[#d4af37]/10 shadow-2xl shadow-[#d4af37]/10"
                  : "border-white/10 bg-white/[0.04]"
              }`}
            >
              {pkg.highlighted && (
                <div className="mb-5 inline-flex rounded-full bg-[#d4af37] px-4 py-1 text-xs font-black uppercase tracking-wider text-[#07101f]">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-black">{pkg.name}</h3>
              <p className="mt-3 text-white/60">{pkg.description}</p>

              <div className="mt-6">
                <span className="text-5xl font-black text-[#d4af37]">
                  {pkg.price}
                </span>
                <span className="text-white/50"> TTD</span>
              </div>

              <div className="mt-7 space-y-3">
                {pkg.features.map((feature) => (
                  <p key={feature} className="text-sm text-white/75">
                    <span className="mr-2 text-[#d4af37]">✓</span>
                    {feature}
                  </p>
                ))}
              </div>

              <a
                href="#contact"
                className="mt-8 block rounded-full border border-[#d4af37]/50 px-5 py-3 text-center font-bold text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#07101f]"
              >
                Choose Package
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-white/10 bg-[#081020] py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-2">
          <div>
            <p className="font-bold uppercase tracking-[0.3em] text-[#d4af37]">
              Get Started
            </p>
            <h2 className="mt-4 text-4xl font-black md:text-5xl">
              Ready to build your tap card?
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/65">
              Send us your business details and we will create your digital card
              profile, QR code, and NFC tap card setup.
            </p>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <p className="font-bold text-[#d4af37]">Contact Trinibuzz</p>
              <p className="mt-3 text-white/70">WhatsApp / Call: 868-000-0000</p>
              <p className="mt-2 text-white/70">Email: info@trinibuzz.com</p>
            </div>
          </div>

          <form className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <div className="grid gap-4">
              <input
                className="rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-[#d4af37]"
                placeholder="Your name"
              />
              <input
                className="rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-[#d4af37]"
                placeholder="Business name"
              />
              <input
                className="rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-[#d4af37]"
                placeholder="Phone / WhatsApp"
              />
              <select className="rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none focus:border-[#d4af37]">
                <option>Starter Digital Card</option>
                <option>Business Tap Card</option>
                <option>Premium Tap Card + Info Page</option>
              </select>
              <textarea
                className="min-h-32 rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-[#d4af37]"
                placeholder="Tell us what links/details you want on your card"
              />
              <button
                type="button"
                className="rounded-full bg-[#d4af37] px-6 py-4 font-black text-[#07101f] shadow-xl shadow-[#d4af37]/20 transition hover:scale-[1.02]"
              >
                Send Request
              </button>
            </div>
          </form>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#050814] px-5 py-8 text-center text-sm text-white/50">
        © {new Date().getFullYear()} Trinibuzz Tap Card. Built for fast digital
        contact sharing.
      </footer>
    </main>
  );
}