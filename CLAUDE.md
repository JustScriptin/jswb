# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

### Development

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # TypeScript validation
npm run format       # Check Prettier formatting
npm run format:write # Fix formatting issues
npm run fix          # Fix both formatting and lint issues
npm run check        # Run lint, type-check, and tests (use before commits)
```

### Testing

```bash
npm test             # Run all tests
npm test [file]      # Run specific test file
```

## Architecture Overview

### Core Application Structure

This is a Next.js 15 interactive coding exercise platform that uses:

- **App Router** with route groups for organization
- **MDX-based content** for exercises stored in `/content/exercises/`
- **Isolated VM execution** for secure code testing
- **Container/Presenter pattern** for component architecture
- **Server-side MDX compilation** for performance

### Key Architectural Patterns

1. **Route Groups**:

   - `(home)` - Landing page
   - `(exercises)` - Core learning experience
   - `(api)` - API endpoints
   - `(design-system)` - Component showcase

2. **Exercise System Flow**:

   - MDX files → Content Service → Server Compilation → Client Display
   - User Code → API → TypeScript Transpilation → Isolated VM → Test Results

3. **Component Architecture**:

   - **Containers**: State management, API calls, business logic (`*Container.tsx`)
   - **Presenters**: Pure presentation, receive props (`*Presenter.tsx`)
   - **UI Components**: Atomic, reusable components (`*UI.tsx`)

4. **Test Execution Security**:

   - Uses `isolated-vm` with memory limits (default 8MB)
   - No access to Node.js APIs or filesystem
   - Sandboxed environment for each test run

5. **Platform Abstraction** (`/src/platform/`):
   - Separates browser and Node.js specific code
   - Unified interfaces for logging and storage

## Development Guidelines

### Code Style Requirements

- TypeScript with strict typing
- React 19 with Next.js 15 patterns
- Tailwind CSS v4 with design tokens
- Follow existing Container/Presenter patterns
- Use Server Components by default (add `"use client"` only when needed)
- Named exports only (no default exports except Next.js special files)
- Prefer `type` over `interface`
- No `any` types
- Use absolute imports (`@/...`)

### ESLint Boundaries

The project uses `eslint-plugin-boundaries` to enforce layered architecture. Respect import boundaries between features and shared modules.

### Before Committing

Always run `npm run check` to ensure:

- ESLint passes
- TypeScript types are valid
- All tests pass

### Environment Variables

- `ISOLATE_MEMORY_MB` - Memory limit for isolated VM (defaults to 8)

## MDX Content Structure

Exercise MDX files include:

- Frontmatter with metadata
- Structured sections for description, education, starter code, and test cases
- See `/docs/MDX_CONTENT_GUIDE.md` for detailed formatting requirements

## Key Services and Hooks

- `useExerciseState` - Exercise progress management
- `useTestRunnerV2` - Test execution coordination
- `exerciseContentService` - MDX content loading
- `runIsolatedTests` - Secure test execution
