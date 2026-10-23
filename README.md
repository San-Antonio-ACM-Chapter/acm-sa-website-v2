# ACM San Antonio Website v2

The official website for the Association for Computing Machinery - San Antonio Chapter.

## Table of Contents

- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
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
| `npm run build` | Build the production application |
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

## Deployment

The site is a static export (`output: "export"` in `next.config.ts`) hosted as a Render static site. `npm run build` writes the site to `out/`.

On every push to `main`, `.github/workflows/render-deploy.yml` runs lint, tests, and a build, then triggers Render's deploy hook. Render builds from `package-lock.json`, so keep it in sync when dependencies change.

Because the site is static, request-time features (route handlers, proxy/middleware) aren't available. `src/proxy.example.ts` is a placeholder for a future auth gate and would require moving off static export to enable.

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

### Verifying the Dev Container is Working

Once the container is running, you should:

1. **Check the terminal output** - You should see Next.js dev server logs
2. **Open http://localhost:3000** - Your app should be running
3. **Make a code change** - Hot reload should update the browser automatically
4. **Run a command** - Try `npm test` in the terminal (executes inside container)

**You can now code normally!** All file changes sync automatically, and your IDE works as expected. The only difference is that Node.js and npm commands run inside the container instead of your local machine.

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

Events come from the ACM SA community feed on [DEVSA](https://www.devsa.community) (`FEED_URL` in `src/lib/devsaEvents.ts`). The feed is fetched at build time so the page ships with events in its HTML, then fetched again in the browser on load so new events show up without a redeploy. `src/lib/devsaFeed.ts` parses the RSS feed into the types in `src/lib/events.ts`.

To add an event, publish it on DEVSA under the ACM SA community. Nothing in this repo needs to change.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) with App Router
- **React**: Version 19 with React Compiler enabled
- **Styling**: CSS Modules
- **Type Safety**: TypeScript
- **Linting/Formatting**: [Biome](https://biomejs.dev/)
- **Testing**: Jest + React Testing Library
- **Build**: Next.js static export with image optimization disabled
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
│   │   ├── Hero/           # Hero section
│   │   ├── Navigator/      # Navigation bar
│   │   ├── SocialLink/     # Social media links
│   │   └── ThemeToggle/    # Dark/light mode toggle
│   ├── contexts/
│   │   └── ThemeContext.tsx # Theme context provider
│   ├── lib/                # DEVSA events feed fetching and parsing
│   └── utils/
│       └── session.ts      # Utility functions
├── coverage/               # Test coverage reports
├── .dockerignore           # Docker ignore patterns (dev container)
├── biome.json              # Biome configuration
├── jest.config.ts          # Jest configuration
├── jest.setup.ts           # Jest setup file
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
├── BIOME_GUIDE.md          # Biome usage guide
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
- [Jest Documentation](https://jestjs.io/docs/getting-started) - Testing framework

### Project Resources

- [ACM San Antonio Website](https://acmsa.org)
- [ACM San Antonio GitHub](https://github.com/acm-sa)

---

**Built with ❤️ by ACM San Antonio**
