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
    const [controlsVisible, setControlsVisible] = useState(true);
    const isMobile = useMediaQuery("(max-width: 640px)");

    useEffect(() => {
      if (!isMobile) {
        setControlsVisible(true);
      }
    }, [isMobile]);

    return (
      <Card
        data-component="CodeEditorUI"
        className={cn(
          "flex flex-col grow min-h-0 overflow-hidden relative",
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
            "p-2 sm:p-3 md:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3",
          )}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-2 sm:gap-3">
            <Select value={language} onValueChange={onLanguageChange}>
              <SelectTrigger className="w-full sm:w-[150px] text-sm h-9">
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
              className="w-full sm:w-auto min-w-[100px] h-9 text-sm"
              size="sm"
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
            className="absolute top-1 right-1 z-10 h-6 w-6 rounded-full bg-background/80 backdrop-blur-sm shadow-sm"
            onClick={() => {
              setControlsVisible(!controlsVisible);
            }}
          >
            {controlsVisible ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
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
              className="absolute bottom-4 right-4 z-10 h-12 w-12 rounded-full shadow-lg"
            >
              <Play className="h-5 w-5" />
              {isSubmitting && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-background border-t-transparent" />
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
  },
);

CodeEditorUI.displayName = "CodeEditorUI";
