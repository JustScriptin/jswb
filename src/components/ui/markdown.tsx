import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib";

// Custom theme that respects our design system and provides good contrast
const customCodeTheme = {
  'code[class*="language-"]': {
    color: "var(--color-foreground)",
    background: "transparent",
    fontFamily:
      "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
    fontSize: "0.875rem",
    lineHeight: "1.6",
    direction: "ltr",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    MozTabSize: "2",
    OTabSize: "2",
    tabSize: "2",
    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none",
  },
  'pre[class*="language-"]': {
    color: "var(--color-foreground)",
    background:
      "linear-gradient(135deg, var(--color-muted) 0%, oklch(from var(--color-muted) calc(l - 0.02) c h) 100%)",
    fontFamily:
      "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
    fontSize: "0.875rem",
    lineHeight: "1.6",
    direction: "ltr",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    MozTabSize: "2",
    OTabSize: "2",
    tabSize: "2",
    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none",
    padding: "1.25rem",
    margin: "1rem 0",
    overflow: "auto",
    borderRadius: "0.75rem",
    border: "1px solid var(--color-border)",
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    position: "relative",
  },
  // Token styles with good contrast and modern colors
  token: {
    color: "var(--color-foreground)",
  },
  comment: {
    color: "oklch(55% 0.05 240)",
    fontStyle: "italic",
  },
  prolog: {
    color: "oklch(55% 0.05 240)",
    fontStyle: "italic",
  },
  doctype: {
    color: "oklch(55% 0.05 240)",
    fontStyle: "italic",
  },
  cdata: {
    color: "oklch(55% 0.05 240)",
    fontStyle: "italic",
  },
  punctuation: {
    color: "oklch(65% 0.08 240)",
  },
  property: {
    color: "oklch(55% 0.18 250)",
    fontWeight: "500",
  },
  tag: {
    color: "oklch(55% 0.18 250)",
    fontWeight: "500",
  },
  boolean: {
    color: "oklch(60% 0.15 30)",
    fontWeight: "500",
  },
  number: {
    color: "oklch(60% 0.15 30)",
    fontWeight: "500",
  },
  constant: {
    color: "oklch(60% 0.15 30)",
    fontWeight: "500",
  },
  symbol: {
    color: "oklch(55% 0.18 250)",
  },
  deleted: {
    color: "oklch(55% 0.15 15)",
    backgroundColor: "oklch(95% 0.05 15)",
    padding: "0.125rem 0.25rem",
    borderRadius: "0.25rem",
  },
  selector: {
    color: "oklch(50% 0.15 140)",
    fontWeight: "500",
  },
  "attr-name": {
    color: "oklch(50% 0.15 140)",
    fontWeight: "500",
  },
  string: {
    color: "oklch(50% 0.15 140)",
  },
  char: {
    color: "oklch(50% 0.15 140)",
  },
  builtin: {
    color: "oklch(55% 0.18 250)",
    fontWeight: "500",
  },
  inserted: {
    color: "oklch(50% 0.15 140)",
    backgroundColor: "oklch(95% 0.05 140)",
    padding: "0.125rem 0.25rem",
    borderRadius: "0.25rem",
  },
  operator: {
    color: "oklch(65% 0.12 320)",
    fontWeight: "500",
  },
  entity: {
    color: "oklch(60% 0.15 30)",
  },
  url: {
    color: "oklch(50% 0.15 140)",
    textDecoration: "underline",
    textUnderlineOffset: "2px",
  },
  ".language-css .token.string": {
    color: "oklch(50% 0.15 140)",
  },
  ".style .token.string": {
    color: "oklch(50% 0.15 140)",
  },
  atrule: {
    color: "oklch(55% 0.18 290)",
    fontWeight: "500",
  },
  "attr-value": {
    color: "oklch(50% 0.15 140)",
  },
  keyword: {
    color: "oklch(55% 0.18 290)",
    fontWeight: "600",
  },
  function: {
    color: "oklch(55% 0.15 60)",
    fontWeight: "500",
  },
  "class-name": {
    color: "oklch(55% 0.15 60)",
    fontWeight: "500",
  },
  regex: {
    color: "oklch(50% 0.15 180)",
    backgroundColor: "oklch(95% 0.05 180)",
    padding: "0.125rem 0.25rem",
    borderRadius: "0.25rem",
  },
  important: {
    color: "oklch(55% 0.15 15)",
    fontWeight: "bold",
  },
  variable: {
    color: "oklch(60% 0.12 320)",
    fontWeight: "500",
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
};

function MarkdownImage({
  src,
  alt,
  ...props
}: Omit<ImageProps, "src" | "alt"> & { src?: string; alt?: string }) {
  return (
    <Image
      src={src ?? ""}
      alt={alt ?? ""}
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "100%", height: "auto" }}
      {...props}
    />
  );
}

