// eslint-disable-next-line import/prefer-default-export
import { RANKING_RALLY_FILTER, RECOMMEND_FILTER } from "@utils/constants";
import PATHS from "./paths";

export const FORMATTER = {
  date: "YYYY/MM/DD",
  dateTime: "YYYY/MM/DD HH:mm",
  month: "YYYY年MM月",
  nihonDate: "YYYY年MM月DD日"
};

export const RANKING_TAB = {
  GRAND_RALLY: "GRAND_RALLY",
  RALLY: "RALLY",
  USER: "USER",
  CREATOR: "CREATOR"
};

export const MYPAGE_RALLY_TABS = [
  {
    id: 1,
    title: "グランドラリー",
    path: [PATHS.mypagePlayerGrandRally]
  },
  {
    id: 2,
    title: "ラリー",
    path: [PATHS.mypagePlayerRally]
  }
];

export const MYPAGE_FAVORITE_RALLY_TABS = [
  {
    id: 1,
    title: "グランドラリー",
    path: [PATHS.mypagePlayerLikedGrandRally]
  },
  {
    id: 2,
    title: "ラリー",
    path: [PATHS.mypagePlayerLikedRally]
  }
];

export const MYPAGE_PLAYER_CREATOR_TAB = [
  {
    id: 1,
    title: "プレイヤー情報",
    path: [PATHS.home]
  },
  {
    id: 2,
    title: "ラリーマスター情報",
    path: [PATHS.mypageCreator]
  }
];

export const PROFILES_PLAYER_TAB = [
  {
    id: 1,
    title: "グランドラリー",
    path: [PATHS.profilePlayerGrandRally]
  },
  {
    id: 2,
    title: "ラリー",
    path: [PATHS.profilePlayerRally]
  }
];

export const PROFILES_CREATOR_TAB = [
  {
    id: 1,
    title: "グランドラリー",
    path: [PATHS.profileCreatorGrandRally]
  },
  {
    id: 2,
    title: "ラリー",
    path: [PATHS.profileCreatorRally]
  }
];

export const LOGIN_TAB = [
  {
    id: 1,
    title: "新規登録",
    path: [PATHS.signup, PATHS.userInfo]
  },
  {
    id: 2,
    title: "ログイン",
    path: [PATHS.login]
  }
];

export const TOP_MENU = [
  {
    key: 1,
    label: "ホーム",
    paths: [PATHS.home, PATHS.mypageCreator]
  },
  {
    key: 2,
    label: "おすすめ", // recommend
    paths: [
      `${PATHS.recommend}?type=${RECOMMEND_FILTER.rally}`,
      PATHS.recommend
    ]
  },
  {
    key: 3,
    label: "近くで開催中",
    paths: [PATHS.nearly]
  },
  {
    key: 4,
    label: "ランキング",
    paths: [
      `${PATHS.rankingRally}?type=${RANKING_RALLY_FILTER.checkedCount}`,
      PATHS.rankingCreator,
      PATHS.rankingUser,
      PATHS.rankingGrandRally,
      PATHS.rankingRally
    ]
  }
];

export const NEWS_MENU = [
  {
    key: 1,
    label: "重要確認事項",
    paths: [PATHS.news]
  },
  {
    key: 2,
    label: "お知らせ",
    paths: [PATHS.myNews]
  }
];

export const FAQ_MENU = [
  {
    key: 1,
    label: "よくある質問",
    paths: [PATHS.faq]
  },
  {
    key: 2,
    label: "お問い合わせ",
    paths: [PATHS.contact]
  }
];

export const SEARCH_MENU = [
  {
    key: 1,
    label: "ラリー検索",
    paths: [PATHS.searchRally]
  },
  {
    key: 2,
    label: "ユーザー検索",
    paths: [PATHS.searchCreator]
  }
];

export const RALLY_MENU = [
  {
    key: 1,
    label: "トップ",
    paths: [PATHS.rally]
  },
  {
    key: 2,

    label: "詳細情報",
    paths: [PATHS.rallyMypage]
  },
  {
    key: 3,
    label: "ランキング",
    paths: [PATHS.rallyRanking]
  },
  {
    key: 4,
    label: "レビュー",
    paths: [PATHS.rallyReview]
  }
];

