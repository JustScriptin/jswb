"use client";

import type { ReactElement } from "react";
import { Card, CardContent } from "@/components/ui/card";
// eslint-disable-next-line boundaries/no-unknown
import styles from "@/styles/markdown.module.css";

type InstructionsTabMDXProps = {
  descriptionContent: ReactElement;
};

export function InstructionsTabMDX({
  descriptionContent,
}: InstructionsTabMDXProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className={styles.markdown}>{descriptionContent}</div>
      </CardContent>
    </Card>
  );
}

InstructionsTabMDX.displayName = "InstructionsTabMDX";
