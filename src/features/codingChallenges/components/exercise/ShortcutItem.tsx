import type { Shortcut } from "@/features/codingChallenges/constants"; // Adjusted path for constants

export type ShortcutItemProps = {
  shortcut: Shortcut;
};

export function ShortcutItem({ shortcut }: ShortcutItemProps) {
  return (
    <div
      data-component="ShortcutItem"
      className="flex items-center justify-between"
    >
      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
        {shortcut.key}
      </code>
      <span className="text-sm text-muted-foreground">
        {shortcut.description}
      </span>
    </div>
  );
}
ShortcutItem.displayName = "ShortcutItem";
