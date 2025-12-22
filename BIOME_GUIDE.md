# Biome Quick Reference

## Daily Commands

```bash
# Format all files
npm run format

# Check code quality (linting)
npm run lint

# Do both + organize imports
npx biome check --write
```

## Pre-Commit Workflow

```bash
npm run format    # Auto-format
npm run lint      # Check for issues
npm test          # Run tests
```

## What Biome Does

### Formatting ✅
- Consistent indentation (2 spaces)
- Semicolons, quotes, trailing commas
- Line wrapping
- **25-100x faster than Prettier**

### Linting ✅
- Catches bugs before runtime
- Enforces best practices
- React & Next.js specific rules
- Accessibility checks

### Import Organization ✅
- Alphabetically sorted
- Removes unused imports
- Groups by type (external, internal, relative)

## Configuration

Your config is in `biome.json` and already optimized for:
- ✅ Next.js
- ✅ React
- ✅ TypeScript
- ✅ Git integration

## IDE Integration

### WebStorm/IntelliJ
1. Settings → Languages & Frameworks → JavaScript → Biome
2. Enable "Run on save"
3. Enable "Run on Reformat Code"

### VS Code
```bash
code --install-extension biomejs.biome
```

## Why No Prettier?

Biome replaces:
- ❌ Prettier (formatting)
- ❌ ESLint (linting)
- ❌ eslint-config-prettier (conflict resolution)
- ❌ prettier-plugin-organize-imports (import sorting)

**One tool, zero conflicts, blazing fast!**

## Resources

- [Biome Docs](https://biomejs.dev)
- [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)
- [IntelliJ Plugin](https://plugins.jetbrains.com/plugin/22761-biome)

