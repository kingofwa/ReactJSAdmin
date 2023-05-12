import { API_PATHS } from '@config/api-paths';
import httpRequest from './http-request';

export const getCreator = params => {
  return httpRequest
    .get(API_PATHS.creator, { params })
    .then(response => {
      const { data, meta } = response.data;
      return Promise.resolve({ data, meta });
    })
    .catch(error => Promise.reject(error));
};

export const getCreatorDetail = id => {
  return httpRequest
    .get(`${API_PATHS.creator}/${id}`)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error));
};

export const unapprovedCreator = id => {
  return httpRequest
    .put(`${API_PATHS.creator}/${id}/reject`)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error.message));
};

export const approvedCreator = id => {
  return httpRequest
    .put(`${API_PATHS.creator}/${id}/approve`)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error.message));
};
