/* eslint-disable import/prefer-default-export */
import API_PATHS from "@config/api-paths";
import appRequest from "@utils/app-request";

export const getProfileInfo = id => {
  return appRequest
    .get(API_PATHS.profile.info.replace(/:id/, id))
    .then(response => {
      const profile = response.data.data;
      return Promise.resolve(profile);
    })
    .catch(() => Promise.resolve({}));
};

export const getProfileGamePlaying = (id, params) => {
  const url = API_PATHS.profile.playingGame.replace(/:id/, id);
  return appRequest
    .get(url, { params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

export const getProfileSeriPlaying = (id, params) => {
  const url = API_PATHS.profile.playingSeri.replace(/:id/, id);
  return appRequest
    .get(url, { params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

export const getProfileGameFavorite = (id, params) => {
  const url = API_PATHS.profile.favoritesGame.replace(/:id/, id);
  return appRequest
    .get(url, { params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

export const getProfileSeriFavorite = (id, params) => {
  const url = API_PATHS.profile.favoritesSeri.replace(/:id/, id);
  return appRequest
    .get(url, { params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

export const getProfileFollow = (id, params) => {
  const url = API_PATHS.profile.followings.replace(/:id/, id);
  return appRequest
    .get(url, { params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

export const getProfileGames = (id, params) => {
  const url = API_PATHS.profile.games.replace(/:id/, id);
  return appRequest
    .get(url, { params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

// Pure Service
export const getProfileCreatorSeries = (id, params) => {
  const url = API_PATHS.profile.series.replace(/:id/, id);
  return appRequest
    .get(url, { params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

// not Pure Service
export const getProfileSeries = (id, params) => {
  return appRequest
    .get(API_PATHS.profile.series.replace(/:id/, id), { params })
    .then(response => {
      const { count: total } = response.data.meta;
      const items = response.data.data;
      return Promise.resolve({ items, total });
    })
    .catch(error => Promise.reject(error.message));
};

export const getProfileSeriesDetail = seriesId => {
  return appRequest
    .get(API_PATHS.seriesDetailGames.replace(/:id/, seriesId))
    .then(response => {
      const profile = response.data.data;
      return Promise.resolve(profile);
    })
    .catch(() => Promise.resolve({}));
};

export const getSeriesDetail = (profileId, seriesId) => {
  return appRequest
    .get(
      API_PATHS.profile.seriesDetail
        .replace(/:profileId/, profileId)
        .replace(/:seriesId/, seriesId)
    )
    .then(response => {
      const profile = response.data.data;
      return Promise.resolve(profile);
    })
    .catch(() => Promise.resolve({}));
};

// favorite game
export const favoriteGame = id => {
  const url = API_PATHS.user.favoriteGame;
  return appRequest
    .post(url, id)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error));
};

// unfavorite game
export const unFavoriteGame = id => {
  const url = `${API_PATHS.user.favoriteGame}/${id}`;
  return appRequest
    .delete(url)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

export const profileFavoriteGame = item => {
  const url = API_PATHS.user.favoriteSeri;
  return appRequest
    .post(url, { ...item, is_favorite: true })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error));
};

// User follow another
export const postUserFollow = id => {
  const url = API_PATHS.user.following;
  return appRequest
    .post(url, id)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error));
};

// Favorite Seri by serie_id
export const favoriteSeri = payload => {
  const url = API_PATHS.user.favoriteSeri;
  return appRequest
    .post(url, payload)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error));
};

// Unfavorite Seri by serie_id
export const unFavoriteSeri = id => {
  const url = `${API_PATHS.user.favoriteSeri}/${id}`;
  return appRequest
    .delete(url)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};
