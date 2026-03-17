# ACM San Antonio Website v2

The official website for the Association for Computing Machinery - San Antonio Chapter.

## Getting Started

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

- `npm run dev` - Start the development server
- `npm run build` - Build the production application
- `npm start` - Start the production server
- `npm run lint` - Run Biome linter
- `npm run format` - Format code with Biome
- `npm test` - Run Jest tests
- `npm run test:watch` - Run Jest tests in watch mode
- `npm run test:coverage` - Run Jest tests with coverage report

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) with React 19
- **Styling**: CSS Modules
- **3D Graphics**: Three.js with React Three Fiber
- **Linting/Formatting**: [Biome](https://biomejs.dev/)
- **Testing**: Jest with React Testing Library
- **Fonts**: Google Fonts (Jockey One, JetBrains Mono)

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Home page
│   └── globals.css   # Global styles
├── components/       # React components
│   ├── Hero/         # Hero section
│   ├── Navigator/    # Navigation bar
│   └── SocialLink/   # Social media links
├── lib/              # Utility functions
└── middleware.ts     # Next.js middleware
```

## Contributing

This is the official ACM San Antonio website. If you're interested in contributing, please reach out to the ACM SA team.

## Learn More

- [ACM San Antonio](https://acmsa.org)
- [Next.js Documentation](https://nextjs.org/docs)
- [Biome Documentation](https://biomejs.dev/)

