import Cookies from "js-cookie";
import moment from "moment";

const CREDENTIALS_KEY = "_user_credentials";

export const storeCredentials = credentials => {
  const { expiry } = credentials;
  // eslint-disable-next-line no-param-reassign
  delete credentials.expiry;
  const expires = moment.unix(expiry).diff(moment(), "days") || 300;
  Cookies.set(CREDENTIALS_KEY, JSON.stringify(credentials), { expires });
};

export const retrieveCredentials = () => {
  const credentials = Cookies.get(CREDENTIALS_KEY);
  return credentials ? JSON.parse(credentials) : null;
};

export const clearCredentials = () => Cookies.remove(CREDENTIALS_KEY);
