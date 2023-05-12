import API_PATHS from "@config/api-paths";
import appRequest from "@utils/app-request";

export const resetPassword = params => {
  return appRequest
    .post(API_PATHS.password, params)
    .catch(error => Promise.reject(error.message));
};

export const updatePassword = params => {
  return appRequest
    .put(API_PATHS.password, params)
    .catch(error => Promise.reject(error.message));
};
