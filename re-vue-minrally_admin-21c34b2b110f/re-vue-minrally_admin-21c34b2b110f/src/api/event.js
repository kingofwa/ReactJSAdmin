import { API_PATHS } from '@config/api-paths';
import httpRequest from './http-request';

export const updateEvent = (id, params) => {
  return httpRequest
    .put(`${API_PATHS.games}/${id}`, params)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message || error || ''));
};

export const getEventDetail = id => {
  return httpRequest
    .get(`${API_PATHS.games}/${id}`)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message || error || ''));
};

export const deleteEvent = id => {
  return httpRequest
    .delete(`${API_PATHS.games}/${id}`)
    .catch(error => Promise.reject(error?.message || error || ''));
};

export const deleteRallyEvent = (series_id, game_id) => {
  return httpRequest
    .delete(
      API_PATHS.seriesEvent
        .replace(/:series_id/, series_id)
        .replace(/:game_id/, game_id)
    )
    .catch(error => Promise.reject(error?.message || error || ''));
};

export const getEventAnalysis = (id, params) => {
  return httpRequest
    .get(API_PATHS.eventAnalysis.replace(/:id/, id), { params })
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message || error || ''));
};

export const createRally = (id, params) => {
  return httpRequest
    .post(API_PATHS.operatorGames.replace(/:operator_id/, id), params)
    .then(response => {
      const { data } = response?.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message || error || ''));
};

export const getRallySpot = id => {
  return httpRequest
    .get(API_PATHS.gameSpots.replace(/:id/, id))
    .then(response => {
      const { data } = response;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message || error || ''));
};

export const deleteRallySpot = id => {
  return httpRequest
    .delete(API_PATHS.gameSpots.replace(/:id/, id))
    .then(response => {
      const { data } = response;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message || error || ''));
};

export const getRallyDetailSpot = (gameId, id) => {
  return httpRequest
    .get(API_PATHS.gameSpot.replace(/:id/, id).replace(/:game_id/, gameId))
    .then(response => {
      const { data, extra } = response.data;
      return Promise.resolve({ ...data, ...extra });
    })
    .catch(error => Promise.reject(error?.message || error || ''));
};

export const updateSpot = (gameId, spotId, params) => {
  const url = API_PATHS.gameSpot
    .replace(/:game_id/, gameId)
    .replace(/:id/, spotId);
  return httpRequest
    .put(url, params)
    .then(response => {
      const { data } = response?.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message || error || ''));
};

export const updateSpotDraft = (gameId, spotId, params) => {
  const url = API_PATHS.gameSpotDraft
    .replace(/:game_id/, gameId)
    .replace(/:id/, spotId);
  return httpRequest
    .put(url, params)
    .then(response => {
      const { data } = response?.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message || error || ''));
};

export const createSpot = (gameId, params) => {
  const url = API_PATHS.gameSpots.replace(/:id/, gameId);
  return httpRequest
    .post(url, params)
    .then(response => {
      const { data } = response?.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message || error || ''));
};

export const createSpotDraft = (gameId, params) => {
  const url = API_PATHS.gameSpotsDraft.replace(/:id/, gameId);
  return httpRequest
    .post(url, params)
    .then(response => {
      const { data } = response?.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message || error || ''));
};

export const updateSpotOrder = (gameId, params) => {
  const url = API_PATHS.gameSpotOrder.replace(/:game_id/, gameId);
  return httpRequest
    .put(url, params)
    .then(response => {
      const { data } = response?.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message || error || ''));
};

export const getAllSeries = gameId => {
  return httpRequest
    .get(API_PATHS.createSeries.replace(/:id/, gameId))
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message || error || ''));
};

export const saveEventFinnish = (gameId, params) => {
  const url = API_PATHS.eventFinnish.replace(/:id/, gameId);
  return httpRequest
    .put(url, params)
    .then(response => {
      const { data } = response?.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message || error || ''));
};

export const saveEventFinnishDraft = (gameId, params) => {
  const url = API_PATHS.eventFinnishDraft.replace(/:id/, gameId);
  return httpRequest
    .put(url, params)
    .then(response => {
      const { data } = response?.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message || error || ''));
};

export const deleteSpot = (gameId, spotId) => {
  return httpRequest
    .delete(
      API_PATHS.eventSpot
        .replace(/:game_id/, gameId)
        .replace(/:spot_id/, spotId)
    )
    .catch(error => Promise.reject(error?.message || error || ''));
};
