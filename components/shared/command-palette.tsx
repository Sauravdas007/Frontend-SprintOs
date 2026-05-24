"use client";

import { useEffect, useState } from "react";
import { useUIStore } from "@/store";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Search,
  LayoutDashboard,
  FolderKanban,
  Timer,
  Sparkles,
  BarChart3,
  Settings,
  FileText,
  User,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const commands = [
  { icon: LayoutDashboard, label: "Go to Dashboard", href: "/dashboard", shortcut: "G D" },
  { icon: FolderKanban, label: "Go to Projects", href: "/workspace/1", shortcut: "G P" },
  { icon: Timer, label: "Go to Sprints", href: "/project/1/sprint/1", shortcut: "G S" },
  { icon: Sparkles, label: "AI Assistant", href: "/dashboard?tab=ai", shortcut: "G A" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard?tab=analytics", shortcut: "G N" },
  { icon: Settings, label: "Settings", href: "/settings", shortcut: "G ," },
  { icon: FileText, label: "New Task", href: "#", shortcut: "C T" },
  { icon: User, label: "Profile", href: "/settings", shortcut: "G U" },
  { icon: LogOut, label: "Logout", href: "/login", shortcut: "G L" },
];

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen } = useUIStore();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Dialog open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden">
        <DialogTitle className="sr-only">Command Palette</DialogTitle>
        <div className="flex items-center border-b px-4 py-3">
          <Search className="h-5 w-5 text-muted-foreground mr-3" />
          <Input
            placeholder="Type a command or search..."
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-lg placeholder:text-muted-foreground"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <kbd className="hidden h-8 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-xs font-medium opacity-100 sm:flex">
            ESC
          </kbd>
        </div>
        <div className="max-h-[400px] overflow-y-auto p-2">
          <AnimatePresence>
            {filtered.map((command, i) => (
              <motion.div
                key={command.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Link
                  href={command.href}
                  onClick={() => setCommandPaletteOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-accent",
                    i === 0 && "bg-accent"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <command.icon className="h-4 w-4 text-muted-foreground" />
                    <span>{command.label}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {command.shortcut.split(" ").map((key, j) => (
                      <kbd
                        key={j}
                        className="h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium"
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              No commands found for "{query}"
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
