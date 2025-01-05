import { baseApi } from "@/redux/api/baseApi";

const SESSION_URL = "/session";

export const sessionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postFocusSession: build.mutation({
      query: (data) => ({
        url: `${SESSION_URL}/focus-session`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["session", "user"],
    }),
    getFocusMetrics: build.query({
      query: () => {
        return {
          url: `${SESSION_URL}/focus-metrics`,
          method: "GET",
        };
      },
      providesTags: ["session", "user"],
    }),
    getStreaks: build.query({
      query: () => {
        return {
          url: `${SESSION_URL}/streaks`,
          method: "GET",
        };
      },
      providesTags: ["session", "user"],
    }),
    getBadges: build.query({
      query: () => {
        return {
          url: `${SESSION_URL}/badges`,
          method: "GET",
        };
      },
      providesTags: ["session", "user"],
    }),
  }),
});

export const {
  usePostFocusSessionMutation,
  useGetFocusMetricsQuery,
  useGetStreaksQuery,
  useGetBadgesQuery,
} = sessionApi;
