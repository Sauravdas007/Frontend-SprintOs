"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn, formatDate } from "@/lib/utils";
import {
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  FolderKanban,
  Sparkles,
  Bug,
  Github,
} from "lucide-react";

const recentActivity = [
  { action: "Completed", target: "OAuth implementation", user: "Alice", time: "10 min ago", type: "success" },
  { action: "Created", target: "Sprint 24", user: "Bob", time: "1 hour ago", type: "info" },
  { action: "Moved", target: "API docs to Review", user: "Charlie", time: "2 hours ago", type: "warning" },
  { action: "AI Generated", target: "12 subtasks for payment gateway", user: "System", time: "3 hours ago", type: "ai" },
  { action: "Bug Reported", target: "Memory leak in websocket", user: "Diana", time: "5 hours ago", type: "error" },
];

const quickStats = [
  { label: "Active Sprints", value: "3", icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Tasks Done", value: "142", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { label: "Velocity", value: "58 pts", icon: TrendingUp, color: "text-violet-500", bg: "bg-violet-500/10" },
  { label: "Open Bugs", value: "15", icon: AlertTriangle, color: "text-red-500", bg: "bg-red-500/10" },
];

export function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className={cn("p-2 rounded-lg", stat.bg)}>
                    <stat.icon className={cn("h-5 w-5", stat.color)} />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div className={cn(
                    "mt-0.5 h-2 w-2 rounded-full shrink-0",
                    activity.type === "success" && "bg-emerald-500",
                    activity.type === "info" && "bg-blue-500",
                    activity.type === "warning" && "bg-amber-500",
                    activity.type === "error" && "bg-red-500",
                    activity.type === "ai" && "bg-violet-500",
                  )} />
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{" "}
                      <span className="text-muted-foreground">{activity.action}</span>{" "}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-2">
              <FolderKanban className="h-4 w-4" />
              New Project
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Sparkles className="h-4 w-4" />
              AI Generate Tasks
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Bug className="h-4 w-4" />
              Report Bug
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Github className="h-4 w-4" />
              Sync GitHub
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
