import { useState, useEffect, useRef } from "react";
import {
  Search,
  Mic,
  Camera,
  ShoppingBag,
  ShoppingCart,
  Heart,
  Home,
  User,
  MessageSquare,
  Sparkles,
  Star,
  ArrowRight,
  ArrowLeft,
  Bell,
  Send,
  Plus,
  Minus,
  Check,
  MapPin,
  CreditCard,
  Package,
  Truck,
  ChevronRight,
  Moon,
  Shield,
  Settings as Cog,
  Apple,
  Eye,
  Filter,
  SlidersHorizontal,
  BadgePercent,
  Headphones,
  Watch,
  Shirt,
  Smartphone,
  Tag,
} from "lucide-react";
import { StatusPad } from "./Phone";

/* ───────── shared bits ───────── */

function TabBar({ active = "home" }: { active?: "home" | "chat" | "wishlist" | "cart" | "profile" }) {
  const items = [
    { id: "home", icon: Home, label: "Home" },
    { id: "chat", icon: MessageSquare, label: "AI" },
    { id: "wishlist", icon: Heart, label: "Saved" },
    { id: "cart", icon: ShoppingCart, label: "Cart" },
    { id: "profile", icon: User, label: "Me" },
  ] as const;
  return (
    <div className="absolute inset-x-3 bottom-3 z-20 flex items-center justify-between rounded-2xl bg-white/90 px-3 py-2 backdrop-blur-md soft-shadow border border-white">
      {items.map((it) => {
        const Icon = it.icon;
        const isActive = it.id === active;
        return (
          <button
            key={it.id}
            className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-[10px] font-medium ${
              isActive ? "text-white" : "text-neutral-500"
            }`}
          >
            <span
              className={`grid h-9 w-9 place-items-center rounded-xl ${
                isActive ? "brand-gradient soft-shadow" : ""
              }`}
            >
              <Icon className="h-4 w-4" />
            </span>
            <span className={isActive ? "text-[#6C63FF]" : ""}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function TopBar({ title, back = true }: { title: string; back?: boolean }) {
  return (
    <div className="flex items-center justify-between px-5 pb-2 pt-2">
      {back ? (
        <button className="grid h-9 w-9 place-items-center rounded-xl bg-white shadow-sm">
          <ArrowLeft className="h-4 w-4" />
        </button>
      ) : (
        <span className="h-9 w-9" />
      )}
      <h2 className="text-sm font-semibold">{title}</h2>
      <button className="grid h-9 w-9 place-items-center rounded-xl bg-white shadow-sm">
        <Bell className="h-4 w-4" />
      </button>
    </div>
  );
}

function ProductCard({
  name,
  price,
  old,
  gradient,
  badge,
  rating = 4.8,
  icon: Icon = Headphones,
  compact = false,
}: {
  name: string;
  price: string;
  old?: string;
  gradient: string;
  badge?: string;
  rating?: number;
  icon?: typeof Headphones;
  compact?: boolean;
}) {
  return (
    <div className="rounded-2xl bg-white p-2 shadow-[0_8px_24px_-12px_rgba(108,99,255,0.25)]">
      <div
        className={`relative grid ${compact ? "h-20" : "h-24"} w-full place-items-center overflow-hidden rounded-xl`}
        style={{ backgroundImage: gradient }}
      >
        {badge && (
          <span className="absolute left-1.5 top-1.5 flex items-center gap-0.5 rounded-full bg-white/90 px-1.5 py-0.5 text-[8px] font-semibold text-[#6C63FF]">
            <Sparkles className="h-2.5 w-2.5" /> {badge}
          </span>
        )}
        <button className="absolute right-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-full bg-white/90">
          <Heart className="h-2.5 w-2.5 text-[#6C63FF]" />
        </button>
        <Icon className="h-9 w-9 text-white drop-shadow-lg" strokeWidth={1.5} />
      </div>
      <div className="px-1 pt-2">
        <div className="line-clamp-1 text-[11px] font-semibold">{name}</div>
        <div className="mt-0.5 flex items-center gap-1 text-[9px] text-neutral-500">
          <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
          {rating} · 1.2k
        </div>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-xs font-bold text-[#111827]">{price}</span>
          {old && (
            <span className="text-[9px] text-neutral-400 line-through">{old}</span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ───────── 1. Splash ───────── */
export function Splash() {
  return (
    <div className="relative h-full w-full brand-gradient">
      <div className="absolute -left-12 -top-12 h-48 w-48 rounded-full bg-white/20 blur-2xl" />
      <div className="absolute -bottom-16 -right-10 h-56 w-56 rounded-full bg-[#00C2FF]/40 blur-2xl" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-white">
        <div className="relative">
          <span className="absolute inset-0 animate-pulse-ring rounded-3xl bg-white/40" />
          <div className="glass relative grid h-24 w-24 place-items-center rounded-3xl">
            <ShoppingBag className="h-10 w-10 text-white" strokeWidth={2.2} />
            <span className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-white text-[#6C63FF]">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
        <h1 className="mt-7 font-display text-3xl font-extrabold tracking-tight">
          AI ShopMate
        </h1>
        <p className="mt-2 text-center text-[11px] font-medium text-white/80">
          Your intelligent shopping companion
        </p>
        <div className="absolute bottom-16 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-white/80 animate-type"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────── 2-4. Onboarding ───────── */
function OnboardFrame({
  title,
  body,
  step,
  art,
}: {
  title: string;
  body: string;
  step: number;
  art: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col bg-[#F8FAFC]">
      <StatusPad />
      <div className="flex justify-end px-5 pt-2">
        <button className="text-[11px] font-medium text-neutral-500">Skip</button>
      </div>
      <div className="relative mx-5 mt-2 flex-1 overflow-hidden rounded-3xl brand-gradient">
        <div className="absolute -right-10 top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
        <div className="absolute -left-8 bottom-10 h-32 w-32 rounded-full bg-[#00C2FF]/40 blur-2xl" />
        <div className="relative z-10 flex h-full items-center justify-center p-6">
          {art}
        </div>
      </div>
      <div className="px-6 pt-5">
        <div className="mb-3 flex items-center gap-1.5">
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === step ? "w-6 bg-[#6C63FF]" : "w-1.5 bg-neutral-300"
              }`}
            />
          ))}
        </div>
        <h3 className="text-lg font-bold leading-tight">{title}</h3>
        <p className="mt-1.5 text-[11px] leading-relaxed text-neutral-500">
          {body}
        </p>
      </div>
      <div className="flex items-center justify-between px-6 pb-8 pt-4">
        <button className="text-[11px] font-medium text-neutral-500">Back</button>
        <button className="flex items-center gap-1.5 rounded-full brand-gradient px-5 py-2.5 text-xs font-semibold text-white soft-shadow">
          Next <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
export function Onboard1() {
  return (
    <OnboardFrame
      step={1}
      title="Personalized for your taste"
      body="AI learns your style and curates products that actually match what you love."
      art={
        <div className="relative">
          <div className="glass animate-float-slow rounded-2xl p-3">
            <Shirt className="h-12 w-12 text-white" strokeWidth={1.5} />
          </div>
          <div className="glass absolute -right-10 -top-4 rounded-xl p-2">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="glass absolute -bottom-6 -left-12 rounded-xl px-2 py-1.5 text-[9px] font-semibold text-white">
            98% match
          </div>
        </div>
      }
    />
  );
}
export function Onboard2() {
  return (
    <OnboardFrame
      step={2}
      title="Smart product comparison"
      body="Compare any two products side-by-side. Our AI recommends the best value for you."
      art={
        <div className="flex items-end gap-3">
          <div className="glass animate-float-slow rounded-2xl p-3">
            <Smartphone className="h-10 w-10 text-white" strokeWidth={1.5} />
          </div>
          <div className="grid h-8 w-8 place-items-center rounded-full bg-white text-xs font-bold text-[#6C63FF]">
            VS
          </div>
          <div
            className="glass animate-float-slow rounded-2xl p-3"
            style={{ animationDelay: "1s" }}
          >
            <Watch className="h-10 w-10 text-white" strokeWidth={1.5} />
          </div>
        </div>
      }
    />
  );
}
export function Onboard3() {
  return (
    <OnboardFrame
      step={3}
      title="Voice & image search"
      body="Talk, snap, or type. Find anything with a conversational shopping assistant."
      art={
        <div className="relative flex items-center gap-3">
          <div className="glass grid h-14 w-14 place-items-center rounded-2xl">
            <Mic className="h-6 w-6 text-white" />
          </div>
          <div className="glass grid h-14 w-14 place-items-center rounded-2xl">
            <Camera className="h-6 w-6 text-white" />
          </div>
          <div className="glass grid h-14 w-14 place-items-center rounded-2xl">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
        </div>
      }
    />
  );
}

/* ───────── 5. Login ───────── */
export function Login() {
  return (
    <div className="flex h-full flex-col bg-[#F8FAFC]">
      <div className="relative h-44 brand-gradient">
        <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center pt-6 text-white">
          <div className="glass grid h-14 w-14 place-items-center rounded-2xl">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <h2 className="mt-3 text-lg font-bold">Welcome back</h2>
          <p className="text-[11px] text-white/80">Sign in to continue shopping</p>
        </div>
      </div>
      <div className="-mt-6 flex-1 rounded-t-3xl bg-white px-6 pt-6">
        <label className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
          Email
        </label>
        <div className="mt-1 flex items-center gap-2 rounded-xl border border-neutral-200 bg-[#F8FAFC] px-3 py-2.5">
          <span className="text-xs text-neutral-400">@</span>
          <span className="text-xs text-neutral-700">hello@shopmate.ai</span>
        </div>
        <label className="mt-3 block text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
          Password
        </label>
        <div className="mt-1 flex items-center justify-between rounded-xl border border-neutral-200 bg-[#F8FAFC] px-3 py-2.5">
          <span className="text-xs tracking-widest text-neutral-700">••••••••</span>
          <Eye className="h-3.5 w-3.5 text-neutral-400" />
        </div>
        <button className="mt-5 w-full rounded-xl brand-gradient py-3 text-xs font-semibold text-white soft-shadow">
          Sign In
        </button>
        <div className="my-4 flex items-center gap-2 text-[10px] text-neutral-400">
          <span className="h-px flex-1 bg-neutral-200" />
          or continue with
          <span className="h-px flex-1 bg-neutral-200" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { i: <Apple className="h-4 w-4" />, l: "Apple" },
            { i: <span className="text-xs font-bold text-[#4285F4]">G</span>, l: "Google" },
            { i: <span className="text-xs font-bold text-[#1877F2]">f</span>, l: "Meta" },
          ].map((s) => (
            <button
              key={s.l}
              className="flex items-center justify-center gap-1 rounded-xl border border-neutral-200 bg-white py-2.5 text-[10px] font-medium"
            >
              {s.i} {s.l}
            </button>
          ))}
        </div>
        <p className="mt-4 text-center text-[10px] text-neutral-500">
          New here? <span className="font-semibold text-[#6C63FF]">Create account</span>
        </p>
      </div>
    </div>
  );
}

