const OPEN_F1_SESSIONS = "https://api.openf1.org/v1/sessions?year=2026";
const JOLPICA_STANDINGS = "https://api.jolpi.ca/ergast/f1/2026/driverstandings.json?limit=5";

type OpenF1Session = {
  session_key: number;
  meeting_key: number;
  session_name: string;
  date_start: string;
  date_end: string;
  circuit_short_name: string;
  country_name: string;
  location: string;
  is_cancelled: boolean;
};

export async function GET() {
  try {
    const [sessionsResponse, standingsResponse] = await Promise.all([
      fetch(OPEN_F1_SESSIONS, { headers: { accept: "application/json" } }),
      fetch(JOLPICA_STANDINGS, { headers: { accept: "application/json" } }),
    ]);
    if (!sessionsResponse.ok || !standingsResponse.ok) throw new Error("Upstream motorsport data unavailable");

    const sessions = await sessionsResponse.json() as OpenF1Session[];
    const standingsPayload = await standingsResponse.json() as any;
    const now = Date.now();
    const activeOrFuture = sessions
      .filter((session) => !session.is_cancelled && Date.parse(session.date_end) >= now)
      .sort((a, b) => Date.parse(a.date_start) - Date.parse(b.date_start));
    const focus = activeOrFuture[0];
    if (!focus) throw new Error("No remaining sessions found");

    const meetingSessions = sessions
      .filter((session) => session.meeting_key === focus.meeting_key && !session.is_cancelled)
      .sort((a, b) => Date.parse(a.date_start) - Date.parse(b.date_start))
      .map((session) => ({ name: session.session_name, startsAt: session.date_start, endsAt: session.date_end }));

    const rawStandings = standingsPayload?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings ?? [];
    const standings = rawStandings.map((entry: any) => ({
      position: Number(entry.position),
      code: entry.Driver.code,
      name: `${entry.Driver.givenName} ${entry.Driver.familyName}`,
      team: entry.Constructors?.[0]?.name ?? "Independent",
      points: Number(entry.points),
      wins: Number(entry.wins),
    }));

    return Response.json({
      meeting: {
        country: focus.country_name,
        location: focus.location,
        circuit: focus.circuit_short_name,
      },
      sessions: meetingSessions,
      standings,
      updatedAt: new Date().toISOString(),
      sources: { sessions: "https://openf1.org/", standings: "https://api.jolpi.ca/ergast/f1/" },
    }, { headers: { "cache-control": "public, max-age=300, s-maxage=300" } });
  } catch {
    return Response.json({ error: "Live race-weekend data is temporarily unavailable." }, { status: 503, headers: { "cache-control": "no-store" } });
  }
}
