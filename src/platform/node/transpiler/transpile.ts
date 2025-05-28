import ts from "typescript";
import type { Language } from "@/platform/types/exercise";

export const transpile = (
  code: string,
  language: Language,
): { code: string } | { error: string } => {
  if (language !== "typescript") return { code };

  const result = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ESNext,
      strict: true,
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

  return { code: result.outputText };
};
