import handler from "vinext/server/app-router-entry";

const worker = {
  async fetch(request: Request, env: Record<string, unknown>, ctx: { waitUntil?: (p: Promise<unknown>) => void }) {
    return handler.fetch(request, env, ctx);
  },
};

export default worker;
