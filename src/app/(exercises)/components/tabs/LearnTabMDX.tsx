"use client";

import type { ReactElement } from "react";
import { Lightbulb } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/shared/components/ui/card";
import styles from "@/shared/styles/markdown.module.css";

type LearnTabMDXProps = {
  educationContent: ReactElement;
  concept: string;
};

export function LearnTabMDX({ educationContent, concept }: LearnTabMDXProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          {concept}
        </CardTitle>
        <CardDescription>Understanding the core concept</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={styles.markdown}>{educationContent}</div>
      </CardContent>
    </Card>
  );
}

LearnTabMDX.displayName = "LearnTabMDX";
