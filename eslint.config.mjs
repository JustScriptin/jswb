/**
 * eslint.config.mjs – Next 15 + TypeScript strict‑boundaries
 * – zero per‑team edits, passes `next lint`
 */

import { FlatCompat } from "@eslint/eslintrc";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import nextPlugin from "@next/eslint-plugin-next";
import importPlugin from "eslint-plugin-import";
import boundaries from "eslint-plugin-boundaries";

/* ───────── helpers / constants ───────── */
const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const SRC = "src";
const ctxDir = `${SRC}/app/\\([^/]+\\)`;                       // any <route‑group>
const nextFiles = "{page,layout,template,error,loading,not-found,route}.{js,jsx,ts,tsx}";
const assets = "{png,jpg,jpeg,svg,ico,webp,avif}";

/* Boundaries element types with captures for more granular control */
const E = [
  { type: "core", pattern: `${ctxDir}/_core/**`, capture: ["context"] },
  { type: "ctx-share", pattern: `${ctxDir}/_shared/**`, capture: ["context"] },
  { type: "helpers", pattern: `${ctxDir}/**/helpers/**`, capture: ["context"] },
  { type: "ui", pattern: `${ctxDir}/**/{components,hooks}/**`, capture: ["context"] },

  /* route entries + nested catch‑alls */
  { type: "entry", pattern: `${ctxDir}/**/${nextFiles}`, mode: "file", capture: ["context"] },
  { type: "entry", pattern: `${ctxDir}/**/*/${nextFiles}`, mode: "file", capture: ["context"] },
  { type: "root", pattern: `${SRC}/app/${nextFiles}`, mode: "file" },

  { type: "static", pattern: `${SRC}/app/**/*.${assets}` },

  { type: "shared", pattern: `${SRC}/shared/**` },
  { type: "platform", pattern: `${SRC}/platform/**` },
  { type: "tests", pattern: `${SRC}/{tests,**/__tests__}/**` },
];

