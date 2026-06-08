import { createFileRoute } from "@tanstack/react-router";
import { Phone } from "@/components/shopmate/Phone";
import {
  Splash,
  Onboard1,
  Onboard2,
  Onboard3,
  Login,
  Home1,
  Chat,
  SearchScreen,
  Listing,
  Details,
  Compare,
  Wishlist,
  Cart,
  Checkout,
  Tracking,
  Profile,
  SettingsScreen,
} from "@/components/shopmate/Screens";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI ShopMate — Conversational Shopping Assistant" },
      {
        name: "description",
        content:
          "AI ShopMate: a premium mobile UI/UX case study for an AI-powered shopping assistant. 17 screens + full design system.",
      },
      { property: "og:title", content: "AI ShopMate — UI/UX Case Study" },
      {
        property: "og:description",
        content:
          "Personalized recommendations, voice & image search, smart comparison and AI savings.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const screens = [
    { n: "01", l: "Splash", c: <Splash /> },
    { n: "02", l: "Onboarding · Personalize", c: <Onboard1 /> },
    { n: "03", l: "Onboarding · Compare", c: <Onboard2 /> },
    { n: "04", l: "Onboarding · Voice & Image", c: <Onboard3 /> },
    { n: "05", l: "Login / Sign Up", c: <Login /> },
    { n: "06", l: "Home Dashboard", c: <Home1 /> },
    { n: "07", l: "AI Chat Assistant", c: <Chat /> },
    { n: "08", l: "Smart Search", c: <SearchScreen /> },
    { n: "09", l: "Product Listing", c: <Listing /> },
    { n: "10", l: "Product Details", c: <Details /> },
    { n: "11", l: "Comparison", c: <Compare /> },
    { n: "12", l: "Wishlist", c: <Wishlist /> },
    { n: "13", l: "Shopping Cart", c: <Cart /> },
    { n: "14", l: "Checkout", c: <Checkout /> },
    { n: "15", l: "Order Tracking", c: <Tracking /> },
    { n: "16", l: "Profile", c: <Profile /> },
    { n: "17", l: "Settings", c: <SettingsScreen /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827]">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 brand-gradient opacity-95" />
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-[#00C2FF]/40 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-20 text-white">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-semibold text-white">
            <Sparkles className="h-3.5 w-3.5" /> UI/UX Case Study · 2026
          </div>
          <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
            AI <span className="italic font-light">ShopMate</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/85 md:text-lg">
            A conversational shopping assistant that learns your style, compares
            products and finds the smartest deals — Amazon × ChatGPT, redesigned
            for 2026.
          </p>
          <div className="mt-8 flex flex-wrap gap-6 text-sm">
            {[
              ["17", "Screens"],
              ["1", "Design system"],
              ["AI", "First"],
              ["Mobile", "Native"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-2xl font-bold">{n}</div>
                <div className="text-xs uppercase tracking-wide text-white/70">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Featured hero phones */}
      <section className="relative -mt-16 px-6 pb-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 justify-items-center gap-12 md:grid-cols-3">
          <div className="md:translate-y-8"><Phone label={screens[5].l} number={screens[5].n}>{screens[5].c}</Phone></div>
          <div><Phone label={screens[6].l} number={screens[6].n}>{screens[6].c}</Phone></div>
          <div className="md:translate-y-8"><Phone label={screens[9].l} number={screens[9].n}>{screens[9].c}</Phone></div>
        </div>
      </section>

      {/* Design system */}
      <DesignSystem />

      {/* All screens grid */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#6C63FF]">
              The full flow
            </div>
            <h2 className="mt-2 font-display text-4xl font-bold md:text-5xl">
              17 screens, one experience
            </h2>
          </div>
          <p className="hidden max-w-sm text-sm text-neutral-500 md:block">
            From first launch to settings — every surface designed with the
            same AI-forward language.
          </p>
        </div>
        <div className="grid grid-cols-1 justify-items-center gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {screens.map((s) => (
            <Phone key={s.n} label={s.l} number={s.n}>
              {s.c}
            </Phone>
          ))}
        </div>
      </section>

      <footer className="border-t border-neutral-200 bg-white py-10 text-center text-xs text-neutral-500">
        AI ShopMate · UI/UX Case Study · Designed in 2026
      </footer>
    </div>
  );
}

function DesignSystem() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#6C63FF]">
          Design System
        </div>
        <h2 className="mt-2 font-display text-4xl font-bold md:text-5xl">
          The foundations
        </h2>

        {/* Colors */}
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {[
            { n: "Primary", h: "#6C63FF", bg: "#6C63FF" },
            { n: "Secondary", h: "#00C2FF", bg: "#00C2FF" },
            { n: "Accent", h: "#7B61FF", bg: "#7B61FF" },
            { n: "Ink", h: "#111827", bg: "#111827" },
          ].map((c) => (
            <div key={c.n} className="rounded-3xl border border-neutral-100 p-4 shadow-sm">
              <div className="h-24 rounded-2xl" style={{ background: c.bg }} />
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="font-semibold">{c.n}</span>
                <span className="font-mono text-xs text-neutral-500">{c.h}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Typography */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-neutral-100 p-8">
            <div className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
              Display · Sora
            </div>
            <div className="mt-2 font-display text-5xl font-extrabold tracking-tight">
              Shop smarter
            </div>
            <div className="mt-2 font-display text-2xl font-semibold text-neutral-500">
              with your AI mate
            </div>
          </div>
          <div className="rounded-3xl border border-neutral-100 p-8">
            <div className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
              Body · Inter
            </div>
            <p className="mt-2 text-base text-neutral-800">
              The quick brown fox jumps over the lazy dog. 0123456789
            </p>
            <p className="mt-1 text-sm text-neutral-500">
              Used across paragraphs, labels, captions and product copy.
            </p>
          </div>
        </div>

        {/* Buttons + inputs */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-neutral-100 p-8">
            <div className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
              Buttons
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button className="rounded-full brand-gradient px-5 py-2.5 text-sm font-semibold text-white soft-shadow">
                Primary
              </button>
              <button className="rounded-full border border-[#6C63FF] px-5 py-2.5 text-sm font-semibold text-[#6C63FF]">
                Secondary
              </button>
              <button className="rounded-full bg-neutral-100 px-5 py-2.5 text-sm font-semibold text-neutral-700">
                Ghost
              </button>
              <button className="grid h-10 w-10 place-items-center rounded-full brand-gradient text-white soft-shadow">
                <Sparkles className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="rounded-3xl border border-neutral-100 p-8">
            <div className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
              Input · Chips
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-2xl border border-neutral-200 bg-[#F8FAFC] px-4 py-3">
              <span className="text-sm text-neutral-400">Search products…</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["AI pick", "Under $300", "4★+", "Free ship"].map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-[#6C63FF]/10 px-3 py-1 text-xs font-semibold text-[#6C63FF]"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
