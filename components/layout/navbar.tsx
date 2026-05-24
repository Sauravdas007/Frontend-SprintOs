"use client";

import { useState } from "react";
import { useUIStore } from "@/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Bell,
  Command,
  Sun,
  Moon,
  Menu,
} from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { setCommandPaletteOpen, setNotificationPanelOpen } = useUIStore();
  const { theme, setTheme } = useTheme();
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-xl px-6">
      <div className="flex flex-1 items-center gap-4">
        <div className={cn(
          "relative flex items-center transition-all duration-300",
          searchFocused ? "flex-1 max-w-md" : "w-64"
        )}>
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks, projects..."
            className="pl-9 bg-muted/50 border-0 focus-visible:ring-1"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            onClick={() => setCommandPaletteOpen(true)}
            readOnly
          />
          <kbd className="absolute right-3 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </motion.div>
          </AnimatePresence>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={() => setNotificationPanelOpen(true)}
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
        </Button>

        <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-primary/20">
          <AvatarImage src="https://avatars.githubusercontent.com/u/1" />
          <AvatarFallback>AU</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
