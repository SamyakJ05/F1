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
  const adsenseClient = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT;
  const isAdSenseConfigured = Boolean(adsenseClient && adsenseClient.startsWith("ca-pub-") && slotId);

  useEffect(() => {
    if (isAdSenseConfigured && adRef.current && typeof window !== "undefined") {
      try {
        const win = window as unknown as { adsbygoogle?: unknown[] };
        win.adsbygoogle = win.adsbygoogle || [];
        win.adsbygoogle.push({});
      } catch {
        // Safe no-op on ad blocker or duplicate pushes
      }
    }
  }, [isAdSenseConfigured, slotId]);

  return (
    <aside
      className={`aa-ad-slot aa-ad-${format} ${className}`}
      aria-label="Sponsorship and editorial support"
    >
      <div className="aa-ad-header">
        <span className="aa-ad-badge">{label}</span>
        <span className="aa-ad-tag">SUPPORTS INDEPENDENT MOTORSPORT JOURNALISM</span>
      </div>

      <div className="aa-ad-container">
        {isAdSenseConfigured ? (
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client={adsenseClient}
            data-ad-slot={slotId}
            data-ad-format={format === "in-article" ? "fluid" : "auto"}
            data-full-width-responsive="true"
          />
        ) : (
          <div className="aa-ad-placeholder">
            <div className="aa-ad-placeholder-content">
              <span className="aa-ad-sponsor-label">APEX ATLAS SPONSOR SPOTLIGHT</span>
              <p>High-performance engineering &amp; motorsport telemetry tools.</p>
              <small>Ad placement active · Compliant with Google AdSense Policies</small>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
