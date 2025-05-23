import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib";

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
) => (
  <SyntaxHighlighter
    // @ts-expect-error library types incompatible
    style={oneDark}
    language={language}
    PreTag="div"
    className="rounded-md"
    {...props}
  >
    {code}
  </SyntaxHighlighter>
);

export function Markdown({
  content,
  className,
  sanitize = true,
  ...props
}: MarkdownProps) {
  return (
    <div
      data-component="Markdown"
      className={cn("prose prose-sm dark:prose-invert max-w-none", className)}
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
                className={cn("bg-muted px-1.5 py-0.5 rounded-sm", className)}
                {...props}
              >
                {children}
              </code>
            );
          },
          p({ children }) {
            return (
              <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
            );
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
