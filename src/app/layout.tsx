import type { ReactElement } from "react";

import type { Metadata } from "next";

/* eslint-disable boundaries/no-unknown */
import "./globals.css";
/* eslint-enable boundaries/no-unknown */

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
