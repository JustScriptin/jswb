"use client";

import { Lightbulb, Code, Target, AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Markdown } from "@/components/ui/markdown";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MarkdownList } from "@/components/ui/MarkdownList";
import type { Education } from "../../types";

type LearnTabProps = {
  education: Education;
};

export function LearnTab({ education }: LearnTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          {education.concept}
        </CardTitle>
        <CardDescription>
          Understanding the core concept
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Explanation Section */}
        <div>
          <SectionHeading
            icon={<Lightbulb className="h-4 w-4" />}
            title="Explanation"
          />
          <Markdown content={education.explanation} />
        </div>

        {/* Visual Example Section */}
        {education.visualExample && (
          <div>
            <SectionHeading
              icon={<Code className="h-4 w-4" />}
              title="Visual Example"
            />
            <Markdown content={education.visualExample} />
          </div>
        )}

        {/* Use Cases Section */}
        <div>
          <SectionHeading
            icon={<Target className="h-4 w-4" />}
            title="Common Use Cases"
          />
          <MarkdownList items={education.useCases} />
        </div>

        {/* Common Mistakes Section */}
        {education.commonMistakes && (
          <div>
            <SectionHeading
              icon={<AlertTriangle className="h-4 w-4" />}
              title="Common Mistakes to Avoid"
              className="text-yellow-500"
            />
            <MarkdownList items={education.commonMistakes} />
          </div>
        )}

        {/* Tips Section */}
        {education.tips && (
          <div>
            <SectionHeading
              icon={<Lightbulb className="h-4 w-4" />}
              title="Pro Tips"
              className="text-green-500"
            />
            <MarkdownList items={education.tips} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

LearnTab.displayName = "LearnTab"; 
