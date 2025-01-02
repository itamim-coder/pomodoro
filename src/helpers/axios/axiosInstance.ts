import { ResponseSuccessType } from "@/types";
import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

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