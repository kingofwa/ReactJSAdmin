import { isEmpty, isNil, omitBy } from "lodash";

// eslint-disable-next-line import/prefer-default-export
export const composePath = (path, query) => {
  const validQuery = omitBy(query, isNil);
  if (isEmpty(validQuery)) {
    return path;
  }

  const queryStr = new URLSearchParams(validQuery).toString();
  return `${path}?${queryStr}`;
};
