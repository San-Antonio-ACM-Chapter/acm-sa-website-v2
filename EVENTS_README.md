# Events System Documentation

This document describes the events management system for the ACM SA website.

## Overview

The events system uses a JSON-based schema with Zod validation to manage and display events. This provides type-safety and ensures data integrity while keeping the system simple and maintainable.

## Architecture

### Components

1. **Event Schema** (`src/lib/eventSchema.ts`)
   - Defines the Zod schemas for events validation
   - Exports TypeScript types for type-safety
   - Provides validation functions

2. **Event Loader** (`src/lib/eventLoader.ts`)
   - Functions to load and parse events from JSON
   - Utility functions for filtering events
   - Both client-side and server-side loading support

3. **EventCard Component** (`src/components/EventCard/`)
   - Displays individual event information as a clickable link to the event's Meetup page
   - Responsive design with mobile support
   - Shows featured badge, tags, and event details
   - Entire card acts as a navigation button/link to meetupLink

4. **EventsSection Component** (`src/components/EventsSection/`)
   - Main events display section
   - Filter between upcoming and all events
   - Loading and error states

### Data Storage

Events are stored in `/public/data/events.json` and must follow this schema:

```json
{
  "events": [
    {
      "id": "unique-event-id",
      "title": "Event Title",
      "description": "Event description",
      "date": "2026-04-15T09:00:00.000Z",
      "endDate": "2026-04-16T18:00:00.000Z",
      "location": {
        "venue": "Venue Name",
        "address": "Street Address",
        "city": "San Antonio",
        "state": "TX",
        "isVirtual": false,
        "virtualLink": "https://zoom.us/j/example"
      },
      "imageUrl": "/events/image.jpg",
      "meetupLink": "https://www.meetup.com/acm-sa/events/unique-event-id",
      "tags": ["tag1", "tag2"],
      "capacity": 100,
      "isFeatured": true,
      "organizer": "ACM San Antonio"
    }
  ]
}
```

## Event Schema

### Required Fields

- `id` (string): Unique identifier for the event
- `title` (string): Event title
- `description` (string): Event description
- `date` (string): ISO 8601 datetime string for event start
- `meetupLink` (string): URL to the event's Meetup.com page
- `location` (object): Event location details
  - `venue` (string): Venue name

### Optional Fields

- `endDate` (string): ISO 8601 datetime string for event end
- `location.address` (string): Street address
- `location.city` (string): City (defaults to "San Antonio")
- `location.state` (string): State (defaults to "TX")
- `location.isVirtual` (boolean): Whether the event is virtual (defaults to false)
- `location.virtualLink` (string): URL for virtual event
- `imageUrl` (string): Path to event image
- `tags` (array): Array of tag strings
- `capacity` (number): Maximum number of attendees
- `isFeatured` (boolean): Whether to feature the event (defaults to false)
- `organizer` (string): Organizing entity (defaults to "ACM San Antonio")

## Adding New Events

1. Open `/public/data/events.json`
2. Add a new event object to the `events` array
3. Ensure all required fields are present
4. Use ISO 8601 format for dates (e.g., `2026-04-15T09:00:00.000Z`)
5. Save the file - the schema will automatically validate on page load

### Example: Adding a Workshop

```json
{
  "id": "python-workshop-june-2026",
  "title": "Python for Beginners Workshop",
  "description": "Learn Python basics in this hands-on workshop. Perfect for beginners!",
  "date": "2026-06-10T14:00:00.000Z",
  "endDate": "2026-06-10T17:00:00.000Z",
  "location": {
    "venue": "Geekdom",
    "address": "131 Soledad St",
    "city": "San Antonio",
    "state": "TX",
    "isVirtual": false
  },
  "meetupLink": "https://www.meetup.com/acm-sa/events/python-workshop-june-2026",
  "tags": ["workshop", "python", "beginner"],
  "capacity": 30,
  "isFeatured": false,
  "organizer": "ACM San Antonio"
}
```

## Validation

The system automatically validates events data using Zod schemas:

- Type checking for all fields
- URL validation for links
- Date format validation (ISO 8601)
- Required field enforcement

If validation fails, the error will be logged to the console and displayed to users.

## Utility Functions

### Event Filtering

```typescript
import { getUpcomingEvents, getPastEvents, getFeaturedEvents } from "@/lib/eventLoader";

// Get only upcoming events
const upcoming = getUpcomingEvents(events);

// Get only past events
const past = getPastEvents(events);

// Get only featured events
const featured = getFeaturedEvents(events);
```

### Loading Events

```typescript
import { loadEvents } from "@/lib/eventLoader";

// Client-side loading
const events = await loadEvents();

// Server-side loading
import { loadEventsServer } from "@/lib/eventLoader";
const events = await loadEventsServer();
```

## Future Enhancements

Consider implementing:

1. **CMS Integration**: Connect to a headless CMS for easier event management
2. **Calendar Export**: Add iCal/Google Calendar export functionality
3. **RSVP System**: Build an integrated registration system
4. **Image Management**: Add proper image handling and optimization
5. **Search/Filter**: Add search and advanced filtering capabilities
6. **Categories**: Organize events by categories
7. **Recurring Events**: Support for recurring event patterns
8. **Email Notifications**: Notify members of upcoming events

## Testing

The schema validation ensures:
- All events have required fields
- Dates are in valid ISO 8601 format
- URLs are properly formatted
- Data types are correct

To validate manually:

```typescript
import { validateEvents } from "@/lib/eventSchema";

try {
  const validated = validateEvents(rawData);
  console.log("Valid events:", validated);
} catch (error) {
  console.error("Validation error:", error);
}
```

## Troubleshooting

### Common Issues

1. **Events not showing**: Check browser console for validation errors
2. **Invalid date format**: Ensure dates are in ISO 8601 format
3. **Broken images**: Verify image paths are correct and files exist in `/public`
4. **Validation errors**: Review the schema and ensure all required fields are present

### Date Format Examples

- Single point in time: `"2026-04-15T14:00:00.000Z"`
- With timezone: `"2026-04-15T14:00:00-05:00"` (CST)
- UTC time: `"2026-04-15T19:00:00.000Z"` (always use Z for UTC)

