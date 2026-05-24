"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore, useWorkspaceStore } from "@/store";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderKanban,
  Timer,
  Sparkles,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
  ChevronDown,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: FolderKanban, label: "Projects", href: "/workspace/1" },
  { icon: Timer, label: "Sprints", href: "/project/1/sprint/1" },
  { icon: Sparkles, label: "AI Assistant", href: "/dashboard?tab=ai" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard?tab=analytics" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const workspaces = [
  { id: "1", name: "Engineering", slug: "eng", color: "bg-violet-500" },
  { id: "2", name: "Design", slug: "design", color: "bg-pink-500" },
  { id: "3", name: "Marketing", slug: "marketing", color: "bg-blue-500" },
];

export function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const [workspaceOpen, setWorkspaceOpen] = useState(true);
  const pathname = usePathname();

  return (
    <motion.aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r bg-sidebar-background flex flex-col transition-all duration-300",
        sidebarOpen ? "w-64" : "w-16"
      )}
      initial={false}
      animate={{ width: sidebarOpen ? 256 : 64 }}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b">
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">SprintOS</span>
            </motion.div>
          )}
        </AnimatePresence>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={toggleSidebar}
          className="shrink-0"
        >
          {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>

      {/* Workspace Switcher */}
      <div className="p-3">
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <button
                onClick={() => setWorkspaceOpen(!workspaceOpen)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium hover:bg-sidebar-accent transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>Workspaces</span>
                </div>
                <ChevronDown className={cn("h-3 w-3 transition-transform", workspaceOpen && "rotate-180")} />
              </button>
              <AnimatePresence>
                {workspaceOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-1 space-y-1"
                  >
                    {workspaces.map((ws) => (
                      <Link
                        key={ws.id}
                        href={`/workspace/${ws.id}`}
                        className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
                      >
                        <div className={cn("h-2 w-2 rounded-full", ws.color)} />
                        <span>{ws.name}</span>
                      </Link>
                    ))}
                    <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground">
                      <Plus className="h-3 w-3" />
                      New Workspace
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-4 w-4 shrink-0", !sidebarOpen && "mx-auto")} />
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t p-3">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-sidebar-accent transition-colors cursor-pointer">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://avatars.githubusercontent.com/u/1" />
            <AvatarFallback>AU</AvatarFallback>
          </Avatar>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col"
              >
                <span className="text-sm font-medium">Admin User</span>
                <span className="text-xs text-muted-foreground">admin@aisprintos.dev</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}
