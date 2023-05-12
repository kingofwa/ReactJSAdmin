import { API_PATHS } from '@config/api-paths';
import httpRequest from './http-request';

export const updateSeries = (id, params) => {
  return httpRequest
    .put(`${API_PATHS.series}/${id}`, params)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message));
};

export const getSeriesDetail = id => {
  return httpRequest
    .get(`${API_PATHS.series}/${id}`)
    .then(response => {
      const { data, extra } = response.data;
      return Promise.resolve({ data, extra });
    })
    .catch(error => Promise.reject(error));
};

export const getSeriesGames = (id, params) => {
  return httpRequest
    .get(API_PATHS.seriesGames.replace(/:id/, id), { params })
    .then(response => {
      const { data, meta } = response.data;
      return Promise.resolve({ data, meta });
    })
    .catch(error => Promise.reject(error));
};

export const deleteSeries = id => {
  return httpRequest
    .delete(`${API_PATHS.series}/${id}`)
    .catch(error => Promise.reject(error?.message));
};

export const getRewardTemplates = () => {
  return httpRequest
    .get(API_PATHS.rewardTemplates)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error));
};

export const createSeries = (id, params) => {
  return httpRequest
    .post(API_PATHS.createSeries.replace(/:id/, id), params)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error.message));
};

export const getSingleGames = id => {
  return httpRequest
    .get(API_PATHS.singleGames.replace(/:id/, id))
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error));
};

export const getSeriesAnalysis = (id, params) => {
  return httpRequest
    .get(API_PATHS.seriesAnalysis.replace(/:id/, id), { params })
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error));
};
