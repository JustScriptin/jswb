"use client";

import { forwardRef } from "react";
import MonacoEditor, { type OnMount } from "@monaco-editor/react";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Separator } from "@/shared/components/ui/separator";
import { SUPPORTED_LANGUAGES } from "@/shared/constants/editor";
import { cn } from "@/shared/lib/utils";
import type { editor } from "monaco-editor";
import type { Language } from "@/shared/types/exercise";

export type CodeEditorUIProps = {
  className: string | undefined;
  language: Language;
  defaultValue: string;
  isSubmitting: boolean;
  error: string | null;
  editorOptions: Record<string, unknown>;
  onMount: OnMount;
  onChange: (value: string | undefined) => void;
  onValidate: (markers: editor.IMarker[]) => void;
  onLanguageChange: (selectedLanguage: string) => void;
  onRunTests: () => Promise<void>;
};

export const CodeEditorUI = forwardRef<HTMLDivElement, CodeEditorUIProps>(
  function CodeEditorUI(
    {
      className,
      language,
      defaultValue,
      isSubmitting,
      error,
      editorOptions,
      onMount,
      onChange,
      onValidate,
      onLanguageChange,
      onRunTests,
    },
    ref,
  ) {
    return (
      <Card
        data-component="CodeEditorUI"
        className={cn("flex flex-col grow min-h-0 overflow-hidden", className)}
        ref={ref}
      >
        <div className="p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3 sm:gap-4">
            <Select value={language} onValueChange={onLanguageChange}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(SUPPORTED_LANGUAGES).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={onRunTests}
              disabled={isSubmitting}
              className="w-full sm:w-auto min-w-[100px]"
            >
              {isSubmitting ? "Running..." : "Run Tests"}
            </Button>
          </div>
          {isSubmitting && (
            <Badge
              variant="secondary"
              className="animate-pulse hidden sm:inline-flex"
            >
              Running tests...
            </Badge>
          )}
        </div>

        <Separator />

        <div className="grow relative min-h-0">
          <MonacoEditor
            height="100%"
            width="100%"
            language={language}
            defaultValue={defaultValue}
            onMount={onMount}
            onChange={onChange}
            onValidate={onValidate}
            options={editorOptions}
            loading={
              <div className="flex items-center justify-center w-full h-full bg-muted/50">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  <span className="text-sm text-muted-foreground">
                    Loading editor...
                  </span>
                </div>
              </div>
            }
          />
        </div>

        <Separator className="my-4" />

        <div className="flex flex-col gap-2 px-4 pb-4">
          {error && (
            <Badge variant="destructive" className="self-start">
              {error}
            </Badge>
          )}
        </div>
      </Card>
    );
  },
);

CodeEditorUI.displayName = "CodeEditorUI";
