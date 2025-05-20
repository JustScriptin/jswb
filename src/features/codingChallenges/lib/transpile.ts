import ts from "typescript";
import { Language } from "@/features/codingChallenges/types";

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
    const messages = result.diagnostics.map((d) => {
      const msg = ts.flattenDiagnosticMessageText(d.messageText, "\n");
      const pos = d.file?.getLineAndCharacterOfPosition(d.start ?? 0);
      const line = (pos?.line ?? 0) + 1;
      const col = (pos?.character ?? 0) + 1;
      return `TS Error at ${line}:${col} - ${msg}`;
    });
    return { error: messages.join("\n") };
  }

  return { code: result.outputText };
};
