"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/types";
import { useKanbanStore } from "@/store";
import { cn, priorityColors, formatDate, getInitials } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, GripVertical } from "lucide-react";
import { motion } from "framer-motion";

interface KanbanCardProps {
  task: Task;
  isOverlay?: boolean;
}

export function KanbanCard({ task, isOverlay = false }: KanbanCardProps) {
  const { setSelectedTask, setTaskModalOpen } = useKanbanStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, disabled: isOverlay });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleClick = () => {
    if (!isDragging) {
      setSelectedTask(task);
      setTaskModalOpen(true);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={handleClick}
      className={cn(
        "group relative rounded-lg border bg-card p-3 shadow-sm cursor-grab transition-all duration-200 hover:shadow-md hover:border-primary/30",
        isDragging && "opacity-50 rotate-2 scale-105 shadow-xl cursor-grabbing",
        isOverlay && "rotate-3 scale-105 shadow-2xl cursor-grabbing ring-2 ring-primary/20"
      )}
    >
      {/* Drag handle indicator */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* Labels */}
      {task.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {task.labels.map((label) => (
            <span
              key={label.id}
              className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: label.color + "20", color: label.color }}
            >
              {label.name}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h4 className="font-medium text-sm mb-1 pr-4">{task.title}</h4>
      {task.description && (
        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{task.description}</p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0", priorityColors[task.priority])}>
            {task.priority}
          </Badge>
          {task.storyPoints && (
            <span className="text-xs text-muted-foreground font-mono">{task.storyPoints}sp</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {task.dueDate && (
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {formatDate(task.dueDate)}
            </span>
          )}
          {task.assignee && (
            <Avatar className="h-6 w-6">
              <AvatarImage src={task.assignee.avatar} />
              <AvatarFallback className="text-[10px]">{getInitials(task.assignee.name)}</AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
    </div>
  );
}