/* ───────── config ───────── */
export default [
  /* Next "core‑web‑vitals" base‑preset */
  ...compat.config({ extends: ["next/core-web-vitals"] }),

  /* TypeScript strict type-checked configuration */
  {
    files: [`${SRC}/**/*.{ts,tsx,mts,cts}`],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs["strict-type-checked"].rules,
      ...tsPlugin.configs["stylistic-type-checked"].rules,
      
      /* TypeScript specific overrides */
      "@typescript-eslint/no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      }],
      "@typescript-eslint/consistent-type-imports": ["error", {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      }],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/no-misused-promises": ["error", {
        checksVoidReturn: false,
      }],
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
    },
  },

  /* Disable type-checked rules for JavaScript files */
  {
    files: [`${SRC}/**/*.{js,jsx,mjs,cjs}`],
    rules: {
      ...tsPlugin.configs["disable-type-checked"].rules,
    },
  },

  /* Main configuration for all source files */
  {
    files: [`${SRC}/**/*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}`],
    ignores: ["node_modules", ".next", "dist", "build"],

    plugins: {
      next: nextPlugin,
      import: importPlugin,
      boundaries,
    },

    settings: {
      react: { version: "detect" },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs", ".mts", ".cts"],
        },
        typescript: { 
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
        alias: {
          map: [
            ["@", "./src"],
            ["@/components/ui/*", "./src/shared/components/ui/*"], // legacy UI alias
          ],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx", ".mts", ".cts"],
      },
      "import/external-module-folders": ["node_modules", "node_modules/@types"],
      "boundaries/elements": E,
      "boundaries/ignore": ["\\.(png|jpe?g|svg|ico|webp|avif)$"],
      tailwindcss: {
        callees: ["classnames", "clsx", "cn", "cva", "tv"],
        config: "tailwind.config.ts",
        cssFiles: [
          "**/*.css",
          "!**/node_modules",
          "!**/.*",
          "!**/dist",
          "!**/build",
        ],
        classRegex: "^(class|className)$",
      },
    },

    rules: {
      /* Import plugin optimizations */
      "import/no-unresolved": "error",
      "import/named": "off", // TypeScript handles this
      "import/namespace": "off", // TypeScript handles this
      "import/default": "off", // TypeScript handles this
      "import/export": "error",
      "import/no-named-as-default": "warn",
      "import/no-named-as-default-member": "warn",
      "import/no-duplicates": "error",
      "import/no-extraneous-dependencies": ["error", {
        devDependencies: [
          "**/*.test.{ts,tsx}",
          "**/*.spec.{ts,tsx}",
          "**/__tests__/**",
          "**/test/**",
        ],
      }],


      /* boundaries matrix with enhanced rules */
      "boundaries/element-types": ["error", {
        default: "disallow",
        rules: [
          { 
            from: ["entry", "root"], 
            allow: ["helpers", "ui", "ctx-share", "core", "shared", "platform"],
            message: "${file.type} files can only import from allowed layers, not ${dependency.type}"
          },
          { 
            from: "ui", 
            allow: ["helpers", "ctx-share", "shared", "platform", "ui"],
            message: "UI components should not import from ${dependency.type}"
          },
          { 
            from: "helpers", 
            allow: ["core", "shared", "platform", "helpers"],
            message: "Helper functions should not depend on ${dependency.type}"
          },
          { 
            from: "ctx-share", 
            allow: ["helpers", "shared", "platform"],
            message: "Context-shared modules should not import from ${dependency.type}"
          },
          { 
            from: "core", 
            allow: ["shared", "platform"],
            message: "Core modules should only depend on shared utilities and platform code"
          },
          { 
            from: "shared", 
            allow: ["platform"],
            message: "Shared modules should only depend on platform-agnostic code"
          },
          { 
            from: "platform", 
            allow: ["platform"],
            message: "Platform code should be self-contained"
          },
          { 
            from: "tests", 
            allow: ["entry", "root", "ui", "helpers", "ctx-share", "core", "shared", "platform"] 
          },
          /* Context-specific rules using captures */
          {
            from: [["ui", { context: "${context}" }]],
            allow: [["ui", { context: "${context}" }]],
            message: "UI components can only import from the same context (${file.context}), not ${dependency.context}"
          },
        ],
      }],
      "boundaries/no-unknown-files": "error",
      "boundaries/no-unknown": "error",
      "boundaries/no-private": ["error", {
        allowUncles: false,
        message: "Private modules (starting with _ or in __private__) cannot be imported from outside"
      }],

      /* extra import guards */
      "no-restricted-imports": ["error", {
        patterns: [
          /* shared → app  (must stay domain‑agnostic) */
          {
            group: ["@/app/*", "../app/*"],
            message: "Do not import from app/* inside shared/* – domain logic must remain context‑agnostic."
          },
          /* prod → tests */
          {
            group: ["@/tests/*", "../tests/*", "@/__tests__/*", "../__tests__/*"],
            message: "Production code must not depend on test files."
          },
          /* cross‑ctx _core */
          {
            group: ["@/app/([^/]+)/_core/*"],
            message: "Import your own context's _core via a relative path, not another context's core."
          }
        ]
      }],

      /* misc tweaks */
      "react/react-in-jsx-scope": "off",
      "no-undef": "off",
    },
  },

  /* --------  extra fences on platform  -------- */
  {
    files: [`${SRC}/platform/**`],
    rules: {
      // 1. forbid React or Next in platform
      "no-restricted-imports": ["error", {
        paths: [
          { name: "react", message: "platform/* must stay framework-free" },
          { name: "next", message: "platform/* must stay framework-free" },
        ],
        patterns: [
          { group: ["next/**", "@/app/**", "@/pages/**"], message: "platform/* may not depend on app code" }
        ]
      }],

      // 2. forbid accidental JSX
      "no-restricted-syntax": ["error", {
        selector: "JSXOpeningElement",
        message: "No JSX or React components inside platform/*"
      }],
    },
  },

  /* Tailwind base import allowed only in <root>/app/layout.* */
  {
    files: [`${SRC}/app/layout.{ts,tsx}`],
    rules: { "no-restricted-imports": "off" },
  },

  /* Test files can pull from anywhere */
  {
    files: ["**/*.{test,spec}.{js,jsx,ts,tsx}", "**/__tests__/**"],
    rules: { 
      "no-restricted-imports": "off",
      "boundaries/element-types": "off",
    },
  },
];
