import type { Shortcut } from "@/features/codingChallenges/constants";

export type ShortcutItemProps = {
  shortcut: Shortcut;
};

export function ShortcutItem({ shortcut }: ShortcutItemProps) {
  return (
    <div
      data-component="ShortcutItem"
      className="flex items-center justify-between group hover:bg-muted/30 p-2 rounded-lg transition-colors"
    >
      <kbd className="relative inline-flex items-center justify-center px-3 py-1.5 bg-gradient-to-b from-muted to-muted/80 text-foreground font-mono text-sm font-semibold border border-border/60 rounded-md shadow-sm min-w-[2.5rem] group-hover:shadow-md transition-all">
        {shortcut.key}
      </kbd>
      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
        {shortcut.description}
      </span>
    </div>
  );
}
ShortcutItem.displayName = "ShortcutItem";
