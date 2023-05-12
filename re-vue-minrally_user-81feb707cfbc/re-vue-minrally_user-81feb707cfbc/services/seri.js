import API_PATHS from "@config/api-paths";
import appRequest from "@utils/app-request";

export const getDetailSeri = id => {
  const url = API_PATHS.detailSeri.replace(/:id/, id);

  return appRequest
    .get(url)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(() => Promise.resolve({}));
};

export const getReviewComment = id => {
  const url = API_PATHS.seriReviewComment.replace(/:id/, id);
  return appRequest
    .get(url)
    .then(response => {
      const { data } = response.data;
      return Promise.resolve(data);
    })
    .catch(() => Promise.resolve({}));
};

export const reviewSeriComment = (id, params) => {
  const url = API_PATHS.seriReviewComment.replace(/:id/, id);
  return appRequest
    .post(url, params)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error));
};

export const getSeriHistories = id => {
  const url = API_PATHS.seriesHistories.replace(/:id/, id);
  return appRequest
    .get(url)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error.message));
};

export const deleteSerie = id => {
  const url = `${API_PATHS.user.series}/${id}`;
  return appRequest
    .delete(url)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(() => Promise.resolve());
};