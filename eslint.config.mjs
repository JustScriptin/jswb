import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const boundariesElements = [
  {
    // Shared components, data, hooks, lib, and services
    type: 'shared',
    pattern: ['src/{components,data,hooks,lib,services}/**/*'],
    mode: 'full'
  },
  {
    // All the code in the features folder
    type: 'feature',
    pattern: ['src/features/*/**/*'],
    mode: 'full',
    // Captures the names of each individual feature within the features folder
    capture: ['featureName']
  },
  {
    // All the code in the app folder
    type: 'app',
    pattern: ['src/app/**/*'],
    mode: 'full',
    capture: ['_', 'fileName']
  },
  {
    // Any code that should never be imported anywhere
    type: 'neverImport',
    // Selecting loose files in the src directory
    pattern: ['src/*'],
    mode: 'full'
  }
];

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["src/**/*"],
    plugins: {
      boundaries,
      '@next/next': next
    },
    settings: {
      'boundaries/elements': boundariesElements,
      // Boundries will only check the src directory
      'boundaries/include': ['src/**/*']
    },
    rules: {
      ...next.configs.recommended.rules,
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            // Allow imports from the shared folder to the shared folder
            { from: ['shared'], allow: ['shared'] },
            {
              // Allow imports from the shared folder to the feature folder
              // Only allows imports from that specific feature's folder
              from: ['feature'],
              allow: ['shared', ['feature', { featureName: '${from.featureName}' }]]
            },
            {
              // Allow imports from the shared and feature folders to the app folder as well as anything matching the neverImport pattern
              from: ['app', 'neverImport'],
              allow: ['shared', 'feature']
            },
            {
              // Allow imports from the app folder to the app folder and css files
              from: ['app'],
              allow: [['app', { fileName: '*.css' }]]
            }
          ]
        }
      ],
      'boundaries/no-unknown': ['error'],
      // Forces every single file to be in one of the boundries types (shared, feature, app, neverImport)
      'boundaries/no-unknown-files': ['error'],
    }
  }
];

export default eslintConfig;
