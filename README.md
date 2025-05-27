# Getting Started

1. Install dependencies:

   ```bash
   npm i
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000/exercises](http://localhost:3000/exercises) in your browser

## Directory Layout

```
src/
  app/            # Next.js routes and layouts
  components/     # Shared UI components
  features/       # Feature-specific modules
  hooks/          # Reusable hooks
  lib/            # Utilities like logger
content/
  exercises/      # MDX files for exercise content
tests/            # Jest tests
docs/             # Documentation
```

## Content Management

Exercise content is managed through MDX files in `content/exercises/`. See [MDX Content Guide](docs/MDX_CONTENT_GUIDE.md) for details on:

- Creating new exercises
- MDX file structure
- Formatting requirements
- Common issues and solutions

## Useful Commands

```bash
npm run lint        # eslint
npm run type-check  # TypeScript validation
npm test            # run tests
npm run format:write # fix formatting
npm run fix         # fix formatting and lint errors
```

### Environment Variables

`ISOLATE_MEMORY_MB` – memory limit in megabytes for the isolated-vm sandbox (defaults to `8`).

## Contributing

1. Create a new branch off `main`.
2. Run `npm run check` before committing to ensure lint, types and tests pass.
3. Submit a pull request describing your changes.
