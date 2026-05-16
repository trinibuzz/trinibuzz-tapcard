export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-[#050814] text-white">
      <div className="flex min-h-screen items-center justify-center px-5 py-10">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#d4af37]/50 bg-[#d4af37]/10 text-2xl font-black text-[#d4af37] shadow-lg shadow-[#d4af37]/10">
              TB
            </div>

            <p className="mt-5 text-sm font-bold uppercase tracking-[0.3em] text-[#d4af37]">
              Trinibuzz Tap Card
            </p>

            <h1 className="mt-3 text-4xl font-black">Admin Login</h1>

            <p className="mt-3 text-sm leading-6 text-white/55">
              Sign in to manage digital tap cards, profile links, client info
              pages, and card stats.
            </p>
          </div>

          <form className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30">
            <div className="grid gap-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-white/70">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="admin@trinibuzz.com"
                  className="w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none placeholder:text-white/30 focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-white/70">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full rounded-2xl border border-white/10 bg-[#050814] px-5 py-4 text-white outline-none placeholder:text-white/30 focus:border-[#d4af37]"
                />
              </div>

              <button
                type="button"
                className="mt-2 rounded-full bg-[#d4af37] px-6 py-4 font-black text-[#07101f] shadow-xl shadow-[#d4af37]/20 transition hover:scale-[1.02]"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm font-bold text-white/45 transition hover:text-[#d4af37]"
            >
              ← Back to Website
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}