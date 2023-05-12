import API_PATHS from "@config/api-paths";
import appRequest from "@utils/app-request";

// eslint-disable-next-line import/prefer-default-export
export const login = params => {
  return appRequest
    .post(API_PATHS.login, params)
    .then(response => {
      const {
        "access-token": accessToken,
        client,
        uid,
        expiry
      } = response.headers;
      const credentials = { accessToken, client, uid, expiry };
      const { id, full_name: fullName, role } = response.data.data;
      const user = { id, fullName, role };
      return Promise.resolve({ credentials, user });
    })
    .catch(error => Promise.reject(error.message));
};

export const logout = () => {
  // eslint-disable-next-line no-console
  return appRequest.delete(API_PATHS.logout).catch(error => console.log(error));
};
