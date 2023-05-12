/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import API_PATHS from "@config/api-paths";
import appRequest from "@utils/app-request";

// eslint-disable-next-line import/prefer-default-export
export const getDetailGame = id => {
  const url = API_PATHS.detailGame.replace(/:id/, id);

  return appRequest
    .get(url)
    .then(response => {
      const { data } = response.data;
      const current_status = response?.data?.extra;
      return Promise.resolve({ ...data, ...current_status });
    })
    .catch(error => Promise.reject(error?.message));
};

export const getDetailSeri = id => {
  const url = API_PATHS.detailSeri.replace(/:id/, id);

  return appRequest
    .get(url)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message));
};

export const getSpotGame = id => {
  const url = API_PATHS.spotGame.replace(/:id/, id);
  return appRequest
    .get(url)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message));
};

export const playingGame = params => {
  const url = API_PATHS.user.playingGames;
  return appRequest
    .post(url, params)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error?.message));
};

// get spot in game
export const getSpotsCheckin = (id, params) => {
  const url = API_PATHS.getSpotsCheckin.replace(/:id/, id);
  return appRequest
    .get(url, { params })
    .then(response => {
      return Promise.resolve(response.data?.data);
    })
    .catch(error => Promise.reject(error));
};

// const fakeData = {
//   player_game_certificate: {
//     id: "d129403b-500f-448f-a4dc-278aa6f5c65b",
//     name: "表 彰 状",
//     description: "制覇",
//     game_name: "test coupon event",
//     player_name: "khoa",
//     owner_name: "ミンミンミンミンミンミンミンミ",
//     finished_at: "2023-03-27T22:03:38.491+09:00",
//     cert_no: "6",
//     turn_number: "1",
//     time_finished_json: {
//       days: 4,
//       hours: 21,
//       minutes: 52,
//       seconds: 57
//     },
//     time_finished_string: "4日と21時間52分57秒",
//     from: {
//       type: "Game",
//       id: "05d7897d-7931-4c07-8b01-7d7745d4dfd6",
//       name: "test coupon event",
//       owner_name: "ミンミンミンミンミンミンミンミ"
//     }
//   },
//   player_serie_certificate: {
//     id: "87e73e5e-5064-462f-a707-a4febac19efc",
//     name: "表 彰 状",
//     description: "制覇",
//     serie_name: "test coupon series",
//     player_name: "khoa",
//     owner_name: "ミンミンミンミンミンミンミンミ",
//     finished_at: "2023-03-27T22:03:38.491+09:00",
//     cert_no: "6",
//     turn_number: "1",
//     time_finished_json: {
//       days: 4,
//       hours: 21,
//       minutes: 52,
//       seconds: 57
//     },
//     time_finished_string: "4日と21時間52分57秒",
//     from: {
//       type: "Serie",
//       id: "83278111-0337-415d-b8fc-5c26ee7bf463",
//       name: "test coupon series",
//       owner_name: "ミンミンミンミンミンミンミンミ"
//     }
//   },
//   player_spot_coupon_reward: {
//     id: "b6eafa85-35cc-44b0-ae60-6b9932d84a3c",
//     name: "coupone",
//     description: "dasdasd",
//     image_url:
//       "https://minrally-stg.s3.us-west-2.amazonaws.com/qlx3xm2nb816k3vag28iukym0ibl",
//     received_from_type: "Spot",
//     received_from_id: "aa64e680-2180-4d8b-b7ca-676d931afb8f",
//     received_from_name: "nguyễn đình tựu",
//     limit_number_of_times_of_use_per_sheet: 10,
//     created_at: "2023-03-27T22:03:38.519+09:00",
//     expiration_date: "2023-04-08T23:59:59.999+09:00"
//   },
//   player_game_coupon_reward: {
//     id: "9b15848d-a5c6-4f58-8397-0252ffd7ebbe",
//     name: "eqweqw",
//     description: "eqweqw",
//     image_url:
//       "https://minrally-stg.s3.us-west-2.amazonaws.com/iyj5wzm48ko1jxsnd25b6f9xqabb",
//     received_from_type: "Game",
//     received_from_id: "05d7897d-7931-4c07-8b01-7d7745d4dfd6",
//     received_from_name: "test coupon event",
//     limit_number_of_times_of_use_per_sheet: 10,
//     created_at: "2023-03-27T22:03:38.568+09:00",
//     expiration_date: "2023-03-27T23:59:59.999+09:00"
//   },
//   player_serie_coupon_reward: {
//     id: "e9bb8156-5942-44c6-8402-9eb5c405c5f2",
//     name: "test coupon series",
//     description: "test coupon series",
//     image_url:
//       "https://minrally-stg.s3.us-west-2.amazonaws.com/oycq6zzv8qsar2lmkhl2cj6hetrw",
//     received_from_type: "Serie",
//     received_from_id: "83278111-0337-415d-b8fc-5c26ee7bf463",
//     received_from_name: "test coupon series",
//     limit_number_of_times_of_use_per_sheet: 10,
//     created_at: "2023-03-27T22:03:38.608+09:00",
//     expiration_date: "2023-03-27T23:59:59.999+09:00"
//   }
// };

