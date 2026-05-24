"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KanbanBoard } from "@/components/kanban/kanban-board";
import { cn } from "@/lib/utils";
import {
  Timer,
  Target,
  TrendingUp,
  Calendar,
  ArrowLeft,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function SprintPage({ params }: { params: { id: string; sprintId: string } }) {
  const progress = 67;
  const velocity = 58;
  const planned = 45;

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Header */}
      <div>
        <Link href="/project/1" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2">
          <ArrowLeft className="h-3 w-3" />
          Back to Project
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold">Sprint 24</h1>
              <Badge>Active</Badge>
              <Badge variant="outline" className="gap-1">
                <Timer className="h-3 w-3" />
                5 days left
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">Complete OAuth & API docs · Nov 18 - Dec 2</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Zap className="h-4 w-4" />
            Complete Sprint
          </Button>
        </div>
      </div>

      {/* Sprint Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Progress", value: `${progress}%`, icon: Target, color: "text-blue-500", extra: <Progress value={progress} className="h-1.5 mt-2" /> },
          { label: "Velocity", value: `${velocity} pts`, icon: TrendingUp, color: "text-violet-500" },
          { label: "Planned", value: `${planned} pts`, icon: Calendar, color: "text-amber-500" },
          { label: "Tasks", value: "8/12", icon: Timer, color: "text-emerald-500" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className={cn("h-4 w-4", stat.color)} />
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                {stat.extra}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Burndown Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-violet-500" />
            Burndown Chart
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-end justify-between gap-2 px-4">
            {[45, 42, 38, 35, 30, 28, 25, 20, 18, 15, 12, 8, 5].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={cn(
                    "w-full rounded-t transition-all duration-500",
                    i < 8 ? "bg-primary/60" : "bg-muted"
                  )}
                  style={{ height: `${(val / 45) * 100}%` }}
                />
                <span className="text-[10px] text-muted-foreground">D{i + 1}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Kanban */}
      <div>
        <h2 className="font-semibold mb-4">Sprint Board</h2>
        <KanbanBoard />
      </div>
    </div>
  );
}

function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("w-full bg-muted rounded-full overflow-hidden", className)}>
      <div
        className="h-full bg-primary rounded-full transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}



