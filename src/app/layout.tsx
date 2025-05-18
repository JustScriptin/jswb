import type { ReactElement } from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JS Methods Workshop",
  description:
    "Interactive tutorials and exercises for mastering JavaScript methods",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement {
  return (
    <html lang="en">
      <body data-component="RootLayout" className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
RootLayout.displayName = "RootLayout";
