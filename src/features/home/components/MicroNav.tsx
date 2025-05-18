"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MicroNav() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      setVisible(window.scrollY >= 64);
      setProgress(Math.min(window.scrollY / total, 1));
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      data-component="MicroNav"
      className={cn(
        "fixed left-0 right-0 top-0 z-30 transition-transform duration-300",
        visible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-b-md border-b border-border/50 bg-background/80 px-4 backdrop-blur">
        <Link href="/" className="font-semibold tracking-tight">
          JSWB
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/exercises">Log in</Link>
          </Button>
          <Button size="icon" variant="ghost" asChild>
            <Link href="/exercises">
              <span className="sr-only">Menu</span>≡
            </Link>
          </Button>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 via-sky-500 to-purple-500"
        style={{ width: `${progress * 100}%` }}
      />
    </nav>
  );
}
MicroNav.displayName = "MicroNav";
