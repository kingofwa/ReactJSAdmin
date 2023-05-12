import { API_PATHS } from '@config/api-paths';
import httpRequest from './http-request';

export const getStatistics = params => {
  return httpRequest
    .get(API_PATHS.statistics, { params })
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message));
};

export const getFeaturedHashtags = () => {
  return httpRequest
    .get(API_PATHS.featuredHashtags)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message));
};

export const updateFeaturedHashtags = params => {
  return httpRequest
    .put(API_PATHS.featuredHashtags, params)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message));
};
