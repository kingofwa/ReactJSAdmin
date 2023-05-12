/* eslint-disable camelcase */
import API_PATHS from "@config/api-paths";
import appRequest from "@utils/app-request";

export const getSeriesGames = (seriesId, params) => {
  return appRequest
    .get(API_PATHS.seriesDetailGames.replace(/:id/, seriesId), { params })
    .then(response => {
      const { data } = response;
      return Promise.resolve(data);
    })
    .catch(() => Promise.resolve({}));
};

export const getFootprintsSeri = id => {
  const url = API_PATHS.seriFootprints.replace(/:id/, id);
  return appRequest
    .get(url)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(() => Promise.resolve({}));
};

export const getSeriesDetail = seriesId => {
  return appRequest
    .get(API_PATHS.seriDetail.replace(/:id/, seriesId))
    .then(response => {
      const data = response?.data?.data;
      const current_status = response?.data?.extra;
      return Promise.resolve({ ...data, ...current_status });
    })
    .catch(() => Promise.resolve({}));
};