// export const checkInSpotInGame = () => {
//   return fakeData;
// };

// checkin spot in game from modal list spot
export const checkInSpotInGame = params => {
  const url = API_PATHS.user.checkin;
  return appRequest
    .post(url, params)
    .then(response => {
      return Promise.resolve(response.data?.data);
    })
    .catch(error => Promise.reject(error?.message));
};

export const getFootprints = id => {
  const url = API_PATHS.footprints.replace(/:id/, id);
  return appRequest
    .get(url)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.resolve(error?.message));
};

export const getSpotDetail = spotId => {
  const url = API_PATHS.spotDetail.replace(/:spotId/, spotId);
  return appRequest
    .get(url)
    .then(response => {
      const { data } = response;
      return Promise.resolve(data);
    })
    .catch(error => Promise.resolve(error?.message));
};

export const checkinSpot = params => {
  const url = API_PATHS.user.checkin;
  return appRequest
    .post(url, params)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error));
};

export const getSpotComment = id => {
  const url = API_PATHS.spotComment.replace(/:id/, id);
  return appRequest
    .get(url)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message));
};

export const spotComment = (id, params) => {
  const url = API_PATHS.spotComment.replace(/:id/, id);
  return appRequest
    .post(url, params)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error?.message));
};

export const getReviewComment = id => {
  const url = API_PATHS.reviewComment.replace(/:id/, id);
  return appRequest
    .get(url)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message));
};

export const reviewComment = (id, params) => {
  const url = API_PATHS.reviewComment.replace(/:id/, id);
  return appRequest
    .post(url, params)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error?.message));
};

export const getCommentDetail = id => {
  const url = API_PATHS.commentDetail.replace(/:id/, id);
  return appRequest
    .get(url)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error?.message));
};

export const getReplyComment = id => {
  const url = API_PATHS.replyComment.replace(/:id/, id);
  return appRequest
    .get(url)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error?.message));
};

export const postReplyComment = (id, params) => {
  const url = API_PATHS.replyComment.replace(/:id/, id);
  return appRequest
    .post(url, params)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error?.message));
};

export const getGameHistories = id => {
  const url = API_PATHS.gameHistories.replace(/:id/, id);
  return appRequest
    .get(url)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error?.message));
};

export const deleteDraftGame = id => {
  const url = `${API_PATHS.user.games}/${id}`;
  return appRequest
    .delete(url)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(() => Promise.resolve());
};

export const getCertificationDetail = id => {
  const url = API_PATHS.certificate.replace(/:id/, id);
  return appRequest
    .get(url)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error?.message));
};
