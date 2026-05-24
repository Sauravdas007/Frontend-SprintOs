"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KanbanBoard } from "@/components/kanban/kanban-board";
import { cn } from "@/lib/utils";
import {
  FolderKanban,
  Timer,
  GitBranch,
  ArrowRight,
  Plus,
  Calendar,
  Target,
} from "lucide-react";

const sprints = [
  { id: "1", name: "Sprint 24", goal: "Complete OAuth & API docs", status: "active", startDate: "2024-11-18", endDate: "2024-12-02", completed: 8, total: 12 },
  { id: "2", name: "Sprint 23", goal: "Payment gateway integration", status: "completed", startDate: "2024-11-04", endDate: "2024-11-17", completed: 15, total: 15 },
  { id: "3", name: "Sprint 25", goal: "Mobile app v1 release", status: "planning", startDate: "2024-12-03", endDate: "2024-12-16", completed: 0, total: 10 },
];

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [view, setView] = useState<"kanban" | "sprints">("kanban");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold">AI SprintOS Platform</h1>
            <Badge>Active</Badge>
          </div>
          <p className="text-sm text-muted-foreground">Main product development · 45 tasks · 5 members</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <GitBranch className="h-4 w-4" />
            GitHub
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            New Sprint
          </Button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex gap-1 p-1 bg-muted rounded-lg w-fit">
        <button
          onClick={() => setView("kanban")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
            view === "kanban" ? "bg-background shadow-sm" : "text-muted-foreground"
          )}
        >
          <FolderKanban className="h-4 w-4" />
          Kanban Board
        </button>
        <button
          onClick={() => setView("sprints")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
            view === "sprints" ? "bg-background shadow-sm" : "text-muted-foreground"
          )}
        >
          <Timer className="h-4 w-4" />
          Sprints
        </button>
      </div>

      <motion.div
        key={view}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {view === "kanban" ? <KanbanBoard /> : <SprintsView />}
      </motion.div>
    </div>
  );
}

function SprintsView() {
  return (
    <div className="space-y-4">
      {sprints.map((sprint, i) => (
        <motion.div
          key={sprint.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Link href={`/project/1/sprint/${sprint.id}`}>
            <Card className="hover:shadow-md transition-all cursor-pointer group">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">{sprint.name}</h3>
                      <Badge variant={
                        sprint.status === "active" ? "default" :
                        sprint.status === "completed" ? "secondary" : "outline"
                      } className="text-[10px]">
                        {sprint.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{sprint.goal}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {sprint.startDate} → {sprint.endDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        {sprint.completed}/{sprint.total} tasks
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{Math.round((sprint.completed / sprint.total) * 100)}%</div>
                    <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden mt-1">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          sprint.status === "completed" ? "bg-emerald-500" : "bg-primary"
                        )}
                        style={{ width: `${(sprint.completed / sprint.total) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
