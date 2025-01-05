import { persistReducer } from "redux-persist";

import timerReducer from "./features/timer/timerSlice";
import authReducer from "./features/auth/authSlice";
import { baseApi } from "./api/baseApi";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
export const reducer = {
  auth: persistedAuthReducer,
  timer: timerReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};
