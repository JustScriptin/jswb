"use client";

import { forwardRef, useState, useEffect } from "react";
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
import { Play, ChevronUp, ChevronDown } from "lucide-react";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import type { editor } from "monaco-editor";
import type { Language } from "@/shared/types/exercise";

export type CodeEditorDisplayProps = {
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

export const CodeEditorDisplay = forwardRef<
  HTMLDivElement,
  CodeEditorDisplayProps
>(function CodeEditorDisplay(
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
  const [controlsVisible, setControlsVisible] = useState(true);
  const isMobile = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    if (!isMobile) {
      setControlsVisible(true);
    }
  }, [isMobile]);

  return (
    <Card
      data-component="CodeEditorDisplay"
      className={cn(
        "flex flex-col grow min-h-0 overflow-hidden relative",
        isMobile ? "border-0 shadow-none mx-[-1rem]" : "",
        className,
      )}
      ref={ref}
    >
      <div
        className={cn(
          "transition-all duration-200 ease-in-out",
          controlsVisible
            ? "max-h-[200px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden",
          isMobile
            ? "p-2 flex flex-row items-center justify-between gap-2"
            : "p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0",
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between w-full gap-2",
            isMobile
              ? "flex-row"
              : "flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4",
          )}
        >
          <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger
              className={cn(
                "text-sm",
                isMobile ? "h-8 w-[120px]" : "w-full sm:w-[150px]",
              )}
            >
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
            className={cn(
              "text-sm",
              isMobile ? "h-8 min-w-[80px]" : "w-full sm:w-auto min-w-[100px]",
            )}
            size={isMobile ? "sm" : "default"}
          >
            {isSubmitting ? "Running..." : "Run Tests"}
          </Button>
        </div>
        {isSubmitting && (
          <Badge
            variant="secondary"
            className="animate-pulse hidden sm:inline-flex text-xs"
          >
            Running tests...
          </Badge>
        )}
      </div>

      {/* Mobile toggle button */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full bg-background/90 backdrop-blur-sm shadow-md"
          onClick={() => {
            setControlsVisible(!controlsVisible);
          }}
        >
          {controlsVisible ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </Button>
      )}

      <Separator className={controlsVisible ? "" : "hidden"} />

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

        {/* Floating action button for mobile */}
        {isMobile && !controlsVisible && (
          <Button
            onClick={onRunTests}
            disabled={isSubmitting}
            size="icon"
            className="absolute bottom-6 right-6 z-10 h-14 w-14 rounded-full shadow-xl bg-primary hover:bg-primary/90"
          >
            <Play className="h-6 w-6" />
            {isSubmitting && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-background border-t-transparent" />
              </div>
            )}
          </Button>
        )}
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
});

CodeEditorDisplay.displayName = "CodeEditorDisplay";
