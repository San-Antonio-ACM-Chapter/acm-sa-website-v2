/**
 * Script to validate events.json
 * Run with: node scripts/validate-events.js
 */

const fs = require("fs");
const path = require("path");
const { z } = require("zod");

const EVENTS_FILE = path.join(process.cwd(), "public", "data", "events.json");

// Define schemas inline
const EventLocationSchema = z.object({
  venue: z.string().min(1),
  address: z.string().optional(),
  city: z.string().default("San Antonio"),
  state: z.string().default("TX"),
  isVirtual: z.boolean().default(false),
  virtualLink: z.string().url().optional(),
});

const EventSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  location: EventLocationSchema,
  imageUrl: z.string().optional(),
  registrationUrl: z.string().url().optional(),
  tags: z.array(z.string()).default([]),
  capacity: z.number().positive().optional(),
  isFeatured: z.boolean().default(false),
  organizer: z.string().default("ACM San Antonio"),
});

const EventsCollectionSchema = z.object({
  events: z.array(EventSchema),
});

function validateEventsFile() {
  console.log("🔍 Validating events.json...\n");

  try {
    // Read the events file
    const fileContents = fs.readFileSync(EVENTS_FILE, "utf8");
    const data = JSON.parse(fileContents);

    // Validate using Zod schema
    const validatedData = EventsCollectionSchema.parse(data);

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
