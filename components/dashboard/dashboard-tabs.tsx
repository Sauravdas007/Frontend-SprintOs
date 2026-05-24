"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KanbanBoard } from "@/components/kanban/kanban-board";
import { AITaskGenerator } from "@/components/ai/ai-task-generator";
import { AIBugTriage } from "@/components/ai/ai-bug-triage";
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard";
import { GitHubIntegration } from "@/components/github/github-integration";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Sparkles,
  Bug,
  BarChart3,
  Github,
  FolderKanban,
  Clock,
} from "lucide-react";
import { OverviewTab } from "./overview-tab";

type Tab = "overview" | "kanban" | "ai" | "analytics" | "github";

const tabs = [
  { id: "overview" as Tab, label: "Overview", icon: LayoutDashboard },
  { id: "kanban" as Tab, label: "Kanban", icon: FolderKanban },
  { id: "ai" as Tab, label: "AI Tools", icon: Sparkles },
  { id: "analytics" as Tab, label: "Analytics", icon: BarChart3 },
  { id: "github" as Tab, label: "GitHub", icon: Github },
];

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back! Here's what's happening.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Clock className="h-3 w-3" />
            Sprint 24 ends in 5 days
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-muted rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
              activeTab === tab.id
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "kanban" && <KanbanBoard />}
        {activeTab === "ai" && (
          <div className="space-y-8">
            <AITaskGenerator />
            <AIBugTriage />
          </div>
        )}
        {activeTab === "analytics" && <AnalyticsDashboard />}
        {activeTab === "github" && <GitHubIntegration />}
      </motion.div>
    </div>
  );
}
