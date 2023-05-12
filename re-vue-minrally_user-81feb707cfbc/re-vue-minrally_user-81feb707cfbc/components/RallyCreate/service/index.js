/* eslint-disable import/prefer-default-export */
import API_PATHS from "@config/api-paths";
import appRequest from "@utils/app-request";

/* Create rally - create_1-1ラリー情報_sp */

/* Rally information */

// User create a game
export const createGames = payloads => {
  const url = API_PATHS.user.games;
  return appRequest
    .post(url, payloads)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

export const editGames = (id, payloads) => {
  const url = `${API_PATHS.user.games}/${id}`;
  return appRequest
    .put(url, payloads)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

export const getRallyInfo = rallyId => {
  const url = `${API_PATHS.user.games}/${rallyId}`;
  return appRequest
    .get(url)
    .then(response => {
      return Promise.resolve(response.data?.data);
    })
    .catch(error => Promise.reject(error.message));
};

// Get spots
export const GetSpots = gameId => {
  const url = `${API_PATHS.user.games}/${gameId}/spots`;
  return appRequest
    .get(url)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

/* Create rally - create_3-1システム設定_sp */

// Get list series for selection when create game

export const GetListSeries = params => {
  const url = `${API_PATHS.user.series}/select`;
  return appRequest
    .get(url, { params })
    .then(response => {
      return Promise.resolve(response.data?.data);
    })
    .catch(error => Promise.reject(error.message));
};

// Get list reward templates when create game
export const getListRewardTemplate = () => {
  const url = API_PATHS.user.reward;
  return appRequest
    .get(url)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

// Get spots detail
export const GetSpotsDetail = (gameId, idSpot) => {
  const url = `${API_PATHS.user.games}/${gameId}/spots/${idSpot}`;
  return appRequest
    .get(url)
    .then(response => {
      return Promise.resolve({
        data: response.data?.data,
        game: response.data?.extra?.game
      });
    })
    .catch(error => Promise.reject(error.message));
};

// post setup when create game select series
export const CreateSeriesSetup = (gameId, payloads) => {
  const url = `${API_PATHS.user.games}/${gameId}`;
  return appRequest
    .put(url, payloads)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

// post setup when create game and crete series
export const CreateSeries = (gameId, payloads) => {
  const url = `${API_PATHS.user.games}/${gameId}/series`;
  return appRequest
    .post(url, payloads)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

// Update spots detail
export const UpdateSpotsDetail = (gameId, idSpot, payload) => {
  const url = `${API_PATHS.user.games}/${gameId}/spots/${idSpot}`;
  return appRequest
    .put(url, payload)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error?.message));
};

export const UpdateSpotsDetailDraft = (gameId, idSpot, payload) => {
  const url = `${API_PATHS.user.games}/${gameId}/spots/${idSpot}/save-draft`;
  return appRequest
    .put(url, payload)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error?.message));
};

export const createSpot = (gameId, payload) => {
  const url = `${API_PATHS.user.games}/${gameId}/spots`;
  return appRequest
    .post(url, payload)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error?.message));
};

export const createSpotDraft = (gameId, payload) => {
  const url = `${API_PATHS.user.games}/${gameId}/spots/save-draft`;
  return appRequest
    .post(url, payload)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

// Show a certificate image of series

export const GetCertificate = id => {
  const url = `${API_PATHS.user.series}/${id}/certificate_images`;
  return appRequest
    .get(url)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

// Update a certificate image of series

export const UpdateCertificate = (id, payload) => {
  const url = `${API_PATHS.user.series}/${id}/certificate_images`;
  return appRequest
    .put(url, payload)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

/* create_4-1設定完了_sp - confirmation */

// preview game
export const GetPreviewGame = id => {
  const url = `${API_PATHS.user.games}/${id}/preview`;
  return appRequest
    .get(url)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

// publish a game
export const publishGame = id => {
  const url = `${API_PATHS.user.games}/${id}/publish`;
  return appRequest
    .put(url)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

export const deleteSpot = (rallyId, spotId) => {
  const url = API_PATHS.user.deleteSpot
    .replace(/:rallyId/, rallyId)
    .replace(/:spotId/, spotId);
  return appRequest
    .delete(url)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

export const UpdateSpotOrder = (id, params) => {
  const url = API_PATHS.user.spotOrder.replace(/:id/, id);
  return appRequest
    .put(url, params)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message));
};
