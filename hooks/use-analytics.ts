"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { AnalyticsData, ApiResponse } from "@/types";

export function useAnalytics(workspaceId?: string) {
  return useQuery({
    queryKey: ["analytics", workspaceId],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<AnalyticsData>>(`/analytics?workspaceId=${workspaceId}`);
      return data.data;
    },
    enabled: !!workspaceId,
  });
}
