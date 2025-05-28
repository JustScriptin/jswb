import ts from "typescript";
import type { Language } from "@/platform/types/exercise";

export const transpile = (
  code: string,
  language: Language,
): { code: string } | { error: string } => {
  if (language !== "typescript") return { code };

  const hasSolveFunction = /function\s+solve\s*\(|const\s+solve\s*=/.test(code);
  if (!hasSolveFunction) {
    return { error: "No solve function found in the code" };
  }

  const result = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS, // Use CommonJS for better compatibility
      target: ts.ScriptTarget.ES2020,
      strict: true,
      removeComments: true,
      noEmitHelpers: true,
      esModuleInterop: true,
    },
    reportDiagnostics: true,
  });

  if (result.diagnostics?.length) {
    const messages = result.diagnostics.map((diagnostic) => {
      const message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        "\n",
      );
      const position = diagnostic.file?.getLineAndCharacterOfPosition(
        diagnostic.start ?? 0,
      );
      const line = (position?.line ?? 0) + 1;
      const column = (position?.character ?? 0) + 1;
      return `TS Error at ${line}:${column} - ${message}`;
    });
    return { error: messages.join("\n") };
  }

  let cleanedCode = result.outputText;

  cleanedCode = cleanedCode
    .replace(/exports\.__esModule\s*=\s*true;?/g, "")
    .replace(/exports\.solve\s*=\s*solve;?/g, "")
    .replace(/exports\.default\s*=\s*solve;?/g, "")
    .replace(/module\.exports\s*=\s*{\s*solve\s*:\s*solve\s*};?/g, "")
    .replace(/export\s+const\s+solve/g, "const solve")
    .replace(/export\s+function\s+solve/g, "function solve")
    .replace(/export\s+default\s+function\s+solve/g, "function solve")
    .replace(/export\s+default\s+solve;?/g, "");

  cleanedCode +=
    '\n// Ensure solve is globally available\nif (typeof solve === "function") globalThis.solve = solve;';

  return { code: cleanedCode };
};
