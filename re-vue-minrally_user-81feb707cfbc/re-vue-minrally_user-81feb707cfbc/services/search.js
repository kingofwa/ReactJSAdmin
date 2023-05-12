/* eslint-disable import/prefer-default-export */
import API_PATHS from "@config/api-paths";
import appRequest from "@utils/app-request";

export const getTags = () => {
  return appRequest
    .get(API_PATHS.tags)
    .then(response => {
      const profile = response.data.data;
      return Promise.resolve(profile);
    })
    .catch(() => Promise.resolve({}));
};

export const getProfiles = params => {
  return appRequest
    .get(API_PATHS.profilesRecommend, { params })
    .then(response => {
      const { count: total } = response.data.meta;
      const items = response.data.data;
      return Promise.resolve({ items, total });
    })
    .catch(error => Promise.reject(error.message));
};

export const searchProfiles = params => {
  return appRequest
    .get(API_PATHS.searchProfiles, { params })
    .then(response => {
      const { count: total } = response.data.meta;
      const items = response.data.data;
      return Promise.resolve({ items, total });
    })
    .catch(error => Promise.reject(error.message));
};

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

export const searchGames = params => {
  return appRequest
    .get(API_PATHS.searchGames, { params })
    .then(response => {
      const { count: total } = response.data.meta;
      const items = response.data.data;
      return Promise.resolve({ items, total });
    })
    .catch(error => Promise.reject(error.message));
};
