import { API_PATHS } from '@config/api-paths';
import httpRequest from './http-request';

export const getUsers = params => {
  return httpRequest
    .get(API_PATHS.users, { params })
    .then(response => {
      const { data, meta } = response.data;
      return Promise.resolve({ data, meta });
    })
    .catch(error => Promise.reject(error));
};

export const searchUsers = params => {
  return httpRequest
    .get(API_PATHS.searchUsers, { params })
    .then(response => {
      const { data, meta } = response.data;
      return Promise.resolve({ data, meta });
    })
    .catch(error => Promise.reject(error));
};

export const getUserDetail = id => {
  return httpRequest
    .get(`${API_PATHS.users}/${id}`)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error));
};

export const getUserPlayingSeries = (id, params) => {
  const url = API_PATHS.playingSeries.replace(/:user_id/, id);
  return httpRequest
    .get(url, { params })
    .then(response => {
      const { data, meta } = response.data;
      return Promise.resolve({ data, meta });
    })
    .catch(error => Promise.reject(error?.message));
};

export const getUserPlayingGames = (id, params) => {
  const url = API_PATHS.playingGames.replace(/:user_id/, id);
  return httpRequest
    .get(url, { params })
    .then(response => {
      const { data, meta } = response.data;
      return Promise.resolve({ data, meta });
    })
    .catch(error => Promise.reject(error?.message));
};

export const getOwnedSeries = (id, params) => {
  const url = API_PATHS.ownedSeries.replace(/:user_id/, id);
  return httpRequest
    .get(url, { params })
    .then(response => {
      const { data, meta } = response.data;
      return Promise.resolve({ data, meta });
    })
    .catch(error => Promise.reject(error?.message));
};

export const getOwnedPlaying = (id, params) => {
  const url = API_PATHS.ownedGames.replace(/:user_id/, id);
  return httpRequest
    .get(url, { params })
    .then(response => {
      const { data, meta } = response.data;
      return Promise.resolve({ data, meta });
    })
    .catch(error => Promise.reject(error?.message));
};

export const getFeaturedUsers = params => {
  return httpRequest
    .get(API_PATHS.featuredUsers, { params })
    .then(response => {
      const { data, meta } = response.data;
      return Promise.resolve({ data, meta });
    })
    .catch(error => Promise.reject(error));
};

export const updateFeaturedUser = params => {
  return httpRequest
    .put(API_PATHS.updateFeaturedUsers, params)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error.message));
};

export const deleteUser = id => {
  return httpRequest
    .delete(`${API_PATHS.users}/${id}`)
    .catch(error => Promise.reject(error.message));
};

export const getRankingTopUsers = () => {
  return httpRequest
    .get(`${API_PATHS.rankingTopUsers}`)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error.message));
};

export const getPlayerList = params => {
  return httpRequest
    .get(API_PATHS.players, { params })
    .then(response => {
      const { data, meta } = response.data;
      return Promise.resolve({ data, meta });
    })
    .catch(error => Promise.reject(error));
};

export const getPlayerDetail = id => {
  return httpRequest
    .get(`${API_PATHS.players}/${id}`)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error));
};

export const getPlayerPlaying = (id, params) => {
  const url = API_PATHS.playerPlaying.replace(/:id/, id);
  return httpRequest
    .get(url, { params })
    .then(response => {
      const { data, meta } = response.data;
      return Promise.resolve({ data, meta });
    })
    .catch(error => Promise.reject(error?.message));
};
