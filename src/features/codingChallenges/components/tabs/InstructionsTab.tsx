import { BookOpen } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Markdown } from "@/components/ui/markdown";

type InstructionsTabProps = {
  description: string;
};

export function InstructionsTab({ description }: InstructionsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Problem Description
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Markdown content={description} />
      </CardContent>
    </Card>
  );
}

InstructionsTab.displayName = "InstructionsTab"; 
