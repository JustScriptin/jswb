import type { MDXComponents as MDXComponentsType } from "mdx/types";
import Image from "next/image";
import { cva } from "class-variance-authority";
import styles from "@/shared/styles/markdown.module.css";

// CodeBlock component for syntax highlighting
function CodeBlock({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const language = className?.replace(/language-/, "") ?? "text";

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

// Define typography variants with CVA
const headingVariants = cva("scroll-m-20 tracking-tight", {
  variants: {
    level: {
      h1: "text-4xl font-extrabold lg:text-5xl",
      h2: "text-3xl font-semibold border-b pb-2 first:mt-0",
      h3: "text-2xl font-semibold",
      h4: "text-xl font-semibold",
    },
  },
  defaultVariants: {
    level: "h1",
  },
});

const textVariants = cva("", {
  variants: {
    variant: {
      paragraph: "leading-7 [&:not(:first-child)]:mt-6",
      link: "font-medium underline underline-offset-4 hover:text-primary",
      blockquote: "mt-6 border-l-2 border-primary pl-6 italic",
    },
  },
  defaultVariants: {
    variant: "paragraph",
  },
});

const listVariants = cva("my-6 ml-6 [&>li]:mt-2", {
  variants: {
    variant: {
      unordered: "list-disc",
      ordered: "list-decimal",
    },
  },
  defaultVariants: {
    variant: "unordered",
  },
});

// Define MDX components
export const MDXComponents: MDXComponentsType = {
  // Headings
  h1: ({ children }) => (
    <h1 className={headingVariants({ level: "h1" })}>{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className={headingVariants({ level: "h2" })}>{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className={headingVariants({ level: "h3" })}>{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className={headingVariants({ level: "h4" })}>{children}</h4>
  ),
  p: ({ children }) => (
    <p className={textVariants({ variant: "paragraph" })}>{children}</p>
  ),

  // Lists
  ul: ({ children }) => (
    <ul className={listVariants({ variant: "unordered" })}>{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className={listVariants({ variant: "ordered" })}>{children}</ol>
  ),

  // Links
  a: ({ children, href }) => (
    <a
      href={href}
      className={textVariants({ variant: "link" })}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),

  // Blockquote
  blockquote: ({ children }) => (
    <blockquote className={textVariants({ variant: "blockquote" })}>
      {children}
    </blockquote>
  ),

  // Code
  code: ({ children, className }) => {
    // Check if this is a code block (has language class)
    if (className) {
      return <CodeBlock className={className}>{children as string}</CodeBlock>;
    }
    // Inline code
    return <code className={styles.inlineCode}>{children}</code>;
  },

  pre: ({ children, ...props }) => {
    // For code blocks, the code element handles the styling
    const preProps = props as React.HTMLAttributes<HTMLPreElement>;
    if (preProps.className?.includes("language-")) {
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
    const { src, alt, ...rest } = props;
    return (
      <Image
        {...rest}
        src={src ?? ""}
        alt={alt ?? ""}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />
    );
  },
};

// This function is used for client-side MDX components
export function useMDXComponents(
  components: MDXComponentsType,
): MDXComponentsType {
  return {
    ...components,
    ...MDXComponents,
  };
}
