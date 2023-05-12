import { invert } from 'lodash';
import { mapDataFromObject } from '@utils/main';
import { CREDENTIALS_MAPPER } from '@api/mapper';
import { API_PATHS } from '@config/api-paths';
import httpRequest from './http-request';

const signIn = data => {
  return httpRequest
    .post(API_PATHS.signIn, data)
    .then(response => {
      const mapper = invert(CREDENTIALS_MAPPER);
      const credentials = mapDataFromObject(response.headers, mapper);
      const role = response?.data?.data?.role;
      const email = response?.data?.data?.email;
      return Promise.resolve({ ...credentials, role, email });
    })
    .catch(error => Promise.reject(error.message));
};

const signOut = () => {
  return httpRequest
    .delete(API_PATHS.signOut)
    .catch(error => Promise.reject(error.message));
};

export { signIn, signOut };
