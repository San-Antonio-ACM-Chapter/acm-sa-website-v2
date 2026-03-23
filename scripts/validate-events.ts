/**
 * Script to validate events.json
 * Run with: npx ts-node scripts/validate-events.ts
 */

import * as fs from "fs";
import * as path from "path";
import { validateEvents } from "@/lib/eventSchema";

const EVENTS_FILE = path.join(process.cwd(), "public", "data", "events.json");

function validateEventsFile() {
  console.log("🔍 Validating events.json...\n");

  try {
    // Read the events file
    const fileContents = fs.readFileSync(EVENTS_FILE, "utf8");
    const data = JSON.parse(fileContents);

    // Validate using Zod schema
    const validatedData = validateEvents(data);

    console.log("✅ Validation successful!");
    console.log(`\n📊 Summary:`);
    console.log(`   - Total events: ${validatedData.events.length}`);

    const featured = validatedData.events.filter((e) => e.isFeatured).length;
    console.log(`   - Featured events: ${featured}`);

    const virtual = validatedData.events.filter(
      (e) => e.location.isVirtual,
    ).length;
    console.log(`   - Virtual events: ${virtual}`);

    const withRegistration = validatedData.events.filter(
      (e) => e.registrationUrl,
    ).length;
    console.log(`   - With registration: ${withRegistration}`);

    console.log("\n📅 Events:");
    for (const event of validatedData.events) {
      const date = new Date(event.date).toLocaleDateString();
      const featured = event.isFeatured ? "⭐" : "  ";
      const virtual = event.location.isVirtual ? "🌐" : "📍";
      console.log(`   ${featured} ${virtual} ${event.title} (${date})`);
    }

    console.log("\n✨ All events are valid!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Validation failed!");
    console.error("\nError details:");
    console.error(error);
    process.exit(1);
  }
}

validateEventsFile();
