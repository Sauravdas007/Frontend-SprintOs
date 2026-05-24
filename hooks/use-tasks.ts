"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Task, ApiResponse } from "@/types";
import { useKanbanStore } from "@/store";

const TASKS_KEY = "tasks";

export function useTasks(projectId?: string) {
  return useQuery({
    queryKey: [TASKS_KEY, projectId],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<Task[]>>(`/tasks?projectId=${projectId}`);
      return data.data;
    },
    enabled: !!projectId,
  });
}

export function useTask(taskId: string) {
  return useQuery({
    queryKey: [TASKS_KEY, taskId],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<Task>>(`/tasks/${taskId}`);
      return data.data;
    },
    enabled: !!taskId,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  const addTask = useKanbanStore((s) => s.addTask);

  return useMutation({
    mutationFn: async (taskData: Partial<Task>) => {
      const { data } = await api.post<ApiResponse<Task>>("/tasks", taskData);
      return data.data;
    },
    onSuccess: (newTask) => {
      addTask(newTask);
      queryClient.invalidateQueries({ queryKey: [TASKS_KEY] });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  const updateTask = useKanbanStore((s) => s.updateTask);

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Task> }) => {
      const { data } = await api.patch<ApiResponse<Task>>(`/tasks/${id}`, updates);
      return data.data;
    },
    onMutate: async ({ id, updates }) => {
      updateTask(id, updates);
      return { previousTasks: queryClient.getQueryData([TASKS_KEY]) };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData([TASKS_KEY], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [TASKS_KEY] });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  const deleteTask = useKanbanStore((s) => s.deleteTask);

  return useMutation({
    mutationFn: async (taskId: string) => {
      await api.delete(`/tasks/${taskId}`);
      return taskId;
    },
    onMutate: async (taskId) => {
      deleteTask(taskId);
      return { previousTasks: queryClient.getQueryData([TASKS_KEY]) };
    },
    onError: (_err, _taskId, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData([TASKS_KEY], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [TASKS_KEY] });
    },
  });
}
