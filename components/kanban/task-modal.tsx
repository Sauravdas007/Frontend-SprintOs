"use client";

import { useState } from "react";
import { useKanbanStore } from "@/store";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, priorityColors, statusColors, formatDate, getInitials } from "@/lib/utils";
import {
  Calendar,
  Clock,
  Tag,
  User,
  GitBranch,
  MessageSquare,
  Paperclip,
  CheckCircle2,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function TaskModal() {
  const { selectedTask, taskModalOpen, setTaskModalOpen, updateTask } = useKanbanStore();
  const [activeTab, setActiveTab] = useState<"details" | "comments" | "activity">("details");

  if (!selectedTask) return null;

  const handleStatusChange = (status: string) => {
    updateTask(selectedTask.id, { status: status as any });
  };

  return (
    <Dialog open={taskModalOpen} onOpenChange={setTaskModalOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={cn(priorityColors[selectedTask.priority])}>
                  {selectedTask.priority}
                </Badge>
                <span className="text-xs text-muted-foreground">{selectedTask.id}</span>
              </div>
              <DialogTitle className="text-xl">{selectedTask.title}</DialogTitle>
            </div>
          </div>
          <DialogDescription>{selectedTask.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status selector */}
          <div className="flex gap-2">
            {["backlog", "todo", "in_progress", "review", "done"].map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all border",
                  selectedTask.status === status
                    ? statusColors[status as keyof typeof statusColors]
                    : "border-transparent hover:bg-muted"
                )}
              >
                {status.replace("_", " ")}
              </button>
            ))}
          </div>

          {/* Meta info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Assignee</span>
                <div className="flex items-center gap-2 ml-auto">
                  {selectedTask.assignee ? (
                    <>
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-[10px]">{getInitials(selectedTask.assignee.name)}</AvatarFallback>
                      </Avatar>
                      <span>{selectedTask.assignee.name}</span>
                    </>
                  ) : (
                    <span className="text-muted-foreground">Unassigned</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Due Date</span>
                <span className="ml-auto">{selectedTask.dueDate ? formatDate(selectedTask.dueDate) : "None"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Story Points</span>
                <span className="ml-auto font-mono">{selectedTask.storyPoints || "-"}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Labels</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {selectedTask.labels.map((label) => (
                  <span
                    key={label.id}
                    className="text-xs px-2 py-1 rounded-full"
                    style={{ backgroundColor: label.color + "20", color: label.color }}
                  >
                    {label.name}
                  </span>
                ))}
              </div>
              {selectedTask.githubIssueId && (
                <div className="flex items-center gap-2 text-sm">
                  <GitBranch className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">GitHub</span>
                  <span className="ml-auto text-xs text-blue-500">#{selectedTask.githubIssueId}</span>
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b">
            <div className="flex gap-4">
              {(["details", "comments", "activity"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "pb-2 text-sm font-medium capitalize transition-colors relative",
                    activeTab === tab ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="task-tab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "details" && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    className="w-full min-h-[100px] rounded-lg border bg-muted/50 p-3 text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    defaultValue={selectedTask.description}
                  />
                </div>
              </motion.div>
            )}
            {activeTab === "comments" && (
              <motion.div
                key="comments"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>AU</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Input placeholder="Write a comment..." className="bg-muted/50" />
                  </div>
                </div>
                <div className="text-center text-sm text-muted-foreground py-8">
                  No comments yet
                </div>
              </motion.div>
            )}
            {activeTab === "activity" && (
              <motion.div
                key="activity"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                {[
                  { action: "created", user: "Alice", time: "2 hours ago" },
                  { action: "moved to In Progress", user: "Bob", time: "1 hour ago" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{activity.user}</span>
                    <span>{activity.action}</span>
                    <span className="text-muted-foreground ml-auto">{activity.time}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => setTaskModalOpen(false)}>Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
