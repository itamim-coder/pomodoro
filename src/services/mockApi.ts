// services/mockApi.ts
import { mockFocusMetrics } from "../data/mockData";

export const fetchMockFocusMetrics = (): Promise<typeof mockFocusMetrics> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockFocusMetrics), 1000); // Simulates a network delay
  });
};
