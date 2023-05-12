/* eslint-disable import/prefer-default-export */
export const PROVINCES = [
  {
    id: 0,
    name: "北海道"
  },
  {
    id: 1,
    name: "青森県"
  },
  {
    id: 2,
    name: "岩手県"
  },
  {
    id: 3,
    name: "宮城県"
  },
  {
    id: 4,
    name: "秋田県"
  },
  {
    id: 5,
    name: "山形県"
  },
  {
    id: 6,
    name: "福島県"
  },
  {
    id: 7,
    name: "茨城県"
  },
  {
    id: 8,
    name: "栃木県"
  },
  {
    id: 9,
    name: "群馬県"
  },
  {
    id: 10,
    name: "埼玉県"
  },
  {
    id: 11,
    name: "千葉県"
  },
  {
    id: 12,
    name: "東京都"
  },
  {
    id: 13,
    name: "神奈川県"
  },
  {
    id: 14,
    name: "新潟県"
  },
  {
    id: 15,
    name: "富山県"
  },
  {
    id: 16,
    name: "石川県"
  },
  {
    id: 17,
    name: "福井県"
  },
  {
    id: 18,
    name: "山梨県"
  },
  {
    id: 19,
    name: "長野県"
  },
  {
    id: 20,
    name: "岐阜県"
  },
  {
    id: 21,
    name: "静岡県"
  },
  {
    id: 22,
    name: "愛知県"
  },
  {
    id: 23,
    name: "三重県"
  },
  {
    id: 24,
    name: "滋賀県"
  },
  {
    id: 25,
    name: "京都府"
  },
  {
    id: 26,
    name: "大阪府"
  },
  {
    id: 27,
    name: "兵庫県"
  },
  {
    id: 28,
    name: "奈良県"
  },
  {
    id: 29,
    name: "和歌山県"
  },
  {
    id: 30,
    name: "鳥取県"
  },
  {
    id: 31,
    name: "島根県"
  },
  {
    id: 32,
    name: "岡山県"
  },
  {
    id: 33,
    name: "広島県"
  },
  {
    id: 34,
    name: "山口県"
  },
  {
    id: 35,
    name: "徳島県"
  },
  {
    id: 36,
    name: "香川県"
  },
  {
    id: 37,
    name: "愛媛県"
  },
  {
    id: 38,
    name: "高知県"
  },
  {
    id: 39,
    name: "福岡県"
  },
  {
    id: 40,
    name: "佐賀県"
  },
  {
    id: 41,
    name: "長崎県"
  },
  {
    id: 42,
    name: "熊本県"
  },
  {
    id: 43,
    name: "大分県"
  },
  {
    id: 44,
    name: "宮崎県"
  },
  {
    id: 45,
    name: "鹿児島県"
  },
  {
    id: 46,
    name: "沖縄県"
  }
];

export const DECADES_DATE = [
  {
    id: 0,
    decade: "1900"
  },
  {
    id: 1,
    decade: "1910"
  },
  {
    id: 2,
    decade: "1920"
  },
  {
    id: 3,
    decade: "1930"
  },
  {
    id: 4,
    decade: "1940"
  },
  {
    id: 5,
    decade: "1950"
  },
  {
    id: 6,
    decade: "1960"
  },
  {
    id: 7,
    decade: "1970"
  },
  {
    id: 8,
    decade: "1980"
  },
  {
    id: 9,
    decade: "1990"
  },
  {
    id: 10,
    decade: "2000"
  },
  {
    id: 11,
    decade: "2010"
  },
  {
    id: 12,
    decade: "2020"
  }
];

export const STATUS_CREATOR = {
  preApplication: "pre",
  submitted: "submitted",
  approved: "approved",
  rejected: "rejected"
};

export const JOBS = [
  { id: 0, name: "経営者・役員" },
  { id: 1, name: "会社員（総合職)" },
  { id: 2, name: "会社員（一般職）" },
  { id: 3, name: "契約社員・派遣社員" },
  { id: 4, name: "パート・アルバイト" },
  { id: 5, name: "公務員（教職員除く）" },
  { id: 6, name: "教職員" },
  { id: 7, name: "医療関係者" },
  { id: 8, name: "自営業・自由業" },
  { id: 9, name: "専業主婦・主夫" },
  { id: 10, name: "大学生・大学院生" },
  { id: 11, name: "専門学校生・短大生" },
  { id: 12, name: "高校生" },
  { id: 13, name: "士業（公認会計士・弁護士・税理士・司法書士）" },
  { id: 14, name: "無職" },
  { id: 15, name: "定年退職" }
];

// Create rally information
export const NUMBER_SPOTS = [3, 4, 5, 6, 7];

// Spot list
export const SPOT_STATUS = {
  registrations: "registered",
  unregistered: "unregistered",
  draft: "draft"
};

export const COMMENT_TYPE = {
  SPOT: "spot",
  REVIEW: "review",
  REVIEW_SERI: "review_seri",
  EDIT_SPOT: "edit_spot",
  EDIT_REVIEW: "edit_review",
  EDIT: "edit"
};

export const ROW_INPUT_REPLY_CMT = {
  min: 1,
  max: 6
};

export const STATUS_RESPONSE = {
  success: "success"
};

export const TYPE_LAYOUT_RALLY = {
  single: "single",
  grid: "grid",
  list: "list"
};

// Top Page - Ranking Rally
export const DEFAULT_USER_POINT = {
  lat: 100,
  lng: 100
};

export const RANKING_RALLY_FILTER = {
  checkedCount: "checked_count",
  playerCount: "player_count"
};

export const RECOMMEND_FILTER = {
  rally: "game",
  grand: "grand"
};

export const RANKING_LIMIT = 5;

export const RANKING_FILTER = {
  checkedCount: "checked_count",
  traveledDistance: "traveled_distance",
  ralliesCompletedCount: "rallies_completed_count",
  ralliesJoinedCount: "rallies_joined_count",
  followerCount: "follower_count",
  ralliesCreatedCount: "rallies_created_count",
  peopleCheckedCount: "people_checked_count",
  peopleTraveledDistance: "people_traveled_distance",
  fastestFinishTime: "fastest_finish_time",
  numberOfTimesCompleted: "number_of_times_completed"
};

// create or update certificate template
export const DEFAULT_TEMPLATE_CERTIFICATE = {
  name: "表 彰 状",
  description: "制覇"
};

export const SEX = {
  male: "男",
  female: "女",
  other: "その他"
};

export const RALLY_PERIOD = {
  none: "none",
  expired: "expired"
};

export const MESSAGE_DURATION = 6;

export const PHOTO = {
  delete: "delete"
};

export const QrCodeEnum = {
  GPS: "gps",
  QR_CODE: "gps_and_qrcode"
};

export const ParentType = {
  SPOT: "Spot",
  GAME: "Game",
  SERIE: "Serie"
};
