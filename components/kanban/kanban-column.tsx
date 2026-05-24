"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Task, TaskStatus } from "@/types";
import { KanbanCard } from "./kanban-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface KanbanColumnProps {
  column: { id: TaskStatus; title: string; color: string };
  tasks: Task[];
}

export function KanbanColumn({ column, tasks }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex flex-col w-80 shrink-0 rounded-xl border bg-muted/30 transition-colors duration-200",
        isOver && "border-primary/50 bg-primary/5 ring-2 ring-primary/20"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center gap-2">
          <div className={cn("h-2 w-2 rounded-full", column.color)} />
          <h3 className="font-semibold text-sm">{column.title}</h3>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Tasks */}
      <div className="flex-1 p-2 space-y-2 min-h-[200px]">
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task, i) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <KanbanCard task={task} />
            </motion.div>
          ))}
        </SortableContext>
        {tasks.length === 0 && (
          <div className="flex items-center justify-center h-32 text-sm text-muted-foreground border-2 border-dashed border-muted-foreground/20 rounded-lg">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
}
