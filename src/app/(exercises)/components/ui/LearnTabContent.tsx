"use client";

import type { ReactElement } from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import styles from "@/shared/styles/markdown.module.css";

type LearnTabContentProps = {
  educationContent: ReactElement;
  _concept: string; // Used for semantic clarity but not directly in the component
};

export function LearnTabContent({
  educationContent,
  _concept,
}: LearnTabContentProps) {
  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className={styles.markdown}>{educationContent}</div>
      </CardContent>
    </Card>
  );
}

LearnTabContent.displayName = "LearnTabContent";
