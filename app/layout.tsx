import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  return {
    metadataBase: new URL(origin),
    title: {
      default: "Apex Atlas — Understand the Race",
      template: "%s | Apex Atlas",
    },
    description: "Your authoritative visual briefing for every Grand Prix weekend: live telemetry, circuit guides, tire degradation models, and race strategy.",
    keywords: [
      "Formula 1",
      "Motorsport Telemetry",
      "F1 Race Strategy",
      "Ground Effect Aerodynamics",
      "2026 F1 Regulations",
      "Grand Prix Circuits",
      "Pirelli Tire Degradation",
    ],
    authors: [{ name: "Apex Atlas Editorial Desk", url: "https://apexatlas.online/about" }],
    creator: "Apex Atlas",
    publisher: "Apex Atlas",
    openGraph: {
      title: "Apex Atlas — Understand the Race",
      description: "Visual briefings and telemetry field notes for every race weekend.",
      type: "website",
      url: origin,
      siteName: "Apex Atlas",
      images: [{ url: `${origin}/og-cinematic-v2.png`, width: 1536, height: 1024, alt: "Apex Atlas — Know the Race Before Lights Out" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Apex Atlas — Understand the Race",
      description: "Visual briefings and telemetry field notes for every race weekend.",
      images: [`${origin}/og-cinematic-v2.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseClient = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT || "ca-pub-1497786346597378";

  const siteSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://apexatlas.online/#website",
        url: "https://apexatlas.online",
        name: "Apex Atlas",
        description: "Motorsport field notes, telemetry analytics, and Grand Prix circuit briefings.",
        publisher: {
          "@id": "https://apexatlas.online/#organization",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://apexatlas.online/#organization",
        name: "Apex Atlas",
        url: "https://apexatlas.online",
        logo: {
          "@type": "ImageObject",
          url: "https://apexatlas.online/favicon.svg",
        },
        sameAs: [],
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="google-adsense-account" content={adsenseClient} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
