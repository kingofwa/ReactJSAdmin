import { composePath } from "./path";

export const absoluteApiUrl = (path, query = {}) => {
  return composePath(`${process.env.NEXT_PUBLIC_API_HOST}${path}`, query);
};

export const absoluteUrl = (path, query = {}) => {
  return composePath(`${process.env.NEXT_PUBLIC_APP_HOST}${path}`, query);
};
