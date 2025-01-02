import timerReducer from "./features/timerSlice";

import { baseApi } from "./api/baseApi";

export const reducer = {
  timer: timerReducer,

  [baseApi.reducerPath]: baseApi.reducer,
};
