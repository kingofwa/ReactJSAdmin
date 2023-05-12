import { each, isArray, isEmpty, isNull, isObject, keys } from "lodash";

// eslint-disable-next-line import/prefer-default-export
export const generateFormData = obj => {
  const formData = new FormData();
  each(obj, (value, key) => {
    if (isEmpty(value) && isArray(value)) {
      formData.append(`${key}[]`, "");
    } else if (isArray(value)) {
      each(value, item => {
        if (isObject(item)) {
          each(item, (objValue, objKey) =>
            formData.append(`${key}[][${objKey}]`, objValue)
          );
        } else {
          formData.append(`${key}[]`, item);
        }
      });
    } else if (
      isObject(value) &&
      key === "certificate_image_template_attributes" // exception
    ) {
      each(value, (objValue, objKey) =>
        formData.append(`${key}[${objKey}]`, objValue)
      );
    } else {
      formData.append(key, value);
    }
  });
  return formData;
};

export const generateFormDataMultipleFile = (obj, fileListName) => {
  const formData = new FormData();
  each(obj, (value, key) => {
    if (isArray(value)) {
      each(value, item => {
        if (key === fileListName) {
          formData.append(`${key}[]`, item);
        } else if (isObject(item)) {
          each(item, (objValue, objKey) =>
            formData.append(`${key}[][${objKey}]`, objValue)
          );
        } else {
          formData.append(`${key}[]`, item);
        }
      });
    } else {
      formData.append(key, value);
    }
  });
  return formData;
};

const buildFormData = (formData, data, parentKey) => {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    if (isEmpty(data) && isArray(data)) {
      formData.append(`${parentKey}[]`, "");
    } else {
      keys(data).forEach(key => {
        buildFormData(
          formData,
          data[key],
          parentKey ? `${parentKey}[${key}]` : key
        );
      });
    }
  } else {
    const value = isNull(data) ? "" : data;
    formData.append(parentKey, value);
  }
};

export const jsonToFormData = data => {
  const formData = new FormData();
  buildFormData(formData, data);
  return formData;
};
