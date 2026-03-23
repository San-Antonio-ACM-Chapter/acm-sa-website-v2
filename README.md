# ACM San Antonio Website v2

The official website for the Association for Computing Machinery - San Antonio Chapter.

## Table of Contents

- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Docker & Deployment](#docker--deployment)
- [Development Container](#development-container)
- [Code Quality & Formatting](#code-quality--formatting)
- [Events System](#events-system)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Getting Started

### Local Development

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Next.js development server with hot reload |
| `npm run build` | Build the production application (static export) |
| `npm run start` | Start the production server |
| `npm run lint` | Run Biome linter to check code quality |
| `npm run format` | Format code with Biome (auto-fix) |
| `npm test` | Run Jest tests once |
| `npm run test:watch` | Run Jest tests in watch mode |
| `npm run test:coverage` | Run Jest tests with coverage report |

### Additional Biome Commands

```bash
# Check and auto-fix everything (format + lint + organize imports)
npx biome check --write

# Format specific files
npx biome format --write src/components/**/*.tsx

# Lint with detailed output
npx biome lint --verbose
```

## Docker & Deployment

### Production Build

Build and run the production Docker container:

```bash
# Build the Docker image
docker build -t acm-sa-website .

# Run the container
docker run -p 3000:3000 acm-sa-website
```

The production Dockerfile uses a multi-stage build process:
1. **deps**: Installs dependencies
2. **builder**: Builds the Next.js static export
3. **runner**: Serves static files using `serve`

### Docker Architecture

- **Base Image**: Node.js 20 Alpine (lightweight)
- **Output**: Static export (`out/` directory)
- **Server**: `serve` package for static file hosting
- **Port**: 3000 (exposed and configurable)

## Development Container

### Quick Start with Dev Container

The project includes a complete dev container configuration for consistent development environments.

#### VS Code

1. Install the **Dev Containers** extension
2. Open the project in VS Code
3. Press `Cmd+Shift+P` → "Dev Containers: Reopen in Container"
4. Wait for the container to build
5. Dev server starts automatically on port 3000

#### JetBrains IDEs (WebStorm, IntelliJ IDEA)

1. Ensure Docker plugin is enabled
2. Right-click `.devcontainer/docker-compose.yml`
3. Select **Run 'docker-compose.yml'**
4. Attach to the running container via Services panel

#### Manual Docker Compose

```bash
# Start the dev container
cd .devcontainer
docker-compose up --build

# In another terminal, attach to the container
docker-compose exec dev zsh

# Stop the container
docker-compose down
```

### Dev Container Features

- ✅ **Node.js 20** with all dependencies pre-installed
- ✅ **Zsh** with Oh My Zsh for enhanced terminal experience
- ✅ **Hot Reload** - File changes sync automatically
- ✅ **Git & GitHub CLI** pre-configured
- ✅ **Biome Integration** - Format on save enabled
- ✅ **VS Code Extensions** - Biome, Jest, Copilot auto-installed
- ✅ **Port 3000** forwarded for dev server

See `.devcontainer/README.md` for detailed documentation.

## Code Quality & Formatting

This project uses **[Biome](https://biomejs.dev/)** for lightning-fast linting and formatting (25-100x faster than Prettier + ESLint).

### Pre-Commit Workflow

```bash
npm run format    # Auto-format all files
npm run lint      # Check for code quality issues
npm test          # Run tests
```

### What Biome Does

- ✅ **Formatting**: Consistent indentation, quotes, semicolons, line wrapping
- ✅ **Linting**: Catches bugs, enforces best practices, React/Next.js rules
- ✅ **Import Organization**: Auto-sorts and removes unused imports
- ✅ **Performance**: Extremely fast, single-tool solution

### IDE Integration

Biome integrates with all major IDEs:
- **VS Code**: Install the Biome extension
- **WebStorm/IntelliJ**: Built-in support via Biome plugin
- **Format on Save**: Enabled in dev container automatically

See `BIOME_GUIDE.md` for detailed configuration and usage.

## Events System

The website features a robust events management system with JSON-based data storage and Zod validation.

### Adding New Events

1. Open `/public/data/events.json`
2. Add a new event object to the `events` array
3. Follow the schema (see below)
4. Save - validation happens automatically

### Event Schema

#### Required Fields

```json
{
  "id": "unique-event-id",
  "title": "Event Title",
  "description": "Event description",
  "date": "2026-04-15T09:00:00.000Z",
  "location": {
    "venue": "Venue Name"
  }
}
```

#### Optional Fields

- `endDate`: ISO 8601 datetime string
- `location.address`, `location.city`, `location.state`
- `location.isVirtual`: Boolean (default: `false`)
- `location.virtualLink`: URL for virtual events
- `imageUrl`: Path to event image
- `registrationUrl`: Event registration link
- `tags`: Array of strings (e.g., `["workshop", "python"]`)
- `capacity`: Maximum attendees (number)
- `isFeatured`: Highlight event (boolean)
- `organizer`: Organizing entity (default: "ACM San Antonio")

### Example: Adding a Workshop

```json
{
  "id": "python-workshop-june-2026",
  "title": "Python for Beginners Workshop",
  "description": "Learn Python basics in this hands-on workshop.",
  "date": "2026-06-10T14:00:00.000Z",
  "endDate": "2026-06-10T17:00:00.000Z",
  "location": {
    "venue": "Geekdom",
    "address": "131 Soledad St",
    "city": "San Antonio",
    "state": "TX"
  },
  "registrationUrl": "https://example.com/register",
  "tags": ["workshop", "python", "beginner"],
  "capacity": 30,
  "isFeatured": false
}
```

See `EVENTS_README.md` for complete documentation.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) with App Router
- **React**: Version 19 with React Compiler enabled
- **Styling**: CSS Modules
- **3D Graphics**: Three.js with React Three Fiber (@react-three/fiber, @react-three/drei)
- **Type Safety**: TypeScript + Zod schema validation
- **Linting/Formatting**: [Biome](https://biomejs.dev/)
- **Testing**: Jest + React Testing Library
- **Build**: Static export with image optimization disabled
- **Fonts**: Google Fonts (Jockey One, JetBrains Mono)

## Project Structure

```
acm-sa-website-v2/
├── .devcontainer/          # Dev container configuration
│   ├── devcontainer.json   # VS Code dev container settings
│   ├── docker-compose.yml  # Docker Compose for development
│   ├── Dockerfile.dev      # Development Dockerfile
│   └── README.md           # Dev container documentation
├── public/
│   ├── data/
│   │   └── events.json     # Events data (JSON schema)
│   └── *.svg, *.png        # Static assets
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   ├── globals.css     # Global styles
│   │   └── home.module.css # Home page styles
│   ├── components/         # React components
│   │   ├── AboutSection/
│   │   ├── ContactSection/
│   │   ├── EventCard/      # Individual event display
│   │   ├── EventsSection/  # Events list with filters
│   │   ├── Hero/           # Hero section with 3D
│   │   ├── Navigator/      # Navigation bar
│   │   ├── SocialLink/     # Social media links
│   │   └── ThemeToggle/    # Dark/light mode toggle
│   ├── contexts/
│   │   └── ThemeContext.tsx # Theme context provider
│   └── utils/
│       └── session.ts      # Utility functions
├── coverage/               # Test coverage reports
├── Dockerfile              # Production Dockerfile
├── .dockerignore           # Docker ignore patterns
├── biome.json              # Biome configuration
├── jest.config.ts          # Jest configuration
├── jest.setup.ts           # Jest setup file
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
├── BIOME_GUIDE.md          # Biome usage guide
├── EVENTS_README.md        # Events system documentation
└── README.md               # This file
```

### Component Structure

Each component follows this pattern:

```
ComponentName/
├── ComponentName.tsx           # Component implementation
├── ComponentName.module.css    # CSS Module styles
└── __tests__/
    ├── ComponentName.test.tsx  # Jest tests
    └── __snapshots__/          # Jest snapshots
```

## Contributing

This is the official ACM San Antonio website. If you're interested in contributing:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Follow the code style**: Run `npm run format` before committing
4. **Write tests**: Ensure `npm test` passes
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Development Workflow

1. Run `npm run dev` (or use dev container)
2. Make your changes
3. Run `npm run format` to auto-format
4. Run `npm run lint` to check for issues
5. Run `npm test` to ensure tests pass
6. Commit and push

## Learn More

### Documentation

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [React Documentation](https://react.dev) - Learn React
- [Biome Documentation](https://biomejs.dev/) - Code quality tools
- [Three.js Documentation](https://threejs.org/docs/) - 3D graphics
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) - Three.js in React
- [Jest Documentation](https://jestjs.io/docs/getting-started) - Testing framework
- [Zod Documentation](https://zod.dev/) - Schema validation

### Project Resources

- [ACM San Antonio Website](https://acmsa.org)
- [ACM San Antonio GitHub](https://github.com/acm-sa)

---

**Built with ❤️ by ACM San Antonio**

