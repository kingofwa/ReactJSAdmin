import { API_PATHS } from '@config/api-paths';
import httpRequest from './http-request';

export const getBanners = () => {
  return httpRequest
    .get(API_PATHS.banners)
    .then(response => {
      const { data, meta } = response.data;
      return Promise.resolve({ data, meta });
    })
    .catch(error => Promise.reject(error));
};

export const createBanner = params => {
  return httpRequest
    .post(`${API_PATHS.banners}`, params)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error.message));
};

export const updateBanner = (id, params) => {
  return httpRequest
    .put(`${API_PATHS.banners}/${id}`, params)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error.message));
};

export const getBannerDetail = id => {
  return httpRequest
    .get(`${API_PATHS.banners}/${id}`)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error));
};

export const deleteBanner = id => {
  return httpRequest
    .delete(`${API_PATHS.banners}/${id}`)
    .catch(error => Promise.reject(error.message));
};

export const updateBannerOrder = params => {
  return httpRequest
    .put(API_PATHS.bannersOrder, params)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error.message));
};
