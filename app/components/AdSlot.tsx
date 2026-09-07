"use client";

import { useEffect, useRef } from "react";

type AdSlotProps = {
  slotId?: string;
  format?: "horizontal" | "rectangle" | "vertical" | "in-article";
  className?: string;
  label?: string;
};

export function AdSlot({
  slotId,
  format = "horizontal",
  className = "",
  label = "ADVERTISEMENT",
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const adsenseClient = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT || "ca-pub-1497786346597378";

  useEffect(() => {
    if (typeof window !== "undefined" && adRef.current) {
      try {
        const win = window as unknown as { adsbygoogle?: unknown[] };
        win.adsbygoogle = win.adsbygoogle || [];
        win.adsbygoogle.push({});
      } catch {
        // Safe no-op on ad blockers or duplicate pushes
      }
    }
  }, [slotId]);

  return (
    <aside
      className={`aa-ad-slot aa-ad-${format} ${className}`}
      aria-label="Advertisement"
      style={{ margin: "1.75rem auto", maxWidth: "100%", overflow: "hidden" }}
    >
      <div
        className="aa-ad-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "4px 8px",
          fontSize: "0.68rem",
          letterSpacing: "0.08em",
          opacity: 0.6,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span className="aa-ad-badge">{label}</span>
      </div>

      <div
        className="aa-ad-container"
        style={{
          minHeight: format === "horizontal" ? "90px" : "250px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255,255,255,0.015)",
        }}
      >
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: "block", width: "100%" }}
          data-ad-client={adsenseClient}
          {...(slotId ? { "data-ad-slot": slotId } : {})}
          data-ad-format={format === "in-article" ? "fluid" : "auto"}
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}
