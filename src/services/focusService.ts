import apiClient from "@/helpers/axios";


export const fetchFocusMetrics = async (userId: string) => {
  const response = await apiClient.get("/focus-metrics", { params: { userId } });
  return response.data;
};

export const logFocusSession = async (data: { userId: string; duration: number; sessionType: string }) => {
  const response = await apiClient.post("/focus-session", data);
  return response.data;
};
