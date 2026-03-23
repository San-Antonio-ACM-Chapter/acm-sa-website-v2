# Co-pilot Instructions
## Project: ACM SA Website Rewrite 2026

### General Guidelines:

1. Always use Biome for linting, not ESLint.
2. Use CSS Modules for styling in this project.
3. Follow the existing event schema validation patterns.
4. Use JEST for unit testing. 
5. Always leverage the Next.js MCP Server (`next-devtools-mcp`) tools when available - use `get_errors`, 
   `get_logs`, `get_routes`, `get_page_metadata`, etc. to access live application state and provide better 
   debugging assistance. 
6. Always try to educate the user about documentation around React, Next.js, CSS, TypeScript. (they aren't going to 
   be getting out of this that easily)
7. Always try to use Mozilla's MDN for JavaScript and CSS and HTML documentation.
8. A test of each component should at have at _bare minimum_ one snapshot test.

### Intended file structure:

1. the website (for now) is basically all rendered on one entry page.tsx using next.js and the app router.
2. the components should always be in the `src/components` directory.
3. each component should have its own directory named after the `Component.tsx` file. example( 
   `src/components/CustomButton/CustomButton.tsx`)
4. each component should have it's own set of tests in an associated `__tests__` directory for Jest. example 
   (`src/components/CustomButton/__tests__/CustomButton.test.tsx`)

