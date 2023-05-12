/* eslint-disable import/prefer-default-export */
import API_PATHS from "@config/api-paths";
import appRequest from "@utils/app-request";

/* Tab1 - Player */

// User get favorited game list
export const getUserFavoriteGame = params => {
  const url = API_PATHS.user.favoriteGame;
  return appRequest
    .get(url, { params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

export const getUserFavoriteSeries = params => {
  const url = API_PATHS.user.favoriteSeri;
  return appRequest
    .get(url, { params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

// User unfavorite a game
export const userUnfavoriteGame = id => {
  const url = `${API_PATHS.user.favoriteGame}/${id}`;
  return appRequest
    .delete(url)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

// User unfavorite a series of users
export const userUnfavoriteSeries = id => {
  const url = `${API_PATHS.user.favoriteSeri}/${id}`;
  return appRequest
    .delete(url)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

// User checkin history
export const getUserCheckinHistory = params => {
  const url = API_PATHS.user.checkinHistory;
  return appRequest
    .get(url, { params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

// Users following
export const getUserFollowing = params => {
  const url = API_PATHS.user.following;
  return appRequest
    .get(url, { params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

export const getUserFollowingById = (id, params) => {
  const url = API_PATHS.userFollowings.replace(/:id/, id);
  return appRequest
    .get(url, { params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

/* Tab2 - Creator */

/* Creator Application */

// Get application details

export const getApplication = () => {
  const url = API_PATHS.creatorApplication;
  return appRequest
    .get(url)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

// Post application details

export const postApplication = data => {
  const url = API_PATHS.creatorApplication;
  return appRequest
    .post(url, data)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

// Get list series
export const getUserSeries = params => {
  const url = API_PATHS.user.series;
  return appRequest
    .get(url, { params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

// Show a serie

export const getUserASerie = id => {
  const url = `${API_PATHS.user.series}/${id}`;
  return appRequest
    .get(url)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

// Update a serie
export const putUserASerie = (id, data) => {
  const url = `${API_PATHS.user.series}/${id}`;
  return appRequest
    .put(url, data)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

export const getUserGames = params => {
  const url = API_PATHS.user.games;
  return appRequest
    .get(url, { params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

// Users followers
export const getUsersFollower = params => {
  const url = API_PATHS.user.followers;
  return appRequest
    .get(url, { params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

export const getUsersFollowerByUserId = (id, params) => {
  const url = API_PATHS.userFollowers.replace(/:id/, id);
  return appRequest
    .get(url, { params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

// add follow user

export const postUserFollower = id => {
  const url = API_PATHS.user.followers;
  return appRequest
    .post(url, id)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

// delete follow user

export const deleteUserFollower = id => {
  const url = `${API_PATHS.user.following}/${id}`;
  return appRequest
    .delete(url)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

export const addUserFollower = payload => {
  const url = API_PATHS.user.following;
  return appRequest
    .post(url, payload)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};
// Get list games for selection when edit serie - old API
export const getGamesSelect = params => {
  const url = `${API_PATHS.user.games}/select`;
  return appRequest
    .get(url, { params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

// Get list games for selection when edit serie - new API
export const getGamesInSeri = params => {
  const url = API_PATHS.user.singleGames;
  return appRequest
    .get(url, { params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

// create seri - new API
export const createGameSeri = payloads => {
  const url = API_PATHS.user.series;
  return appRequest
    .post(url, payloads)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

/* Mypage - player  */

// User get participant games list
export const getUserPlayingGames = params => {
  const url = API_PATHS.user.playingGames;
  return appRequest
    .get(url, { params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

export const getUserPlayingSeries = params => {
  const url = API_PATHS.user.playingSeries;
  return appRequest
    .get(url, { params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

/* Mypage - creator  */

// get Certificate Template for Seri
export const getCertificateSeri = id => {
  const url = API_PATHS.user.seriesCertificate.replace(/\[id\]/, id);
  return appRequest
    .get(url)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

export const updateCertificateSeri = (id, payload) => {
  const url = API_PATHS.user.seriesCertificate.replace(/\[id\]/, id);
  return appRequest
    .put(url, payload)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

// get Certificate Template for Rally
export const getCertificateRally = id => {
  const url = API_PATHS.user.rallyCertificate.replace(/\[id\]/, id);
  return appRequest
    .get(url)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

export const updateCertificateRally = (id, payload) => {
  const url = API_PATHS.user.rallyCertificate.replace(/\[id\]/, id);
  return appRequest
    .put(url, payload)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

// const activitiesData = {
//   status: "success",
//   code: 200,
//   meta: {
//     page: 1,
//     prev: null,
//     next: 2,
//     count: 64
//   },
//   extra: null,
//   data: [
//     {
//       id: "8d289d3f-6a4d-4aca-b97d-ac54b965586c",
//       title: "そう考えるとたまらないほどを制覇しました🎉",
//       action: "completed",
//       created_at: "2022-11-07T18:05:24.575+09:00",
//       content: {
//         activity_type: "completed_serie",
//         serie_name: "そう考えるとたまらないほど",
//         serie_id: "5f3c9ab8-06e2-4f70-850a-de39eae574a8",
//         sub_text: "[serie_name]を制覇しました🎉"
//       },
//       user: {
//         id: "ed11951d-ed5e-415a-a652-0df4210a8c1d",
//         user_name: "user18-edited",
//         avatar_url: null
//       },
//       related_entity: {
//         id: "5f3c9ab8-06e2-4f70-850a-de39eae574a8",
//         name: "そう考えるとたまらないほど",
//         object_type: "serie",
//         photo_url: null
//       }
//     },
//     {
//       id: "1283aca6-a3a0-47a4-8d2e-0012ae3a1cd5",
//       title: "いつか雑誌で読んだのでしたがを制覇しました🎉",
//       action: "completed",
//       created_at: "2022-11-07T18:05:24.465+09:00",
//       content: {
//         activity_type: "completed_game",
//         game_name: "いつか雑誌で読んだのでしたが",
//         game_id: "1ab7629a-828c-4c15-b90e-71485d49c0c5",
//         sub_text: "[game_name]を制覇しました🎉"
//       },
//       user: {
//         id: "ed11951d-ed5e-415a-a652-0df4210a8c1d",
//         user_name: "user18-edited",
//         avatar_url: null
//       },
//       related_entity: {
//         id: "1ab7629a-828c-4c15-b90e-71485d49c0c5",
//         name: "いつか雑誌で読んだのでしたが",
//         object_type: "game",
//         photo_url: null
//       }
//     },
//     {
//       id: "16f12625-4c58-431d-9398-2fa48420a4b1",
//       title:
//         "いつか雑誌で読んだのでしたがのそして教室じゅうはしばらく机の蓋を...にチェックインしました✅",
//       action: "checked_in",
//       created_at: "2022-11-07T18:05:24.158+09:00",
//       content: {
//         activity_type: "checked_in_spot",
//         game_name: "いつか雑誌で読んだのでしたが",
//         game_id: "1ab7629a-828c-4c15-b90e-71485d49c0c5",
//         spot_name: "そして教室じゅうはしばらく机の蓋を...",
//         spot_id: "41953ec5-0515-4fa9-be07-1b3b24c7a5ff",
//         sub_text: "[game_name]の[spot_name]にチェックインしました✅"
//       },
//       user: {
//         id: "ed11951d-ed5e-415a-a652-0df4210a8c1d",
//         user_name: "user18-edited",
//         avatar_url: null
//       },
//       related_entity: {
//         id: "41953ec5-0515-4fa9-be07-1b3b24c7a5ff",
//         name: "そして教室じゅうはしばらく机の蓋を...",
//         object_type: "spot",
//         photo_url: null
//       }
//     }
//   ]
// };

export const getUserActivities = params => {
  return appRequest
    .get(API_PATHS.user.activities, { params })
    .then(response => {
      const { count } = response.data.meta;
      const items = response.data.data;
      return Promise.resolve({ items, total: count });
    })
    .catch(error => Promise.reject(error.message));
};

// export const getUserActivities = () => {
//   return { items: activitiesData.data, total: activitiesData.meta.count };
// };
