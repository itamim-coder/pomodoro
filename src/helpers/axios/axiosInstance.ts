import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { store } from "@/redux/store";
import { ResponseSuccessType } from "@/types";
import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
      const state = store.getState(); // Get the state from Redux store
      const accessToken = state.auth?.token || null; // Adjust to your Redux slice
    //   console.log(store, "Authorization Token");
    //   console.log(accessToken, "Authorization Token");
      
      if (accessToken) {
        config.headers.Authorization = `${accessToken}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  

instance.interceptors.response.use(
    //@ts-ignore
    function (response) {
        const responseObject: ResponseSuccessType = {
            data: response?.data?.data,
            meta: response?.data?.meta,
        };
        console.log(response);
        return responseObject;
    },
    async function (error) {
        if (error?.response?.status == 403) {
        } else {
            console.log(error);
            let responseObject: any = {
                statusCode: error?.response?.status || 500,
                message: "Something went wrong",
                success: false,
                errorMessages: [],
            };
            if (error?.response?.data) {
                responseObject.message =
                    error?.response?.data?.message || responseObject.message;
                responseObject.success =
                    error?.response?.data?.success || responseObject.success;
                if (error?.response?.data?.errorMessage) {
                    responseObject.errorMessages.push(
                        error?.response?.data?.errorMessage
                    );
                }
            }
            console.log(responseObject);
            return Promise.reject(responseObject);
        }
    }
);

export { instance };