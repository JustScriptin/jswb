"use client";

import type { ReactElement } from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import styles from "@/shared/styles/markdown.module.css";

type InstructionsTabContentProps = {
  descriptionContent: ReactElement;
};

export function InstructionsTabContent({
  descriptionContent,
}: InstructionsTabContentProps) {
  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className={styles.markdown}>{descriptionContent}</div>
      </CardContent>
    </Card>
  );
}

InstructionsTabContent.displayName = "InstructionsTabContent";
