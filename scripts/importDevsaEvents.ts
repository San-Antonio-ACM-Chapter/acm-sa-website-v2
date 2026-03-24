import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { getDevsaAcmEvents } from "../src/lib/devsaEvents";

const args = new Set(process.argv.slice(2));
const shouldWrite = args.has("--write");
const outputPath = resolve(process.cwd(), "public/data/devsa-acm-events.json");

const run = async () => {
  const events = await getDevsaAcmEvents();
  const payload = {
    source: "https://devsa.community/api/events/feed",
    fetchedAt: new Date().toISOString(),
    events,
  };

  if (shouldWrite) {
    await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
    console.log(`Wrote ${events.length} ACM SA events to ${outputPath}`);
    return;
  }

  console.log(JSON.stringify(payload, null, 2));
};

run().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Unknown error";
  console.error(message);
  process.exitCode = 1;
});
