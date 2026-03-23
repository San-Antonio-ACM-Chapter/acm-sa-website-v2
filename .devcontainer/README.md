# Development Container Setup

This project includes a dev container configuration for a consistent development environment.

## Prerequisites

- **Docker Desktop** installed and running
- **VS Code** with the "Dev Containers" extension installed (for VS Code users)
- **JetBrains IDE** with Docker plugin (for JetBrains users)

## Using the Dev Container

### VS Code

1. Open the project in VS Code
2. Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux)
3. Select "Dev Containers: Reopen in Container"
4. Wait for the container to build and start
5. The dev server will start automatically on port 3000

### JetBrains IDEs (WebStorm, IntelliJ IDEA, etc.)

1. Open the project
2. Go to **Settings/Preferences** → **Build, Execution, Deployment** → **Docker**
3. Configure Docker connection
4. Right-click on `.devcontainer/docker-compose.yml`
5. Select **Run 'docker-compose.yml'**
6. Attach to the running container via the Services panel

### Manual Docker Compose

```bash
# Build and start the dev container
cd .devcontainer
docker-compose up --build

# In another terminal, attach to the container
docker-compose exec dev zsh

# Stop the container
docker-compose down
```

## What's Included

- **Node.js 20** Alpine Linux
- **Zsh** shell with Oh My Zsh
- **Git** and **GitHub CLI**
- All project dependencies pre-installed
- Biome formatter and linter configured
- Port 3000 forwarded for dev server

## Features

- **Hot Reload**: File changes sync automatically with volume mounts
- **Persistent node_modules**: Optimized with volume for faster rebuilds
- **Auto-install**: Dependencies install automatically on container creation
- **Biome Integration**: Auto-formatting on save
- **Jest Integration**: Run tests inside the container

## Running Commands

Inside the dev container, you can run any npm script:

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run lint         # Run Biome linter
npm run format       # Format code with Biome
```

## Troubleshooting

### Port 3000 already in use
Stop any local Next.js dev servers running outside the container.

### Changes not reflecting
Ensure volume mounts are working correctly. Restart the container if needed.

### node_modules issues
Delete the local `node_modules` folder and rebuild the container:
```bash
rm -rf node_modules
docker-compose down -v
docker-compose up --build
```

