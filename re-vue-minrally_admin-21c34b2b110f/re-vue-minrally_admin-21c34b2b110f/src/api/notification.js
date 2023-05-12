import { API_PATHS } from '@config/api-paths';
import httpRequest from './http-request';

export const getNotification = params => {
  return httpRequest
    .get(API_PATHS.notifications, { params })
    .then(response => {
      const { data, meta } = response?.data;
      return Promise.resolve({ data, meta });
    })
    .catch(error => Promise.reject(error));
};

export const getNotificationDetail = id => {
  return httpRequest
    .get(`${API_PATHS.notifications}/${id}`)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error));
};

export const updateNotification = (id, params) => {
  return httpRequest
    .put(`${API_PATHS.notifications}/${id}`, params)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error.message));
};

export const createNotification = params => {
  return httpRequest
    .post(`${API_PATHS.notifications}`, params)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error.message));
};

export const deleteNotification = id => {
  return httpRequest
    .delete(`${API_PATHS.notifications}/${id}`)
    .catch(error => Promise.reject(error.message));
};
