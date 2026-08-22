export function GET() {
  const client = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT;
  const publisherId = client?.replace(/^ca-/, "");
  const body = publisherId
    ? `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`
    : "# AdSense is not active. Configure NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT after account approval.\n";

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=300",
    },
  });
}
