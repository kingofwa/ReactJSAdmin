/* eslint-disable import/no-unresolved */
import API_PATHS from "@config/api-paths";
import appRequest from "@utils/app-request";

export const getNotifications = params => {
  return appRequest
    .get(API_PATHS.notifications, { params })
    .then(response => {
      const { meta } = response.data;
      const { data } = response.data;
      const { extra } = response.data;
      return Promise.resolve({ data, meta, extra });
    })
    .catch(error => Promise.reject(error.message));
};

export const getUserNotifications = params => {
  return appRequest
    .get(API_PATHS.userNotifications, { params })
    .then(response => {
      const { meta } = response.data;
      const { data } = response.data;
      const { extra } = response.data;
      return Promise.resolve({ data, meta, extra });
    })
    .catch(error => Promise.reject(error.message));
};

export const viewNotification = id => {
  const url = API_PATHS.viewUserNotification.replace(/:id/, id);
  return appRequest
    .post(url)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error));
};

export const vieUserNotification = id => {
  const url = API_PATHS.viewUserNotification.replace(/:id/, id);
  return appRequest
    .post(url)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error));
};

export const readAllNotifications = () => {
  const url = API_PATHS.readAllNotifications;
  return appRequest
    .put(url)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error));
};

export const readAllUserNotifications = () => {
  const url = API_PATHS.readAllUserNotifications;
  return appRequest
    .put(url)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => Promise.reject(error));
};
