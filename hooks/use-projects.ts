"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Project, ApiResponse } from "@/types";

const PROJECTS_KEY = "projects";

export function useProjects(workspaceId?: string) {
  return useQuery({
    queryKey: [PROJECTS_KEY, workspaceId],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<Project[]>>(`/projects?workspaceId=${workspaceId}`);
      return data.data;
    },
    enabled: !!workspaceId,
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: [PROJECTS_KEY, id],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<Project>>(`/projects/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectData: Partial<Project>) => {
      const { data } = await api.post<ApiResponse<Project>>("/projects", projectData);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROJECTS_KEY] });
    },
  });
}
