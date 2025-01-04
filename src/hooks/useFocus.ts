import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchFocusMetrics, logFocusSession } from "@/services/focusService";

// Fetch User Metrics
export const useFocusMetrics = (userId: string) =>
  useQuery(["focusMetrics", userId], () => fetchFocusMetrics(userId));

// Log Focus Session
export const useLogFocusSession = () => {
  const queryClient = useQueryClient();

  return useMutation(logFocusSession, {
    onSuccess: () => {
      queryClient.invalidateQueries(["focusMetrics"]); // Refresh metrics after session logging
    },
  });
};