/* ───────── 6. Home Dashboard ───────── */
export function Home1() {
  return (
    <div className="relative h-full overflow-y-auto bg-[#F8FAFC] pb-24">
      <StatusPad />
      <div className="flex items-center justify-between px-5 pt-2">
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center overflow-hidden rounded-full brand-gradient text-xs font-bold text-white">
            AR
          </div>
          <div>
            <div className="text-[10px] text-neutral-500">Good morning,</div>
            <div className="text-xs font-bold">Aarav ✨</div>
          </div>
        </div>
        <button className="relative grid h-9 w-9 place-items-center rounded-xl bg-white shadow-sm">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#6C63FF]" />
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2 px-5">
        <div className="flex flex-1 items-center gap-2 rounded-2xl bg-white px-3 py-2.5 shadow-sm">
          <Search className="h-3.5 w-3.5 text-neutral-400" />
          <span className="text-[11px] text-neutral-400">Search products, brands…</span>
        </div>
        <button className="grid h-10 w-10 place-items-center rounded-2xl brand-gradient text-white soft-shadow">
          <Mic className="h-4 w-4" />
        </button>
      </div>

      {/* AI assistant card */}
      <div className="relative mx-5 mt-4 overflow-hidden rounded-2xl brand-gradient p-4 text-white">
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/20 blur-xl" />
        <div className="relative flex items-start gap-3">
          <div className="glass grid h-10 w-10 shrink-0 place-items-center rounded-xl">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <div className="text-[10px] font-medium uppercase tracking-wide text-white/80">
              Your AI Mate
            </div>
            <div className="text-xs font-semibold leading-snug">
              "I found 12 deals matching your style — save up to 40% today."
            </div>
            <button className="mt-2 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-[#6C63FF]">
              Open chat <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between px-5">
        <h3 className="text-xs font-bold">Categories</h3>
        <span className="text-[10px] text-[#6C63FF]">See all</span>
      </div>
      <div className="mt-2 flex gap-2 overflow-x-auto px-5 pb-1">
        {[
          { i: Shirt, l: "Fashion" },
          { i: Smartphone, l: "Tech" },
          { i: Watch, l: "Watches" },
          { i: Headphones, l: "Audio" },
          { i: ShoppingBag, l: "Beauty" },
        ].map((c) => (
          <div
            key={c.l}
            className="flex w-16 shrink-0 flex-col items-center gap-1.5 rounded-2xl bg-white p-2.5 shadow-sm"
          >
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#6C63FF]/15 to-[#00C2FF]/15 text-[#6C63FF]">
              <c.i className="h-4 w-4" />
            </div>
            <span className="text-[9px] font-medium">{c.l}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between px-5">
        <h3 className="text-xs font-bold">Trending now 🔥</h3>
        <span className="text-[10px] text-[#6C63FF]">See all</span>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2.5 px-5">
        <ProductCard
          name="Aura Pro Headphones"
          price="$249"
          old="$329"
          badge="AI pick"
          gradient="linear-gradient(135deg,#6C63FF,#00C2FF)"
          icon={Headphones}
        />
        <ProductCard
          name="Nova Smartwatch S3"
          price="$189"
          gradient="linear-gradient(135deg,#7B61FF,#F472B6)"
          icon={Watch}
        />
      </div>

      <div className="mt-4 flex items-center justify-between px-5">
        <h3 className="text-xs font-bold">Recently viewed</h3>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2.5 px-5">
        <ProductCard
          name="Minimal Phone 14"
          price="$899"
          gradient="linear-gradient(135deg,#0EA5E9,#6366F1)"
          icon={Smartphone}
          compact
        />
        <ProductCard
          name="Linen Oversize Tee"
          price="$42"
          gradient="linear-gradient(135deg,#F59E0B,#EF4444)"
          icon={Shirt}
          compact
        />
      </div>
      <TabBar active="home" />
    </div>
  );
}

/* ───────── 7. AI Chat ───────── */
type ChatMessage = {
  id: number;
  role: "user" | "ai";
  text?: string;
  cards?: { name: string; detail: string; gradient: string }[];
};

export function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "ai",
      text: "Hey Aarav 👋 looking for noise-cancelling headphones under $300?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [streamText, setStreamText] = useState("");
  const [suggestions, setSuggestions] = useState([
    "Yes, great battery life",
    "Under $200?",
    "Best for travel",
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(2);
  const [composer, setComposer] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const baseTranscriptRef = useRef("");

  useEffect(() => {
    const SR =
      (typeof window !== "undefined" &&
        ((window as any).SpeechRecognition ||
          (window as any).webkitSpeechRecognition)) ||
      null;
    if (!SR) {
      setVoiceSupported(false);
      return;
    }
    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";
    rec.onresult = (e: any) => {
      let interim = "";
      let finalText = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalText += r[0].transcript;
        else interim += r[0].transcript;
      }
      if (finalText) baseTranscriptRef.current += finalText;
      const combined = (baseTranscriptRef.current + interim).replace(/\s+/g, " ").trimStart();
      setComposer(combined);
    };
    rec.onerror = (e: any) => {
      setIsListening(false);
      if (e?.error === "not-allowed" || e?.error === "service-not-allowed") {
        setVoiceError("Mic permission denied");
      } else if (e?.error === "no-speech") {
        setVoiceError("Didn't catch that");
      } else {
        setVoiceError("Voice unavailable");
      }
      setTimeout(() => setVoiceError(null), 2200);
    };
    rec.onend = () => setIsListening(false);
    recognitionRef.current = rec;
    return () => {
      try {
        rec.stop();
      } catch {}
    };
  }, []);

  const toggleVoice = () => {
    const rec = recognitionRef.current;
    if (!rec) {
      setVoiceError("Voice not supported");
      setTimeout(() => setVoiceError(null), 2000);
      return;
    }
    if (isListening) {
      try {
        rec.stop();
      } catch {}
      setIsListening(false);
      return;
    }
    baseTranscriptRef.current = composer ? composer + " " : "";
    try {
      rec.start();
      setIsListening(true);
      setVoiceError(null);
    } catch {
      setIsListening(false);
    }
  };

  const sendComposer = async () => {
    const text = composer.trim();
    if (!text) return;
    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch {}
      setIsListening(false);
    }
    setComposer("");
    baseTranscriptRef.current = "";
    const userId = idRef.current++;
    setMessages((m) => [...m, { id: userId, role: "user", text }]);
    setIsTyping(true);
    scrollToBottom();
    await new Promise((r) => setTimeout(r, 700));
    setIsTyping(false);
    const reply = `Got it — searching for "${text}". Here's what I'd recommend based on your preferences.`;
    await streamResponse(reply);
    const aiId = idRef.current++;
    setMessages((m) => [...m, { id: aiId, role: "ai", text: reply }]);
    setStreamText("");
    setSuggestions(["Show top picks", "Cheaper options", "Compare them"]);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  };

  const streamResponse = (fullText: string, delay = 16) => {
    return new Promise<void>((resolve) => {
      setStreamText("");
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setStreamText(fullText.slice(0, i));
        scrollToBottom();
        if (i >= fullText.length) {
          clearInterval(interval);
          setTimeout(resolve, 180);
        }
      }, delay);
    });
  };

  const sendPrompt = async (
    prompt: string,
    response: string,
    nextSuggestions: string[],
    cards?: ChatMessage["cards"]
  ) => {
    const userId = idRef.current++;
    setMessages((m) => [...m, { id: userId, role: "user", text: prompt }]);
    setIsTyping(true);
    scrollToBottom();

    await new Promise((r) => setTimeout(r, 700));
    setIsTyping(false);

    await streamResponse(response);

    const aiId = idRef.current++;
    setMessages((m) => [...m, { id: aiId, role: "ai", text: response, cards }]);
    setStreamText("");
    setSuggestions(nextSuggestions);
    scrollToBottom();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamText, isTyping]);

  return (
    <div className="relative flex h-full flex-col bg-[#F8FAFC]">
      <StatusPad />
      {/* Header */}
      <div className="flex items-center gap-2 px-5 pb-2 pt-2">
        <button className="grid h-9 w-9 place-items-center rounded-xl bg-white shadow-sm">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex flex-1 items-center gap-2">
          <div className="relative grid h-9 w-9 place-items-center rounded-xl brand-gradient text-white">
            <Sparkles className="h-4 w-4" />
            {isTyping && (
              <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
            )}
          </div>
          <div>
            <div className="text-xs font-bold">ShopMate AI</div>
            <div className="flex items-center gap-1 text-[9px] text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{" "}
              {isTyping ? "typing…" : "online"}
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-2.5 overflow-y-auto px-4 pb-2">
        {messages.map((msg) => (
          <div key={msg.id}>
            {msg.role === "ai" && msg.text && !msg.cards && (
              <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-[11px] leading-relaxed shadow-sm">
                {msg.text}
              </div>
            )}
            {msg.role === "ai" && msg.cards && (
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white p-2 shadow-sm">
                <div className="px-1 text-[11px] leading-relaxed">{msg.text}</div>
                <div className="mt-2 grid grid-cols-2 gap-1.5">
                  {msg.cards.map((c) => (
                    <div
                      key={c.name}
                      className="rounded-xl p-2 text-white"
                      style={{ backgroundImage: c.gradient }}
                    >
                      <Headphones className="h-6 w-6" strokeWidth={1.5} />
                      <div className="mt-1 text-[9px] font-semibold">{c.name}</div>
                      <div className="text-[9px] opacity-80">{c.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {msg.role === "user" && (
              <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm brand-gradient px-3 py-2 text-[11px] leading-relaxed text-white">
                {msg.text}
              </div>
            )}
          </div>
        ))}

        {/* Streaming text */}
        {streamText && (
          <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-[11px] leading-relaxed shadow-sm">
            {streamText}
            <span className="ml-0.5 inline-block h-3 w-[2px] animate-pulse bg-[#6C63FF]" />
          </div>
        )}

        {/* Typing dots */}
        {isTyping && !streamText && (
          <div className="flex max-w-[60%] items-center gap-1 rounded-2xl rounded-tl-sm bg-white px-3 py-2.5 shadow-sm">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-[#6C63FF] animate-type"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Suggested prompts + input */}
      <div className="px-4 pb-2">
        <div className="flex gap-1.5 overflow-x-auto pb-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => {
                if (s === "Yes, great battery life") {
                  sendPrompt(
                    s,
                    "Here are my top 2 picks for you:",
                    ["Compare them", "Cheaper options", "Best for gym"],
                    [
                      {
                        name: "Aura Pro",
                        detail: "$249 · 40h",
                        gradient: "linear-gradient(135deg,#6C63FF,#00C2FF)",
                      },
                      {
                        name: "Echo X2",
                        detail: "$279 · 35h",
                        gradient: "linear-gradient(135deg,#7B61FF,#F472B6)",
                      },
                    ]
                  );
                } else if (s === "Compare them") {
                  sendPrompt(
                    s,
                    "Aura Pro wins on battery (40h vs 35h) and price ($249 vs $279). Echo X2 has slightly better ANC depth. Want me to add one to your cart?",
                    ["Add Aura Pro", "Add Echo X2", "Show specs"]
                  );
                } else if (s === "Cheaper options") {
                  sendPrompt(
                    s,
                    "Sonic Lite at $129 is the best budget pick — 30h battery and solid ANC for the price. Bass Studio at $199 adds custom EQ.",
                    ["Sonic Lite details", "Bass Studio details", "Back to top picks"]
                  );
                } else if (s === "Best for gym") {
                  sendPrompt(
                    s,
                    "Echo X2 has IP55 sweat resistance and a sport-fit band. Aura Pro is IPX4 — fine for light workouts but not heavy sweat.",
                    ["Echo X2 details", "Show gym alternatives", "Back to top picks"]
                  );
                } else if (s === "Under $200?") {
                  sendPrompt(
                    s,
                    "Sonic Lite at $129 and Bass Studio at $199 are both great under $200. Sonic Lite is lighter; Bass Studio has richer bass.",
                    ["Sonic Lite details", "Bass Studio details", "Back to top picks"]
                  );
                } else if (s === "Best for travel") {
                  sendPrompt(
                    s,
                    "Aura Pro is best for travel — 40h battery, premium ANC, and it folds flat into the included hard case.",
                    ["Aura Pro details", "Travel accessories", "Back to top picks"]
                  );
                } else if (s === "Add Aura Pro") {
                  sendPrompt(
                    s,
                    "Added Aura Pro to your cart ✅ Total is now $249 + free shipping.",
                    ["Go to checkout", "Keep browsing", "View cart"]
                  );
                } else if (s === "Add Echo X2") {
                  sendPrompt(
                    s,
                    "Added Echo X2 to your cart ✅ Total is now $279 + free shipping.",
                    ["Go to checkout", "Keep browsing", "View cart"]
                  );
                } else if (s === "Go to checkout") {
                  sendPrompt(
                    s,
                    "Taking you to checkout… you can review your address and payment there.",
                    ["Keep browsing", "View cart", "Home"]
                  );
                } else {
                  sendPrompt(
                    s,
                    `I can help with "${s}". Let me know what else you need!`,
                    ["Compare them", "Cheaper options", "Best for gym"]
                  );
                }
              }}
              className="shrink-0 rounded-full border border-[#6C63FF]/30 bg-white px-2.5 py-1 text-[9px] font-medium text-[#6C63FF] transition-transform active:scale-95"
            >
              {s}
            </button>
          ))}
        </div>
        {(isListening || voiceError) && (
          <div className="mb-1.5 flex items-center justify-between rounded-xl bg-white px-2.5 py-1 shadow-sm">
            {isListening ? (
              <>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
                  </span>
                  <span className="text-[9px] font-semibold text-rose-600">Listening…</span>
                </div>
                <div className="flex items-end gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className="w-0.5 rounded-full bg-[#6C63FF] animate-type"
                      style={{
                        height: `${6 + (i % 3) * 4}px`,
                        animationDelay: `${i * 0.12}s`,
                      }}
                    />
                  ))}
                </div>
              </>
            ) : (
              <span className="text-[9px] font-semibold text-rose-600">{voiceError}</span>
            )}
          </div>
        )}
        <div className="flex items-center gap-2 rounded-2xl bg-white p-1.5 shadow-sm">
          <input
            value={composer}
            onChange={(e) => {
              setComposer(e.target.value);
              baseTranscriptRef.current = e.target.value;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendComposer();
              }
            }}
            placeholder={isListening ? "Speak now…" : "Ask anything…"}
            className="flex-1 bg-transparent px-2 text-[11px] outline-none placeholder:text-neutral-400"
          />
          <button
            onClick={toggleVoice}
            aria-label={isListening ? "Stop voice input" : "Start voice input"}
            disabled={!voiceSupported}
            className={`relative grid h-8 w-8 place-items-center rounded-xl transition-colors ${
              isListening
                ? "bg-rose-500 text-white"
                : "bg-neutral-100 text-neutral-600"
            } ${!voiceSupported ? "opacity-40" : ""}`}
          >
            {isListening && (
              <span className="absolute inset-0 rounded-xl bg-rose-500/40 animate-ping" />
            )}
            <Mic className="relative h-3.5 w-3.5" />
          </button>
          <button
            onClick={sendComposer}
            className="grid h-8 w-8 place-items-center rounded-xl brand-gradient text-white transition-transform active:scale-95"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───────── 8. Search ───────── */
export function SearchScreen() {
  return (
    <div className="relative h-full bg-[#F8FAFC] pb-20">
      <StatusPad />
      <div className="flex items-center gap-2 px-5 pt-2">
        <button className="grid h-9 w-9 place-items-center rounded-xl bg-white shadow-sm">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex flex-1 items-center gap-2 rounded-2xl bg-white px-3 py-2.5 shadow-sm">
          <Search className="h-3.5 w-3.5 text-[#6C63FF]" />
          <span className="flex-1 text-[11px] font-medium">wireless headphones</span>
          <Camera className="h-3.5 w-3.5 text-neutral-400" />
          <Mic className="h-3.5 w-3.5 text-[#6C63FF]" />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1.5 overflow-x-auto px-5 pb-1">
        <button className="flex items-center gap-1 rounded-full brand-gradient px-2.5 py-1 text-[10px] font-semibold text-white">
          <SlidersHorizontal className="h-3 w-3" /> AI filters
        </button>
        {["Under $300", "4★+", "Free ship", "In stock"].map((f) => (
          <button
            key={f}
            className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[10px] font-medium text-neutral-600 shadow-sm"
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mx-5 mt-3 flex items-center gap-2 rounded-2xl border border-[#6C63FF]/20 bg-white p-3">
        <div className="grid h-8 w-8 place-items-center rounded-xl brand-gradient text-white">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="text-[10px] leading-snug">
          <b>AI suggests:</b> Aura Pro fits your "long flights" history best.
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2.5 px-5">
        <ProductCard
          name="Aura Pro ANC"
          price="$249"
          old="$329"
          badge="Best match"
          gradient="linear-gradient(135deg,#6C63FF,#00C2FF)"
          icon={Headphones}
        />
        <ProductCard
          name="Echo X2 Wireless"
          price="$279"
          gradient="linear-gradient(135deg,#7B61FF,#F472B6)"
          icon={Headphones}
        />
        <ProductCard
          name="Sonic Lite"
          price="$129"
          gradient="linear-gradient(135deg,#10B981,#06B6D4)"
          icon={Headphones}
        />
        <ProductCard
          name="Bass Studio"
          price="$199"
          gradient="linear-gradient(135deg,#F59E0B,#EF4444)"
          icon={Headphones}
        />
      </div>
      <TabBar active="home" />
    </div>
  );
}

/* ───────── 9. Product Listing ───────── */
export function Listing() {
  return (
    <div className="relative h-full bg-[#F8FAFC] pb-20">
      <StatusPad />
      <TopBar title="Headphones" />
      <div className="flex items-center justify-between px-5">
        <span className="text-[10px] text-neutral-500">128 results</span>
        <button className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold shadow-sm">
          <Filter className="h-3 w-3" /> Sort
        </button>
      </div>
      <div className="mt-3 space-y-2.5 px-5">
        {[
          { n: "Aura Pro ANC", p: "$249", o: "$329", b: "AI pick", g: "linear-gradient(135deg,#6C63FF,#00C2FF)" },
          { n: "Echo X2 Wireless", p: "$279", b: "Trending", g: "linear-gradient(135deg,#7B61FF,#F472B6)" },
          { n: "Sonic Lite Buds", p: "$129", g: "linear-gradient(135deg,#10B981,#06B6D4)" },
        ].map((p) => (
          <div key={p.n} className="flex gap-3 rounded-2xl bg-white p-2.5 shadow-sm">
            <div
              className="relative grid h-20 w-20 shrink-0 place-items-center rounded-xl"
              style={{ backgroundImage: p.g }}
            >
              <Headphones className="h-9 w-9 text-white" strokeWidth={1.5} />
            </div>
            <div className="flex flex-1 flex-col justify-between py-0.5">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold">{p.n}</span>
                  {p.b && (
                    <span className="rounded-full bg-[#6C63FF]/10 px-1.5 py-0.5 text-[8px] font-semibold text-[#6C63FF]">
                      ✨ {p.b}
                    </span>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-1 text-[9px] text-neutral-500">
                  <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                  4.8 · 2.1k reviews
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-bold">{p.p}</span>
                  {p.o && (
                    <span className="text-[9px] text-neutral-400 line-through">{p.o}</span>
                  )}
                </div>
                <button className="grid h-7 w-7 place-items-center rounded-lg brand-gradient text-white">
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <TabBar active="home" />
    </div>
  );
}

/* ───────── 10. Product Details ───────── */
export function Details() {
  return (
    <div className="relative h-full overflow-y-auto bg-[#F8FAFC] pb-24">
      <div className="relative h-72 bg-gradient-to-br from-[#6C63FF] via-[#7B61FF] to-[#00C2FF]">
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 pt-12">
          <button className="grid h-9 w-9 place-items-center rounded-xl bg-white/30 backdrop-blur-md text-white">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button className="grid h-9 w-9 place-items-center rounded-xl bg-white/30 backdrop-blur-md text-white">
            <Heart className="h-4 w-4" />
          </button>
        </div>
        <div className="flex h-full items-center justify-center">
          <Headphones className="h-32 w-32 text-white drop-shadow-2xl animate-float-slow" strokeWidth={1.2} />
        </div>
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full ${i === 0 ? "w-5 bg-white" : "w-1.5 bg-white/50"}`}
            />
          ))}
        </div>
      </div>
      <div className="-mt-6 rounded-t-3xl bg-white px-5 pt-5">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-semibold text-[#6C63FF]">AURA AUDIO</span>
            <h2 className="text-lg font-bold leading-tight">Aura Pro ANC</h2>
            <div className="mt-1 flex items-center gap-1 text-[10px] text-neutral-500">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              4.8 · 2,140 reviews
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-neutral-400 line-through">$329</div>
            <div className="text-xl font-extrabold brand-text">$249</div>
          </div>
        </div>

        <div className="mt-3 rounded-2xl bg-gradient-to-br from-[#6C63FF]/10 to-[#00C2FF]/10 p-3">
          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#6C63FF]">
            <Sparkles className="h-3 w-3" /> AI SUMMARY
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-neutral-700">
            Premium ANC, 40h battery, ultra-light. Loved by travelers. Better
            value than 87% of similar models.
          </p>
        </div>

        <h4 className="mt-4 text-xs font-bold">Color</h4>
        <div className="mt-1.5 flex gap-2">
          {["#111827", "#6C63FF", "#F8FAFC", "#F472B6"].map((c, i) => (
            <span
              key={c}
              className={`grid h-7 w-7 place-items-center rounded-full ring-2 ${
                i === 1 ? "ring-[#6C63FF]" : "ring-transparent"
              }`}
            >
              <span className="h-5 w-5 rounded-full border border-neutral-200" style={{ background: c }} />
            </span>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <button className="flex-1 rounded-2xl border border-[#6C63FF] py-3 text-xs font-semibold text-[#6C63FF]">
            Compare
          </button>
          <button className="flex-[2] rounded-2xl brand-gradient py-3 text-xs font-semibold text-white soft-shadow">
            Add to Cart · $249
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───────── 11. Compare ───────── */
export function Compare() {
  const features = [
    ["Battery", "40h", "35h"],
    ["ANC", "Adaptive", "Standard"],
    ["Weight", "240g", "265g"],
    ["Codec", "LDAC", "AAC"],
  ];
  return (
    <div className="relative h-full bg-[#F8FAFC] pb-20">
      <StatusPad />
      <TopBar title="Compare" />
      <div className="grid grid-cols-2 gap-2 px-5">
        {[
          { n: "Aura Pro", g: "linear-gradient(135deg,#6C63FF,#00C2FF)", score: 94 },
          { n: "Echo X2", g: "linear-gradient(135deg,#7B61FF,#F472B6)", score: 82 },
        ].map((p, i) => (
          <div key={p.n} className="rounded-2xl bg-white p-2.5 shadow-sm">
            <div
              className="grid h-20 w-full place-items-center rounded-xl"
              style={{ backgroundImage: p.g }}
            >
              <Headphones className="h-9 w-9 text-white" strokeWidth={1.5} />
            </div>
            <div className="mt-2 text-[11px] font-semibold">{p.n}</div>
            <div className="text-xs font-bold">${i === 0 ? 249 : 279}</div>
            <div className="mt-1.5 flex items-center gap-1 rounded-full bg-[#6C63FF]/10 px-2 py-0.5 text-[9px] font-semibold text-[#6C63FF]">
              <Sparkles className="h-2.5 w-2.5" /> AI {p.score}
            </div>
          </div>
        ))}
      </div>
      <div className="mx-5 mt-3 rounded-2xl bg-white p-3 shadow-sm">
        <div className="text-[10px] font-bold uppercase tracking-wide text-neutral-500">
          Features
        </div>
        <div className="mt-2 divide-y divide-neutral-100">
          {features.map(([k, a, b], i) => (
            <div key={k} className="grid grid-cols-3 py-2 text-[11px]">
              <span className="text-neutral-500">{k}</span>
              <span className={`text-center font-semibold ${i === 0 ? "text-[#6C63FF]" : ""}`}>{a}</span>
              <span className="text-center text-neutral-700">{b}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-5 mt-3 flex items-center gap-2 rounded-2xl brand-gradient p-3 text-white soft-shadow">
        <Sparkles className="h-5 w-5" />
        <div className="flex-1 text-[10px] leading-snug">
          <b>Best value:</b> Aura Pro wins on battery, weight & price.
        </div>
        <button className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-[#6C63FF]">
          Buy
        </button>
      </div>
      <TabBar active="home" />
    </div>
  );
}

/* ───────── 12. Wishlist ───────── */
export function Wishlist() {
  return (
    <div className="relative h-full bg-[#F8FAFC] pb-20">
      <StatusPad />
      <TopBar title="Wishlist" back={false} />
      <div className="grid grid-cols-2 gap-2.5 px-5">
        <ProductCard name="Aura Pro" price="$249" gradient="linear-gradient(135deg,#6C63FF,#00C2FF)" icon={Headphones} />
        <ProductCard name="Nova S3" price="$189" gradient="linear-gradient(135deg,#7B61FF,#F472B6)" icon={Watch} />
        <ProductCard name="Linen Tee" price="$42" gradient="linear-gradient(135deg,#F59E0B,#EF4444)" icon={Shirt} />
        <ProductCard name="Mini Phone" price="$899" gradient="linear-gradient(135deg,#0EA5E9,#6366F1)" icon={Smartphone} />
      </div>
      <div className="mx-5 mt-3 rounded-2xl border border-[#6C63FF]/20 bg-white p-3">
        <div className="flex items-center gap-1 text-[10px] font-bold text-[#6C63FF]">
          <Sparkles className="h-3 w-3" /> BASED ON YOUR WISHLIST
        </div>
        <p className="mt-1 text-[10px] text-neutral-600">
          You'd love the <b>Aura Bookshelf Speaker</b> — same brand, 30% off this week.
        </p>
      </div>
      <TabBar active="wishlist" />
    </div>
  );
}

/* ───────── 13. Cart ───────── */
export function Cart() {
  const items = [
    { n: "Aura Pro ANC", p: 249, g: "linear-gradient(135deg,#6C63FF,#00C2FF)", i: Headphones },
    { n: "Nova Watch", p: 189, g: "linear-gradient(135deg,#7B61FF,#F472B6)", i: Watch },
  ];
  return (
    <div className="relative h-full bg-[#F8FAFC] pb-24">
      <StatusPad />
      <TopBar title="Your Cart" back={false} />
      <div className="space-y-2 px-5">
        {items.map((it) => (
          <div key={it.n} className="flex items-center gap-3 rounded-2xl bg-white p-2.5 shadow-sm">
            <div className="grid h-14 w-14 place-items-center rounded-xl" style={{ backgroundImage: it.g }}>
              <it.i className="h-7 w-7 text-white" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <div className="text-[11px] font-semibold">{it.n}</div>
              <div className="text-xs font-bold">${it.p}</div>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-neutral-100 px-1.5 py-1">
              <Minus className="h-3 w-3" />
              <span className="text-[10px] font-bold">1</span>
              <Plus className="h-3 w-3" />
            </div>
          </div>
        ))}
      </div>

      <div className="mx-5 mt-3 rounded-2xl brand-gradient p-3 text-white">
        <div className="flex items-center gap-1 text-[10px] font-bold">
          <BadgePercent className="h-3 w-3" /> AI COUPON FOUND
        </div>
        <div className="mt-1 text-[11px]">
          Apply <b>SHOPMATE15</b> — save extra $32 on this order.
        </div>
        <button className="mt-2 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-[#6C63FF]">
          Apply now
        </button>
      </div>

      <div className="mx-5 mt-3 rounded-2xl bg-white p-3 shadow-sm">
        <div className="flex justify-between text-[11px] text-neutral-500">
          <span>Subtotal</span><span>$438</span>
        </div>
        <div className="flex justify-between text-[11px] text-neutral-500">
          <span>AI savings</span><span className="text-emerald-600">-$32</span>
        </div>
        <div className="mt-1 flex justify-between text-sm font-bold">
          <span>Total</span><span>$406</span>
        </div>
      </div>

      <div className="absolute inset-x-5 bottom-20">
        <button className="flex w-full items-center justify-center gap-2 rounded-2xl brand-gradient py-3 text-xs font-semibold text-white soft-shadow">
          Checkout <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
      <TabBar active="cart" />
    </div>
  );
}

/* ───────── 14. Checkout ───────── */
export function Checkout() {
  return (
    <div className="relative h-full bg-[#F8FAFC] pb-24">
      <StatusPad />
      <TopBar title="Checkout" />
      <div className="space-y-2.5 px-5">
        <div className="rounded-2xl bg-white p-3 shadow-sm">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-neutral-500">
            <MapPin className="h-3 w-3 text-[#6C63FF]" /> Delivery
          </div>
          <div className="mt-1 text-[11px] font-semibold">Aarav Mehta — Home</div>
          <div className="text-[10px] text-neutral-500">221B Baker Street, Bengaluru 560001</div>
        </div>

        <div className="rounded-2xl bg-white p-3 shadow-sm">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-neutral-500">
            <CreditCard className="h-3 w-3 text-[#6C63FF]" /> Payment
          </div>
          <div className="mt-2 flex items-center justify-between rounded-xl bg-gradient-to-br from-[#111827] to-[#374151] p-3 text-white">
            <div>
              <div className="text-[9px] opacity-70">VISA •••• 4821</div>
              <div className="text-[10px] font-semibold">Aarav M.</div>
            </div>
            <div className="rounded-md bg-white/10 px-2 py-1 text-[9px]">Default</div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-3 shadow-sm">
          <div className="text-[10px] font-bold uppercase text-neutral-500">Order summary</div>
          <div className="mt-1.5 flex justify-between text-[11px]"><span>2 items</span><span>$438</span></div>
          <div className="flex justify-between text-[11px]"><span>Shipping</span><span className="text-emerald-600">Free</span></div>
          <div className="flex justify-between text-[11px]"><span>AI savings</span><span className="text-emerald-600">-$32</span></div>
          <div className="mt-1 flex justify-between text-sm font-bold"><span>Total</span><span>$406</span></div>
        </div>

        <div className="flex items-start gap-2 rounded-2xl border border-[#6C63FF]/20 bg-white p-3">
          <Sparkles className="h-4 w-4 text-[#6C63FF]" />
          <div className="text-[10px] leading-snug">
            <b>AI insight:</b> Pay with VISA Rewards card to earn $8 cashback.
          </div>
        </div>
      </div>
      <div className="absolute inset-x-5 bottom-4">
        <button className="flex w-full items-center justify-center gap-2 rounded-2xl brand-gradient py-3 text-xs font-semibold text-white soft-shadow">
          Place order · $406
        </button>
      </div>
    </div>
  );
}

/* ───────── 15. Order tracking ───────── */
export function Tracking() {
  const steps = [
    { t: "Order placed", d: "10:24 AM", done: true, i: Check },
    { t: "Packed", d: "12:10 PM", done: true, i: Package },
    { t: "Out for delivery", d: "Today, 4 PM", done: true, i: Truck, active: true },
    { t: "Delivered", d: "Today, ~6 PM", done: false, i: Home },
  ];
  return (
    <div className="relative h-full bg-[#F8FAFC] pb-20">
      <StatusPad />
      <TopBar title="Track order" />
      <div className="mx-5 rounded-2xl brand-gradient p-4 text-white soft-shadow">
        <div className="flex items-center gap-2">
          <Truck className="h-5 w-5" />
          <div className="text-[10px] font-semibold uppercase tracking-wide">Arriving today</div>
        </div>
        <div className="mt-1 text-base font-bold">By 6:00 PM</div>
        <div className="text-[10px] opacity-80">#ORD-29481 · 2 items</div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/30">
          <div className="h-full w-3/4 rounded-full bg-white" />
        </div>
      </div>
      <div className="mx-5 mt-4 rounded-2xl bg-white p-4 shadow-sm">
        {steps.map((s, i) => (
          <div key={s.t} className="relative flex gap-3 pb-4 last:pb-0">
            {i !== steps.length - 1 && (
              <span
                className={`absolute left-3.5 top-7 h-full w-px ${
                  s.done ? "bg-[#6C63FF]" : "bg-neutral-200"
                }`}
              />
            )}
            <div
              className={`relative grid h-7 w-7 shrink-0 place-items-center rounded-full ${
                s.done ? "brand-gradient text-white" : "bg-neutral-100 text-neutral-400"
              }`}
            >
              <s.i className="h-3.5 w-3.5" />
              {s.active && <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#6C63FF]/40" />}
            </div>
            <div>
              <div className={`text-[11px] font-semibold ${s.done ? "" : "text-neutral-400"}`}>
                {s.t}
              </div>
              <div className="text-[9px] text-neutral-500">{s.d}</div>
            </div>
          </div>
        ))}
      </div>
      <TabBar active="profile" />
    </div>
  );
}

/* ───────── 16. Profile ───────── */
export function Profile() {
  return (
    <div className="relative h-full bg-[#F8FAFC] pb-20">
      <StatusPad />
      <div className="relative h-32 brand-gradient">
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-2">
          <h2 className="text-xs font-bold text-white">Profile</h2>
          <Cog className="h-4 w-4 text-white" />
        </div>
      </div>
      <div className="-mt-12 px-5">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="grid h-14 w-14 place-items-center rounded-2xl brand-gradient text-sm font-bold text-white">
              AR
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold">Aarav Mehta</div>
              <div className="text-[10px] text-neutral-500">aarav@shopmate.ai</div>
              <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-[#6C63FF]/10 px-2 py-0.5 text-[9px] font-semibold text-[#6C63FF]">
                <Sparkles className="h-2.5 w-2.5" /> Premium
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            {[
              ["42", "Orders"],
              ["18", "Saved"],
              ["$1.2k", "Saved by AI"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-xl bg-[#F8FAFC] py-2">
                <div className="text-xs font-bold brand-text">{n}</div>
                <div className="text-[9px] text-neutral-500">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 rounded-2xl bg-white p-2 shadow-sm">
          {[
            { i: Package, l: "Purchase history", v: "42 orders" },
            { i: Heart, l: "Shopping preferences", v: "Style: Minimal" },
            { i: Sparkles, l: "AI insights", v: "View report" },
            { i: Tag, l: "Coupons & rewards", v: "5 available" },
          ].map((r) => (
            <div key={r.l} className="flex items-center gap-3 px-2 py-2.5">
              <div className="grid h-8 w-8 place-items-center rounded-xl bg-[#6C63FF]/10 text-[#6C63FF]">
                <r.i className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1">
                <div className="text-[11px] font-semibold">{r.l}</div>
                <div className="text-[9px] text-neutral-500">{r.v}</div>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-neutral-400" />
            </div>
          ))}
        </div>
      </div>
      <TabBar active="profile" />
    </div>
  );
}

/* ───────── 17. Settings ───────── */
export function SettingsScreen() {
  type SItem = {
    i: typeof Bell;
    l: string;
    t?: string;
    toggle?: boolean;
    on?: boolean;
  };
  const groups: { h: string; items: SItem[] }[] = [
    {
      h: "Preferences",
      items: [
        { i: Bell, l: "Notifications", t: "Push, email" },
        { i: Moon, l: "Dark mode", toggle: true },
        { i: Sparkles, l: "AI personalization", toggle: true, on: true },
      ],
    },
    {
      h: "Privacy",
      items: [
        { i: Shield, l: "Privacy & data" },
        { i: User, l: "Account security" },
      ],
    },
  ];
  return (
    <div className="relative h-full bg-[#F8FAFC] pb-20">
      <StatusPad />
      <TopBar title="Settings" />
      <div className="space-y-3 px-5">
        {groups.map((g) => (
          <div key={g.h}>
            <div className="px-1 pb-1 text-[10px] font-bold uppercase tracking-wide text-neutral-500">
              {g.h}
            </div>
            <div className="rounded-2xl bg-white p-2 shadow-sm">
              {g.items.map((it) => (
                <div key={it.l} className="flex items-center gap-3 px-2 py-2.5">
                  <div className="grid h-8 w-8 place-items-center rounded-xl bg-[#6C63FF]/10 text-[#6C63FF]">
                    <it.i className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 text-[11px] font-semibold">{it.l}</div>
                  {it.toggle ? (
                    <span
                      className={`flex h-5 w-9 items-center rounded-full p-0.5 ${
                        it.on ? "brand-gradient" : "bg-neutral-200"
                      }`}
                    >
                      <span
                        className={`h-4 w-4 rounded-full bg-white shadow ${
                          it.on ? "ml-auto" : ""
                        }`}
                      />
                    </span>
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5 text-neutral-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        <button className="w-full rounded-2xl bg-white py-3 text-xs font-semibold text-red-500 shadow-sm">
          Log out
        </button>
      </div>
    </div>
  );
}