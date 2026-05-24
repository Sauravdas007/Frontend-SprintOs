"use client";

import { useState, useMemo } from "react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors, closestCorners } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useKanbanStore } from "@/store";
import { Task, TaskStatus } from "@/types";
import { KanbanColumn } from "./kanban-column";
import { KanbanCard } from "./kanban-card";
import { TaskModal } from "./task-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus } from "lucide-react";
import { motion } from "framer-motion";

const columns: { id: TaskStatus; title: string; color: string }[] = [
  { id: "backlog", title: "Backlog", color: "bg-slate-500" },
  { id: "todo", title: "To Do", color: "bg-blue-500" },
  { id: "in_progress", title: "In Progress", color: "bg-amber-500" },
  { id: "review", title: "Review", color: "bg-purple-500" },
  { id: "done", title: "Done", color: "bg-emerald-500" },
];

const mockTasks: Task[] = [
  { id: "t1", title: "Design system architecture", description: "Create high-level architecture diagram", status: "backlog", priority: "high", storyPoints: 8, assigneeId: "1", assignee: { id: "1", email: "dev1@test.com", name: "Alice", role: "DEVELOPER", createdAt: "" }, projectId: "1", labels: [{ id: "l1", name: "architecture", color: "#6366f1" }], dueDate: "2024-12-01", createdAt: "", updatedAt: "" },
  { id: "t2", title: "Setup CI/CD pipeline", description: "Configure GitHub Actions", status: "todo", priority: "critical", storyPoints: 5, assigneeId: "2", assignee: { id: "2", email: "dev2@test.com", name: "Bob", role: "DEVELOPER", createdAt: "" }, projectId: "1", labels: [{ id: "l2", name: "devops", color: "#ec4899" }], dueDate: "2024-11-28", createdAt: "", updatedAt: "" },
  { id: "t3", title: "Implement OAuth", description: "Google and GitHub OAuth", status: "in_progress", priority: "high", storyPoints: 13, assigneeId: "1", assignee: { id: "1", email: "dev1@test.com", name: "Alice", role: "DEVELOPER", createdAt: "" }, projectId: "1", labels: [{ id: "l3", name: "auth", color: "#f59e0b" }], dueDate: "2024-11-30", createdAt: "", updatedAt: "" },
  { id: "t4", title: "Write API docs", description: "OpenAPI spec for all endpoints", status: "review", priority: "medium", storyPoints: 3, assigneeId: "3", assignee: { id: "3", email: "dev3@test.com", name: "Charlie", role: "DEVELOPER", createdAt: "" }, projectId: "1", labels: [{ id: "l4", name: "docs", color: "#10b981" }], dueDate: "2024-12-05", createdAt: "", updatedAt: "" },
  { id: "t5", title: "Fix memory leak", description: "Investigate websocket memory leak", status: "done", priority: "critical", storyPoints: 5, assigneeId: "2", assignee: { id: "2", email: "dev2@test.com", name: "Bob", role: "DEVELOPER", createdAt: "" }, projectId: "1", labels: [{ id: "l5", name: "bug", color: "#ef4444" }], dueDate: "2024-11-25", createdAt: "", updatedAt: "" },
  { id: "t6", title: "Optimize DB queries", description: "Add indexes and cache layer", status: "todo", priority: "medium", storyPoints: 8, assigneeId: "1", assignee: { id: "1", email: "dev1@test.com", name: "Alice", role: "DEVELOPER", createdAt: "" }, projectId: "1", labels: [{ id: "l6", name: "perf", color: "#8b5cf6" }], dueDate: "2024-12-10", createdAt: "", updatedAt: "" },
];

export function KanbanBoard() {
  const { tasks, setTasks, searchQuery, setSearchQuery, filterPriority, setFilterPriority } = useKanbanStore();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // Initialize with mock data if empty
  useState(() => {
    if (tasks.length === 0) setTasks(mockTasks);
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority = !filterPriority || task.priority === filterPriority;
      return matchesSearch && matchesPriority;
    });
  }, [tasks, searchQuery, filterPriority]);

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;

    if (columns.some((c) => c.id === newStatus)) {
      const updated = tasks.map((t) =>
        t.id === taskId ? { ...t, status: newStatus } : t
      );
      setTasks(updated);
    }
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-64"
            />
          </div>
          <div className="flex items-center gap-1">
            {["low", "medium", "high", "critical"].map((p) => (
              <Badge
                key={p}
                variant={filterPriority === p ? "default" : "outline"}
                className="cursor-pointer capitalize"
                onClick={() => setFilterPriority(filterPriority === p ? null : p)}
              >
                {p}
              </Badge>
            ))}
          </div>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Task
        </Button>
      </div>

      {/* Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={filteredTasks.filter((t) => t.status === column.id)}
            />
          ))}
        </div>
        <DragOverlay>
          {activeTask ? <KanbanCard task={activeTask} isOverlay /> : null}
        </DragOverlay>
      </DndContext>

      <TaskModal />
    </div>
  );
}
