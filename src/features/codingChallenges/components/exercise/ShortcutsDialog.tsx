"use client";

import { motion } from "framer-motion";
import { Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ShortcutItem } from "./ShortcutItem";
import { KEYBOARD_SHORTCUTS } from "@/features/codingChallenges/constants";
import { exerciseAnimations } from "@/features/codingChallenges/lib/animations";

export function ShortcutsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Keyboard className="h-4 w-4 mr-2" />
          Shortcuts
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Master these shortcuts to boost your productivity
          </DialogDescription>
        </DialogHeader>
        <motion.div
          variants={exerciseAnimations.staggeredList}
          initial="initial"
          animate="animate"
          className="grid gap-4 py-4"
        >
          {KEYBOARD_SHORTCUTS.map((shortcut) => (
            <motion.div
              key={shortcut.key}
              variants={exerciseAnimations.listItem}
            >
              <ShortcutItem shortcut={shortcut} />
            </motion.div>
          ))}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

ShortcutsDialog.displayName = "ShortcutsDialog";
