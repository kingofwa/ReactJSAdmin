import _ from 'lodash';
import { pathToRegexp } from 'path-to-regexp';
import { message } from 'antd';
import { MESSAGE_DURATION, MESSAGE_TYPE } from '../config/constants';

const pathMatchRegexp = (regexp, pathname) => {
  return pathToRegexp(regexp).exec(pathname);
};

export const arrayToTree = (
  array,
  id = 'id',
  parentId = 'pId',
  children = 'children'
) => {
  const result = [];
  const hash = {};
  const data = _.cloneDeep(array);

  _.each(data, item => (hash[item[id]] = item));

  _.each(data, item => {
    const parent = hash[item[parentId]];
    if (parent) {
      !parent[children] && (parent[children] = []);
      parent[children].push(item);
    } else {
      result.push(item);
    }
  });

  return result;
};

export const elementMatchPath = (array, pathname) => {
  return _.find(array, o => o.path && pathMatchRegexp(o.path, pathname));
};

export const queryAncestors = (array, current, parentId, id = 'id') => {
  const result = [current];
  const hashMap = new Map();
  _.each(array, o => hashMap.set(o[id], o));

  const getPath = current => {
    const currentParentId = current[parentId];
    if (currentParentId) {
      const parent = hashMap.get(currentParentId);
      result.push(parent);
      getPath(parent);
    }
  };

  getPath(current);
  return result;
};

export const mapDataFromObject = (
  obj,
  mapper,
  converter = defaultConverter
) => {
  const selectedData = _.pick(obj, _.keys(mapper));
  let result = {};
  _.each(selectedData, (value, key) => {
    result[mapper[key]] = converter(value);
  });
  return result;
};

export const generateFormDataFromObject = (obj, mapper) => {
  const formData = new FormData();
  const dataObj = mapDataFromObject(
    standardizeFileData(obj),
    mapper,
    EmptyConverter
  );
  _.each(dataObj, (value, key) => {
    if (_.isArray(value)) {
      _.each(value, item => formData.append(`${key}[]`, item));
    } else {
      formData.append(key, value);
    }
  });
  return formData;
};

export const generateFormNestedDataFromObject = (obj, mapper) => {
  const formData = new FormData();
  let dataObj = mapDataFromObject(
    standardizeFileData(obj),
    mapper,
    EmptyConverter
  );
  _.each(dataObj, (value, key) => {
    if (_.isArray(value)) {
      if (_.isObject(value[0])) {
        _.each(value, item => {
          _.each(item, (v, k) => formData.append(`${key}[][${k}]`, v));
        });
      } else {
        _.each(value, item => formData.append(`${key}[]`, item));
      }
    } else {
      if (_.isObject(value)) {
        _.each(value, (v, k) => formData.append(`${key}[${k}]`, v));
      } else {
        formData.append(key, value);
      }
    }
  });
  return formData;
};

export const EmptyConverter = value => {
  if (value === null || value === undefined) return '';
  return value;
};

export const dumbFunc = () => {};

const defaultConverter = value => value;

export const standardizeFileData = (rawData, fieldNames = ['photo']) => {
  const result = _.cloneDeep(rawData);
  _.each(fieldNames, fieldName => {
    if (result[fieldName]) {
      const file = result[fieldName][0].originFileObj;
      if (file) {
        result[fieldName] = file;
      } else {
        delete result[fieldName];
      }
    }
  });
  return result;
};

export const pushMessage = (
  content,
  type = MESSAGE_TYPE.SUCCESS,
  duration = MESSAGE_DURATION
) => {
  switch (type) {
    case MESSAGE_TYPE.ERROR:
      message.error({ content, duration });
      break;
    case MESSAGE_TYPE.SUCCESS:
      message.success({ content, duration });
      break;
    case MESSAGE_TYPE.WARNING:
      message.warning({ content, duration });
      break;
    default:
      break;
  }
};
