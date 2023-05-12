import { clone, each, isNil, omitBy } from "lodash";

// eslint-disable-next-line import/prefer-default-export
export const extractObj = (obj, mapper) => {
  const result = {};
  each(mapper, (value, key) => {
    result[key] = obj[value];
  });
  return omitBy(result, isNil);
};

export const standardizeFileData = (obj, fieldName = "avatar") => {
  const result = clone(obj);
  if (isNil(result[fieldName])) {
    delete result[fieldName];
    return result;
  }

  const file = result[fieldName][0].originFileObj;
  if (file) {
    result[fieldName] = file;
  } else {
    delete result[fieldName];
  }

  return result;
};

export const transformImageAttribute = (obj, fieldName = "image") => {
  const result = clone(obj);
  if (obj[`${fieldName}_url`]) {
    result[fieldName] = [
      {
        uid: "-1",
        url: obj[`${fieldName}_url`]
      }
    ];
  }

  return result;
};
