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
    title: "Apex Atlas — Understand the Race",
    description: "Your five-minute visual briefing for every race weekend: sessions, circuits, championship context and strategy.",
    openGraph: {
      title: "Apex Atlas — Understand the Race",
      description: "The five-minute visual briefing for every race weekend.",
      type: "website",
      images: [{ url: `${origin}/og-cinematic-v2.png`, width: 1536, height: 1024, alt: "Apex Atlas — Know the Race Before Lights Out" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Apex Atlas — Understand the Race",
      description: "The five-minute visual briefing for every race weekend.",
      images: [`${origin}/og-cinematic-v2.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseClient = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT;
  return (
    <html lang="en">
      <head>
        {adsenseClient ? (
          <>
            <meta name="google-adsense-account" content={adsenseClient} />
            <script async crossOrigin="anonymous" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`} />
          </>
        ) : null}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
