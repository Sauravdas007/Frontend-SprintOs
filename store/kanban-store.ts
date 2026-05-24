import { create } from "zustand";
import { Task, TaskStatus } from "@/types";

interface KanbanState {
  tasks: Task[];
  searchQuery: string;
  filterPriority: string | null;
  filterAssignee: string | null;
  selectedTask: Task | null;
  taskModalOpen: boolean;

  setTasks: (tasks: Task[]) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  setSearchQuery: (query: string) => void;
  setFilterPriority: (priority: string | null) => void;
  setFilterAssignee: (assignee: string | null) => void;
  setSelectedTask: (task: Task | null) => void;
  setTaskModalOpen: (open: boolean) => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
}

export const useKanbanStore = create<KanbanState>((set) => ({
  tasks: [],
  searchQuery: "",
  filterPriority: null,
  filterAssignee: null,
  selectedTask: null,
  taskModalOpen: false,

  setTasks: (tasks) => set({ tasks }),
  updateTaskStatus: (taskId, status) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId ? { ...t, status } : t
      ),
    })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterPriority: (priority) => set({ filterPriority: priority }),
  setFilterAssignee: (assignee) => set({ filterAssignee: assignee }),
  setSelectedTask: (task) => set({ selectedTask: task }),
  setTaskModalOpen: (open) => set({ taskModalOpen: open }),
  addTask: (task) =>
    set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (taskId, updates) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId ? { ...t, ...updates } : t
      ),
    })),
  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== taskId),
    })),
}));
