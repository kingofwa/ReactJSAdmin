/* eslint-disable import/no-unresolved */
import API_PATHS from "@config/api-paths";
import appRequest from "@utils/app-request";

// eslint-disable-next-line import/prefer-default-export
export const getListPrefectures = () => {
  return appRequest
    .get(API_PATHS.prefectures)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(() => Promise.resolve({}));
};