type MarkdownProps = React.HTMLAttributes<HTMLDivElement> & {
  content: string;
  sanitize?: boolean;
};

const renderCodeBlock = (
  code: string,
  language: string,
  props: React.HTMLAttributes<HTMLElement>,
) => {
  // Handle plain text blocks (no language specified) differently
  if (!language || language === "text" || language === "") {
    return (
      <div className="relative group">
        <div className="bg-muted rounded-xl p-4 my-4">
          <pre className="bg-transparent text-sm leading-relaxed text-foreground font-mono whitespace-pre-wrap overflow-x-auto">
            {code}
          </pre>
        </div>
      </div>
    );
  }

  // Regular syntax-highlighted code blocks
  return (
    <div className="relative group">
      <div className="absolute top-3 right-3 text-xs text-muted-foreground font-medium uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">
        {language}
      </div>
      <SyntaxHighlighter
        // @ts-expect-error library types incompatible
        style={customCodeTheme}
        language={language}
        PreTag="div"
        className="rounded-xl"
        {...props}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export function Markdown({
  content,
  className,
  sanitize = true,
  ...props
}: MarkdownProps) {
  return (
    <div
      data-component="Markdown"
      className={cn("prose prose-sm max-w-none", className)}
      {...props}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={sanitize ? [rehypeSanitize] : []}
        components={{
          code({
            inline,
            className,
            children,
            ...props
          }: React.HTMLAttributes<HTMLElement> & { inline?: boolean }) {
            const match = /language-(\w+)/.exec(className ?? "");
            const language = match?.[1];
            return !inline && language ? (
              renderCodeBlock(
                String(children).replace(/\n$/, ""),
                language,
                props,
              )
            ) : (
              <code
                className={cn(
                  "bg-muted text-foreground px-2 py-1 rounded-md font-mono text-sm border border-border/50 shadow-sm",
                  className,
                )}
                {...props}
              >
                {children}
              </code>
            );
          },
          p({ children }) {
            return <p className="leading-7 not-first:mt-6">{children}</p>;
          },
          a({ children, href }) {
            return (
              <a
                href={href}
                className="font-medium underline underline-offset-4 hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            );
          },
          ul({ children }) {
            return (
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
            );
          },
          ol({ children }) {
            return (
              <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
            );
          },
          blockquote({ children }) {
            return (
              <blockquote className="mt-6 border-l-2 border-primary pl-6 italic">
                {children}
              </blockquote>
            );
          },
          h1({ children }) {
            return (
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                {children}
              </h1>
            );
          },
          h2({ children }) {
            return (
              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                {children}
              </h2>
            );
          },
          h3({ children }) {
            return (
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                {children}
              </h3>
            );
          },
          h4({ children }) {
            return (
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                {children}
              </h4>
            );
          },
          img({ src, alt }) {
            return <MarkdownImage src={src as string} alt={alt ?? ""} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

Markdown.displayName = "Markdown";
