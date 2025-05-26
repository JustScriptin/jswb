"use client";

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { useEffect, useState } from "react";
import { cn } from "@/lib";
import { useMDXComponents } from "@/lib/mdx-components";
// eslint-disable-next-line boundaries/no-unknown
import styles from "@/styles/markdown.module.css";

type MDXContentProps = React.HTMLAttributes<HTMLDivElement> & {
  content: string;
  components?: Record<string, React.ComponentType>;
};

export function MDXContent({
  content,
  className,
  components: customComponents,
  ...props
}: MDXContentProps) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  const defaultComponents = useMDXComponents({});
  const components = { ...defaultComponents, ...customComponents };

  useEffect(() => {
    const compileMDX = async () => {
      try {
        const serialized = await serialize(content);
        setMdxSource(serialized);
        setError(null);
      } catch (err) {
        console.error("Error compiling MDX:", err);
        setError("Failed to render content");
      }
    };

    compileMDX();
  }, [content]);

  if (error) {
    return (
      <div className={cn(styles.markdown, className)} {...props}>
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  if (!mdxSource) {
    return (
      <div className={cn(styles.markdown, className)} {...props}>
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-muted rounded w-full mb-2"></div>
          <div className="h-4 bg-muted rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      data-component="MDXContent"
      className={cn(styles.markdown, className)}
      {...props}
    >
      <MDXRemote {...mdxSource} components={components} />
    </div>
  );
}

MDXContent.displayName = "MDXContent";
