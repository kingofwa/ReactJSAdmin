/* eslint-disable import/no-unresolved */
import API_PATHS from "@config/api-paths";
import appRequest from "@utils/app-request";

// eslint-disable-next-line import/prefer-default-export
export const getCategories = () => {
  return appRequest
    .get(API_PATHS.categories)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(() => Promise.resolve({}));
};

export const postInquiries = params => {
  const url = API_PATHS.inquiries;
  return appRequest
    .post(url, params)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error));
};
