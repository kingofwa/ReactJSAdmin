/* eslint-disable import/prefer-default-export */
import API_PATHS from "@config/api-paths";
import appRequest from "@utils/app-request";

export const getUserInfo = () => {
  return appRequest
    .get(API_PATHS.user.info)
    .then(response => {
      const user = response.data.data;
      return Promise.resolve(user);
    })
    .catch(err => Promise.resolve(err?.message));
};

export const updateUserInfo = data => {
  return appRequest
    .post(API_PATHS.user.info, data)
    .then(res => {
      const user = res.data;
      return Promise.resolve(user);
    })
    .catch(error => {
      return Promise.reject(error.message);
    });
};

export const updateUser = data => {
  return appRequest
    .put(API_PATHS.user.info, data)
    .then(res => {
      const user = res.data;
      return Promise.resolve(user);
    })
    .catch(error => Promise.resolve(error?.message));
};

export const likeComment = id => {
  return appRequest
    .post(API_PATHS.user.likeCmt.replace(/:id/, id))
    .then(res => {
      const response = res.data;
      return Promise.resolve(response);
    })
    .catch(() => Promise.resolve());
};

export const unLikeComment = id => {
  return appRequest
    .delete(API_PATHS.user.unLikeCmt.replace(/:id/, id))
    .then(res => {
      const response = res.data;
      return Promise.resolve(response);
    })
    .catch(() => Promise.resolve());
};

export const deleteComment = id => {
  return appRequest
    .delete(API_PATHS.user.deleteCmt.replace(/:id/, id))
    .then(res => {
      const response = res.data;
      return Promise.resolve(response);
    })
    .catch(() => Promise.resolve());
};

export const updateComment = (id, params) => {
  const url = API_PATHS.user.updateCmt.replace(/:id/, id);
  return appRequest
    .put(url, params)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error));
};
