import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
// eslint-disable-next-line boundaries/no-unknown
import styles from "@/styles/markdown.module.css";

// Custom code block component that matches our existing styling
function CodeBlock({ children, className }: React.HTMLAttributes<HTMLElement>) {
  const language = className?.replace(/language-/, "") || "";

  if (!language || language === "text" || language === "") {
    return (
      <div className={styles.codeBlock}>
        <div className={styles.codeBlockPlain}>
          <pre>{children}</pre>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.codeBlock}>
      <div className={styles.codeLanguage}>{language}</div>
      <div className={styles.codeBlockHighlighted}>
        <pre>
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Typography elements
    h1: ({ children }) => (
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
    ),

    // Lists
    ul: ({ children }) => (
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
    ),

    // Links
    a: ({ children, href }) => (
      <a
        href={href}
        className="font-medium underline underline-offset-4 hover:text-primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),

    // Blockquotes
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-primary pl-6 italic">
        {children}
      </blockquote>
    ),

    // Code
    code: ({ children, className }) => {
      // Check if this is a code block (has language class)
      if (className) {
        return <CodeBlock className={className}>{children}</CodeBlock>;
      }
      // Inline code
      return <code className={styles.inlineCode}>{children}</code>;
    },
    pre: ({ children, ...props }) => {
      // For code blocks, the code element handles the styling
      if (props.className?.includes("language-")) {
        return <>{children}</>;
      }
      // For non-code pre blocks
      return (
        <pre className="bg-muted rounded-xl p-4 my-4 overflow-auto">
          {children}
        </pre>
      );
    },

    // Images
    img: (props) => {
      const { src, alt, ...rest } = props as { src?: string; alt?: string };
      return (
        <Image
          {...(rest as Omit<ImageProps, "src" | "alt">)}
          src={src ?? ""}
          alt={alt ?? ""}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      );
    },

    // Spread the existing components to maintain defaults
    ...components,
  };
}
