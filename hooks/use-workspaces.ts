"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Workspace, ApiResponse } from "@/types";

const WORKSPACES_KEY = "workspaces";

export function useWorkspaces() {
  return useQuery({
    queryKey: [WORKSPACES_KEY],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<Workspace[]>>("/workspaces");
      return data.data;
    },
  });
}

export function useWorkspace(id: string) {
  return useQuery({
    queryKey: [WORKSPACES_KEY, id],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<Workspace>>(`/workspaces/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}

export function useCreateWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (workspaceData: Partial<Workspace>) => {
      const { data } = await api.post<ApiResponse<Workspace>>("/workspaces", workspaceData);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WORKSPACES_KEY] });
    },
  });
}