export const SERI_MENU = [
  {
    id: 1,
    title: "トップ",
    path: [PATHS.series]
  },
  {
    id: 2,
    title: "詳細情報",
    path: [PATHS.seriDetails]
  },
  {
    id: 3,
    title: "ランキング",
    path: [PATHS.seriRanking]
  },
  {
    id: 4,
    title: "レビュー",
    path: [PATHS.seriReview]
  }
];

export const TOP_TYPE = {
  GAME: "GAME",
  RANKING: "RANKING"
};

export const SEARCH = {
  KEYWORD: "keyword",
  TAG: "tag",
  PREFECTURE: "prefecture"
};

export const TYPE_LIST = { rally: "rally", serie: "serie" };

export const TYPE_USER = { player: "player", creator: "creator" };

export const PLAYER_ACTION = {
  COMPLETED: "completed",
  CHECKED_IN: "checked_in"
};

export const ACTIVITY_TYPE = {
  COMPLETED_SERIE: "completed_serie",
  COMPLETED_GAME: "completed_game",
  CHECKED_IN_SPOT: "checked_in_spot",
  CREATED_RALLY: "created_rally",
  FAVORITE_RALLY: "favorited_rally",
  FAVORITE_GRAND: "favorited_grand"
};

export const DEFAULT_CENTER_MAP = {
  lat: 35.6761919,
  lng: 139.6503106
};

export const RALLY_STATUS = {
  PUBLISHED: "published",
  DRAFT: "draft"
};

export const NOTIFICATION_TYPE = {
  PLAYER: "player",
  RALLY_MASTER: "rally_master",
  ALL: "",
  OTHER: "other"
};

export const NOTIFICATION_ACTION_TYPE = {
  PLAYER_TOP_INDIVIDUAL: "player_top_individual",
  PLAYER_FOLLOWING: "player_following",
  PLAYER_COMMENT_SPOT: "player_comment_spot",
  PLAYER_REPLY_COMMENT_SPOT: "player_reply_comment",
  PLAYER_LIKE_REPLY_COMMENT_SPOT: "player_like_reply_comment",
  PLAYER_REPLY_REVIEW_RALLY: "player_reply_review",
  PLAYER_LIKE_REPLY_REVIEW_RALLY: "player_like_reply_review",
  PLAYER_LIKE_SPOT_MEMORY: "player_like_comment",
  PLAYER_LIKE_REVIEW: "player_like_review",
  PLAYER_RALLIES_COMPLETED_COUNT: "rallies_completed_count",
  PLAYER_RALLIES_JOINED_COUNT: "rallies_joined_count",
  PLAYER_TRAVELED_DISTANCE: "traveled_distance",
  PLAYER_CHECKED_COUNT: "checked_count",
  MASTER_NEW_MEMORY_SPOT: "master_new_memory_spot",
  MASTER_REVIEW_RALLY: "master_review_rally",
  MASTER_TOP_RALLY: "master_top_rally",
  MASTER_TOP_INDIVIDUAL: "master_top_individual",
  MASTER_APPLICATION_ACCEPTED: "master_application_accepted",
  MASTER_APPLICATION_REJECTED: "master_application_rejected",
  MASTER_FAVORITE_GAME: "favorite_game",
  MASTER_FAVORITE_SERIE: "favorite_serie",
  MASTER_CHECKED_COUNT: "rally_master_checked_count",
  MASTER_PLAYER_COUNT: "rally_master_player_count",
  MASTER_FOLLOWER_COUNT: "follower_count",
  MASTER_RALLIES_CREATED_COUNT: "rallies_created_count",
  MASTER_PEOPLE_CHECKED_COUNT: "people_checked_count",
  MASTER_PEOPLE_TRAVELED_DISTANCE: "people_traveled_distance",
  MASTER_REVIEW_SERIES: "master_review_series",
  PLAYER_LIKE_REVIEW_SERIES: "player_like_review_series",
  PLAYER_REPLY_REVIEW_SERIES: "player_reply_review_series",
  PLAYER_LIKE_REPLY_REVIEW_SERIES: "player_like_reply_review_series",
};
