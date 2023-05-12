/* eslint-disable import/prefer-default-export */
export const REGEXP_YEAR = /^[0-9]{4}$/;
export const REGEXP_MONTH = /^([ 1-9 ]|1[ 0-2 ])$/;

export const REGEXP_DAY = /^([ 1-9 ]|[ 12 ][ 0-9 ]|3[ 01 ])$/;

// Allow space start /  end
export const REGEX_MAIL =
  // /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  /^(\s*([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\]\s*)|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})\s*)$/;

export const REGEX_NAME_DEFAULT = /^[ぁ-んァ-ン a-zA-Z ｧ-ﾝﾞﾟ]+$/;

export const REGEX_NAME_NIHON = /^[ぁ-んァ-ン一-龥a-zA-Z]*$/;

// Width underscores
export const REGEX_DISPLAY_NAME_DEFAULT = /^[ぁ-んァ-ン a-zA-Z0-9_ ｧ-ﾝﾞﾟ]+$/;

export const REGEX_URL =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)?/;

export const REGEX_URL_YOUTUBE =
  /((http(s)?:\/\/)?)(www\.)?((youtube\.com\/)|(youtu.be\/))[\S]+/;

export const MAX_SIZE_IMAGE = 5;

export const REGEX_NAME_NO_SPECIAL = /^[a-zA-Z_ ｧ-ﾝﾞﾟぁ-んァ-ン一-龥0-9ー\s]+$/;
