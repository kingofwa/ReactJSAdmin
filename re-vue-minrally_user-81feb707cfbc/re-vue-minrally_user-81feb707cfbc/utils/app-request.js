import axios from "axios";
import { ERROR_MESSAGES } from "@config/messages";
import { clearCredentials, retrieveCredentials } from "@utils/storage/auth";

const appRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
  timeout: 30000
});

appRequest.interceptors.request.use(config => {
  const credentials = retrieveCredentials();
  if (credentials) {
    /* eslint-disable no-param-reassign */
    config.headers.common["access-token"] = credentials.accessToken;
    config.headers.common.client = credentials.client;
    config.headers.common.uid = credentials.uid;
    /* eslint-enable no-param-reassign */
  }
  // config.headers.common["access-token"] = "8jWlxjhFlk98bdp7G1W7iA";
  // config.headers.common.client = "w_Nd1XejAvzTN1MHQYBdqw";
  // config.headers.common.uid = "user2@minrally.com";
  return config;
});

appRequest.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;
    let errorResponse = {
      message: error.message
    };

    if (response) {
      if (response.status === 401) {
        clearCredentials();
        // window.location.href = "/401";
      }
      if (response.status <= 504 && response.status >= 500) {
        // window.location.href = "/500";
      }

      // TODO: TEMP -  comment the line below to ease debugging - error API
      // if (response.status >= 404 && response.status < 422) {
      //   window.location.href = '/404';
      // }

      const { errors } = response.data;
      let message = ERROR_MESSAGES.default;
      if (errors) {
        message = errors.full_messages
          ? errors.full_messages.join(",")
          : errors.join(",");
      }
      errorResponse = {
        status: response.status,
        message
      };
    }
    return Promise.reject(errorResponse);
  }
);

export default appRequest;
