export const STATUS_CODE = {
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  TooManyRequests: 429,
  ValidationFailed: 422,
  InternalServerError: 500
};

export const FORMATTER = {
  date: 'YYYY/MM/DD',
  dateTime: 'YYYY/MM/DD HH:mm',
  monthFormatJP: 'YYYY年MM月',
  monthFormat: 'YYYY/MM'
};

// export const ERROR_MESSAGES = {
//   empty: 'こちらの項目は必須項目です',
//   invalidEmail: '有効なEメールアドレスを入力してください。',
//   maxLength: ':count文字以下で入力して下さい',
//   minLength: ':count文字以上で入力してください。',
//   match: ':fieldが一致しません',
//   invalid: '不正な値です',
//   negativeNumber: '0以上の値にしてください',
//   invalidHiragana: 'ひらがなのみ入力可能にする',
//   default: '何らかの問題が生じているようです。',
//   duplicate: 'このアイテムはすでに選んでいます。',
//   invalidPassword:
//     '8文字以上の長さにする必要があります。少なくとも 1 つの大文字が必要です'
// };

export const NUM_PER_PAGE = 20;
export const NUM_PER_PAGE_RECOMMEND = 10;

export const ANALYSIS = {
  SUMMARY: 'summary',
  MONTHLY: 'monthly',
  EVENT: 'event',
  PREFECTURE: 'prefecture',
  DAILY: 'daily'
};

export const SPOT_STATUS = {
  registrations: 'registered',
  unregistered: 'unregistered',
  draft: 'draft'
};

export const DEFAULT_CENTER_MAP = {
  lat: 35.6761919,
  lng: 139.6503106
};

export const DEFAULT_TEMPLATE_CERTIFICATE = {
  name: '表 彰 状',
  description: '制覇'
};

export const EVENT_STATUS = {
  PUBLISHED: 'published',
  DRAFT: 'draft'
};

export const MESSAGE_DURATION = 6;

export const MESSAGE_TYPE = {
  ERROR: 'error',
  SUCCESS: 'success',
  WARNING: 'warning'
};

export const PHOTO = {
  delete: 'delete'
};

export const QrCodeEnum = {
  GPS: 'gps',
  QR_CODE: 'gps_and_qrcode'
};

export const USER_ROLE = {
  BUSINESS: 'business_acc',
  SUPER_ADMIN: 'super_admin'
};

export const DASH_BOARD_SORT_TYPE_ENUM = {
  RALLY: 'RALLY',
  GRAND_RALLY: 'GRAND_RALLY',
  SPOT: 'SPOT'
};

export const ORDER = {
  DESCEND: 'descend',
  ASCEND: 'ascend'
};

export const COUPON_TYPE = {
  NO_COUPON: 'no',
  HAS_COUPON: 'yes',
  APPLICATION_FORM: 'application_form'
};
export const PeriodSetingEnum = {
  UNLIMITED: 'unlimited',
  LIMITED: 'limited'
};

export const STATUS_ENUM = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  PRIVATE: 'private'
};

export const QUESTION_TYPE = {
  TEXT_BOX: 'text_box',
  CHECK_BOX: 'check_box',
  RADIO_BUTTON: 'radio_button'
};

export const TEXT_BOX_TYPE = {
  TEXT_INPUT: 128,
  AREA_INPUT: 5000
};
