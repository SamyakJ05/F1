export function GET() {
  const client = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT || "ca-pub-1497786346597378";
  const publisherId = client.replace(/^ca-/, "");
  const body = `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=300",
    },
  });
}
