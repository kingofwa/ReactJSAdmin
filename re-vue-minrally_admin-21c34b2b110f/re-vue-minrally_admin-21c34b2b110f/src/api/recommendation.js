import { API_PATHS } from '@config/api-paths';
import httpRequest from './http-request';

export const getRecommendations = (params) => {
  return httpRequest
    .get(API_PATHS.recommended, { params })
    .then((response) => {
      const { data, meta } = response.data;
      return Promise.resolve({ data, meta });
    })
    .catch(error => Promise.reject(error));
};


export const updateRecommended = params => {
  return httpRequest
    .put(API_PATHS.updateRecommended, params)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error.message));
};

