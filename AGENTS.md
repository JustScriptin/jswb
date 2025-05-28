Below are the guidelines, now incorporating the patterns, rules, and notable findings from the repository:

---

## Overview

You’re working with:

- **TypeScript 5+**
- **React 19**
- **Next.js 15 App Router**
- **Tailwind CSS Version 4**
- **Shadcn UI**
- **Zod**
- **Framer Motion**
- **Eslint 9 & eslint-plugin-boundaries** (for layered import boundaries)

---

## Project Guidelines

1. **Use Next.js 15 App Router** architecture.

   - Leverage Next.js route groupings (`(auth)`, `(dashboard)`, etc.) for logical separation and improved code organization.

2. **Implement Shadcn UI** components for a consistent design.

   - Follow the Shadcn (or similar) pattern of minimal, composable UI primitives and the `class-variance-authority` (`cva`) approach.

3. Follow **Tailwind V4 CSS best practices**.

   - Use custom CSS variables (e.g., `--brand-hue`, `--background`) mapped into Tailwind tokens.
   - Keep theming consistent and prefer design tokens for reusability.

4. **Optimize** your code for maintainability and readability.

   - Distinguish between **shared** vs. **feature-specific** modules.
   - Keep logic easy to follow with small, composable functions.

5. **Avoid global state** unless absolutely necessary.

   - Rely on `useUser`, `useToast`, etc. for feature-level state or caching.
   - **Ask** if you’re unsure about local vs. global state.

6. **Stick to existing folder conventions** already in the project.

7. **Respect ESLint boundaries** (`eslint-plugin-boundaries`).

   Follow these steps locally before pushing code.

---

## When Generating Components

1. **Decide if it’s purely presentational** or has complex logic/state/data fetching.

   - **Purely presentational:** Single component in `ui/` or `components/ui`.
   - **Complex logic:** Split into a container (`containers/`) + presenter (`ui/`) pattern.
     - e.g. `MFAForm.tsx` vs. `MFAFormPresenter.tsx`.

2. **Use Server Components** by default.

   - Add `"use client"` only if truly needed for client-side hooks/effects.

3. **Add `"use client"`** only if truly needed.

   - For example, if using `useState`, `useEffect`, or custom client hooks.

4. **Follow Shadcn UI** component patterns.

   - Leverage Radix UI primitives, `cva`, and Tailwind for styling.

5. **Implement responsive design** via Tailwind.

   - Use custom media queries or Tailwind breakpoints (`md:`, `lg:`, etc.) as needed.

6. **File structure order**:

   1. **types**
   2. **constants**
   3. **helpers**
   4. **hooks**
   5. **subcomponents**
   6. **main component**

   Keep them physically grouped in the file.

7. **Utilize the App Router** for nested routing & layouts.

   - Make use of Next.js route grouping `(auth)`, `(dashboard)`, etc.

8. **Use Next.js 15**.

   - Keep up to date with any Next.js version-specific features.

9. **Use your best judgment**.

   - If there’s a pattern or code style that aligns better with existing code, follow it.

10. Watch out for **namespaced/special Next.js files** (`loading.tsx`, `page.tsx`, `layout.tsx`, `error.tsx`, etc.).

    - These have special behavior; keep them minimal and consistent with Next.js best practices.

11. **Don’t conflict with React 19** paradigms.

    - e.g. React 19 has a new compiler that might handle optimization (reduces the need for `useCallback`, `useMemo` in many cases).

12. **Favor Next.js approaches** over React ones if there’s a conflict.

    - i.e. prefer Next.js data-fetching or Server Actions if you can.

13. **Colocate Zod validations with TS types only if runtime validation is needed** (e.g., forms).
    - Skip Zod if it’s purely presentational and doesn’t need runtime checks.

---

## Code Style

- **Prefer `type` aliases** over `interface`.
- Keep code **clean** and **readable**.
- Use **meaningful** variable/function names (e.g., `isLoading`, `hasError`).
- **Avoid `enum`s**—use `const` objects with `"as const"`.
- Keep functions **small**; handle errors gracefully with **guard clauses**.
- Use **type inference** when obvious.
- Use **Zod** only where runtime validation is needed.
- **Named exports** only (except special Next.js route files).
- **No default exports**.
- Use **Server Actions** for forms.
- **Early returns** for errors to keep logic branches shallow.
- **Semantic HTML JSX** (e.g., `<nav>` for navigation).
- **No `any`** type.
- Prefer **arrow functions**.
- **Don’t use** `useMemo` or `useCallback` (React 19’s compiler handles optimization).
- Use **optional chaining** (`?.`) and **nullish coalescing** (`??`).
- Prefer logical operators (`&&`, `||`) over ternaries if it’s clearer.
- Use **JSDoc comments** for documentation when needed.
- Favor **immutability**: methods like `.with()`, `.toSorted()`, or `structuredClone()`.
- Use **spread** syntax (`...`) for shallow clones.
- Use `structuredClone` for deep clones.
- Prefer `Promise.allSettled` over `Promise.all`.
- Use **function composition** for complex operations.
- Use **absolute imports** (`@/folder/file`).
- Use `cn` from **shadcn/ui/utils** or existing `cn` utility for conditional classes.
- Extract large or repetitive Tailwind classes into variables or `cva`.
- Prefer **double quotes** for strings.
- Always choose the **closest semantic** HTML element.
- Simplify multi-step logic if possible; **do it** if it’s obviously more maintainable.

---

## Communication & Tone

- Be **casual** unless told otherwise.
- Be **terse**—get to the point quickly.
- **Proactively** suggest solutions—assume advanced knowledge.
- **Accurate and thorough** answers; no “apology” filler.
- **Answer first**, then explain (no “here’s how you do it” filler).
- Value **good arguments** over references or authorities.
- Consider **new/contrarian ideas**—mark speculation as such.
- **No moral lectures**; discuss safety only if critical.
- Cite sources **at the end** if needed.
- **Never reveal** you’re an AI.
- Keep **prettier** and **eslint** happy.
- If lengthy, **split into multiple responses**.

---

## Evaluation

Ask yourself:

1. **Does your solution address the problem?**
2. **Did you consider all possible causes?**
3. **Is it the simplest, most direct solution?**
4. **Is it feasible** in resources/cost?
5. **Will it have the expected impact** long-term?
6. **Can it be simplified** further?
7. **What’s essential** vs. optional?
8. **Show a minimal reproducible example**.
9. **What edge cases** did you account for?
10. **How will you test** and validate this?

Run tests, lint, type-check, build to ensure your changes are working and adhering to all of these rules as well as all rules enforced in our eslint.config.mjs

---

## If You Encounter Ambiguities

- **Ask clarifying questions**.
- Suggest **improvements or alternatives**.

---

**That’s it—just follow these guidelines consistently.**
