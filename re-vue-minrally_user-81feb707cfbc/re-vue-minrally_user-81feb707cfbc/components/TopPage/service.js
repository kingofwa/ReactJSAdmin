import API_PATHS from "@config/api-paths";
import appRequest from "@utils/app-request";

/* Top Page  */

export default null;

// get games recommended
export const getGamesRecommend = params => {
  const url = API_PATHS.gamesRecommended;
  return appRequest
    .get(url, { params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

export const getGrandRecommend = params => {
  const url = API_PATHS.grandRecommended;
  return appRequest
    .get(url, { params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

// get games nearly
export const getGamesNearly = params => {
  const url = API_PATHS.nearby;
  return appRequest
    .get(url, { params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

export const getGamesNearByCheckin = params => {
  const url = API_PATHS.nearby;
  return appRequest
    .get(url, { params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

// get Game Rally Ranking
export const getGamesRally = params => {
  const url = API_PATHS.games;
  return appRequest
    .get(url, { params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

// get Game Rally Ranking
export const getSeriesRally = params => {
  const url = API_PATHS.series;
  return appRequest
    .get(url, { params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

// get users Rally
export const getPlayersRaking = params => {
  const url = API_PATHS.players;
  return appRequest
    .get(url, { params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

// get user Rally Master
export const getRallyMasterRaking = params => {
  const url = API_PATHS.creators;
  return appRequest
    .get(url, { params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

export const getSeriRanking = (params, id) => {
  const url = API_PATHS.seriRanking.replace(/:id/, id);
  return appRequest
    .get(url, { params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

export const getRallyRaking = (params, id) => {
  const url = API_PATHS.rallyRanking.replace(/:id/, id);
  return appRequest
    .get(url, { params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};
