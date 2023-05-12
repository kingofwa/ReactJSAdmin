/* eslint-disable import/no-unresolved */
import API_PATHS from "@config/api-paths";
import appRequest from "@utils/app-request";

// eslint-disable-next-line import/prefer-default-export
export const getGames = params => {
  return appRequest
    .get(API_PATHS.games, { params })
    .then(response => {
      const { count: total } = response.data.meta;
      const items = response.data.data;
      return Promise.resolve({ items, total });
    })
    .catch(error => Promise.reject(error.message));
};
