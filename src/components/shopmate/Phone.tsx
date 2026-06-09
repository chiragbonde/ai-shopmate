import type { ReactNode } from "react";

export function Phone({
  children,
  label,
  number,
  tone = "light",
}: {
  children: ReactNode;
  label: string;
  number: string;
  tone?: "light" | "dark" | "gradient";
}) {
  const bg =
    tone === "dark"
      ? "bg-[#0b0b1a] text-white"
      : tone === "gradient"
        ? "brand-gradient text-white"
        : "bg-[#F8FAFC] text-[#111827]";
  return (
    <figure className="flex flex-col items-center gap-4">
      <div className="relative">
        {/* Phone frame */}
        <div className="phone-shadow rounded-[44px] bg-neutral-900 p-[6px]">
          <div className="rounded-[40px] bg-neutral-950 p-[3px]">
            <div className={`relative h-[640px] w-[300px] overflow-hidden rounded-[37px] ${bg}`}>
              {/* Notch */}
              <div className="absolute left-1/2 top-2 z-30 flex h-6 w-28 -translate-x-1/2 items-center justify-end rounded-full bg-black px-3">
                <div className="h-2 w-2 rounded-full bg-neutral-800" />
              </div>
              {/* Status bar */}
              <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 pt-3 text-[10px] font-semibold">
                <span>9:41</span>
                <span className="flex items-center gap-1 opacity-80">
                  <span>●●●</span>
                  <span>􀙇</span>
                </span>
              </div>
              <div className="absolute inset-0 overflow-hidden">{children}</div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="text-center">
        <div className="text-xs font-medium text-[#6C63FF]">{number}</div>
        <div className="font-display text-sm font-semibold text-[#111827]">{label}</div>
      </figcaption>
    </figure>
  );
}

export function StatusPad({ children }: { children?: ReactNode }) {
  return <div className="pt-9">{children}</div>;
}
