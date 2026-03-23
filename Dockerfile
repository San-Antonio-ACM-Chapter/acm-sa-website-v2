# ACM SA Website V2 - Multi-stage Dockerfile
# This Dockerfile builds and serves the Next.js static export

# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Stage 3: Runner (Static file server)
FROM node:20-alpine AS runner
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Install serve for static file hosting
RUN npm install -g serve

# Copy the static export output
COPY --from=builder /app/out ./out

# Copy public assets
COPY --from=builder /app/public ./public

# Expose port 3000
EXPOSE 3000

# Serve the static files
CMD ["serve", "-s", "out", "-l", "3000"]

