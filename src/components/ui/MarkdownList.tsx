import { Markdown } from "@/components/ui/markdown";

export type MarkdownListProps = {
  items: string[];
};

export function MarkdownList({ items }: MarkdownListProps) {
  return (
    <ul className="list-disc pl-4 space-y-1">
      {items.map((item) => (
        <li key={item}>
          <Markdown content={item} />
        </li>
      ))}
    </ul>
  );
}
MarkdownList.displayName = "MarkdownList"; 