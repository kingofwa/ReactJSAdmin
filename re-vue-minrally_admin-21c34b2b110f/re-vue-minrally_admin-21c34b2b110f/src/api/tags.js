import { API_PATHS } from '@config/api-paths';
import httpRequest from './http-request';

export const getTags = params => {
  return httpRequest
    .get(API_PATHS.tags, { params })
    .then(response => {
      const { data, meta } = response.data;
      return Promise.resolve({ data, meta });
    })
    .catch(error => Promise.reject(error));
};

export const updateFeaturedHashtags = params => {
  return httpRequest
    .put(API_PATHS.featuredHashtags, params)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error.message));
};

export const getRankingTopHashtags = () => {
  return httpRequest
    .get(`${API_PATHS.rankingTopHashtags}`)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error.message));
};
