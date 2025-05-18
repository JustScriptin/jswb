import { ReactElement } from "react";
import { Code2, Layers, Trophy } from "lucide-react";
import { StatsPebble } from "./StatsPebble";

export function StatsSection(): ReactElement {
  return (
    <section data-component="StatsSection" className="bg-muted py-12">
      <div className="container mx-auto flex flex-col items-center gap-6 md:flex-row md:justify-center">
        <StatsPebble
          icon={<Code2 className="h-6 w-6" />}
          value={50}
          label="Exercises"
        />
        <StatsPebble
          icon={<Layers className="h-6 w-6" />}
          value={4}
          label="Categories"
        />
        <StatsPebble
          icon={<Trophy className="h-6 w-6" />}
          value={12}
          label="Techniques"
        />
      </div>
    </section>
  );
}
StatsSection.displayName = "StatsSection";
