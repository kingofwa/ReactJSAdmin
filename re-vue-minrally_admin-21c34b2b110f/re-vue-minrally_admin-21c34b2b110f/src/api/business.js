import { API_PATHS } from '@config/api-paths';
import httpRequest from './http-request';

export const getBusiness = params => {
  return httpRequest
    .get(API_PATHS.operators, { params })
    .then(response => {
      const { data, meta } = response.data;
      return Promise.resolve({ data, meta });
    })
    .catch(error => Promise.reject(error));
};

export const getBusinessDetail = id => {
  return httpRequest
    .get(`${API_PATHS.operators}/${id}`)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error));
};

export const updateBusinessInfo = (id, params) => {
  return httpRequest
    .put(`${API_PATHS.operators}/${id}`, params)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error.message));
};

export const createBusinessInfo = params => {
  return httpRequest
    .post(`${API_PATHS.operators}`, params)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message));
};

export const getBusinessSeries = (id, params) => {
  return httpRequest
    .get(API_PATHS.operatorSeries.replace(/:operator_id/, id), { params })
    .then(response => {
      const { data, meta } = response.data;
      return Promise.resolve({ data, meta });
    })
    .catch(error => Promise.reject(error));
};

export const getBusinessGames = (id, params) => {
  return httpRequest
    .get(API_PATHS.operatorGames.replace(/:operator_id/, id), { params })
    .then(response => {
      const { data, meta } = response.data;
      return Promise.resolve({ data, meta });
    })
    .catch(error => Promise.reject(error));
};

export const deleteBusiness = id => {
  return httpRequest
    .delete(`${API_PATHS.operators}/${id}`)
    .catch(error => Promise.reject(error.message));
};

export const uploadCSV = (id, params) => {
  return httpRequest
    .post(API_PATHS.operatorCsv.replace(/:id/, id), params)
    .then(response => {
      const { data } = response;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message));
};

export const sendPassword = id => {
  return httpRequest
    .post(API_PATHS.sendPassword.replace(/:id/, id))
    .then(response => {
      const { data } = response;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message));
};

//Business Account

export const getBusinessAccInfo = () => {
  return httpRequest
    .get(API_PATHS.accInfo)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message));
};

export const updateBusinessAccInfo = params => {
  return httpRequest
    .put(API_PATHS.accInfo, params)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message));
};

export const getGrandRally = params => {
  return httpRequest
    .get(API_PATHS.series, { params })
    .then(response => {
      const { data, meta } = response.data;
      return Promise.resolve({ data, meta });
    })
    .catch(error => Promise.reject(error?.message));
};

export const createGrandRally = params => {
  return httpRequest
    .post(API_PATHS.series, params)
    .then(response => {
      const { data } = response;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message));
};

export const getOrphanGames = () => {
  return httpRequest
    .get(API_PATHS.orphanGames)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error));
};

export const getRally = params => {
  return httpRequest
    .get(API_PATHS.games, { params })
    .then(response => {
      const { data, meta } = response.data;
      return Promise.resolve({ data, meta });
    })
    .catch(error => Promise.reject(error?.message));
};

export const changeBusinessPassword = params => {
  return httpRequest
    .put(`${API_PATHS.changePassword}`, params)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message));
};

export const createBusinessRally = params => {
  return httpRequest
    .post(API_PATHS.games, params)
    .then(response => {
      const { data } = response?.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message || error || ''));
};

export const forgotPasswordBusiness = params => {
  return httpRequest
    .post(`${API_PATHS.password}`, params)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message));
};

export const resetPasswordBusiness = params => {
  return httpRequest
    .put(`${API_PATHS.password}`, params)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message));
};
