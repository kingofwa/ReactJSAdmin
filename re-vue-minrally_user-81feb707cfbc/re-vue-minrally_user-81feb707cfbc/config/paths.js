import API_PATHS from "./api-paths";

const PATHS = {
  home: "/",
  signup: "/signup",
  login: "/login",
  userInfo: "/user-info",
  new: "/new",
  participating: "/participating",
  howNice: "/how-nice",
  ranking: "/ranking",
  rankingGrandRally: "/ranking/grand-rally",
  rankingRally: "/ranking/rally",

  rankingUser: "/ranking/user",
  checkedCount: "/ranking/user/checked-count",
  traveledDistance: "/ranking/user/traveled-distance",
  ralliesCompletedCount: "/ranking/user/rallies-completed-count",
  ralliesJoinedCount: "/ranking/user/rallies-joined-count",

  rankingCreator: "/ranking/creator",
  followerCount: "/ranking/creator/follower-count",
  ralliesCreatedCount: "/ranking/creator/rallies-created-count",
  peopleCheckedCount: "/ranking/creator/people-checked-count",
  peopleTraveledDistance: "/ranking/creator/people-traveled-distance",

  rankingTop: "/ranking/top",
  news: "/news",
  myNews: "/news/mynews",
  faq: "/faq",
  contact: "/contact",
  mypagePlayer: "/mypage/player",
  mypagePlayerRally: "/mypage/player/rally",
  mypagePlayerGrandRally: "/mypage/player/grand-rally",
  mypagePlayerLikedGrandRally: "/mypage/player/favorited/liked-grand-rally",
  mypagePlayerLikedRally: "/mypage/player/favorited/liked-rally",
  mypagePlayerFollowedUser: "/mypage/player/followed-user",
  mypagePlayerFollower: "/mypage/player/follower",
  mypageProfilePlayerSetting: "/mypage/player/profile-setting",
  mypageProfileCreatorSetting: "/mypage/creator/profile-setting",
  checkinHistory: "/checkin-history",
  mypageCreator: "/mypage/creator",
  createAppInfo: "/create-application/info",
  createAppConfirm: "/create-application/confirm",
  editSerie: "/mypage/creator/series/[id]",
  createSeri: "/mypage/creator/series",
  playerFollowerById: "/mypage/player/follower/:id",
  playerFollowedUserById: "/mypage/player/followed-user/:id",

  mypageCreatorCertificate: "/mypage/creator/series/[id]/certificate",
  mypageCreatorSeriDetail: "/mypage/creator/series/[id]",

  searchRally: "/search/rally",
  searchRallyResult: "/search/rally/result",
  searchCreator: "/search/creator",
  rally: "/rally",
  rallyDetail: "/rally/[id]",
  rallyMypage: "/rally/mypage",
  rallyRanking: "/rally/ranking",
  rallyReview: "/rally/review",
  // rallyMypageComplete: "/rally/mypage/complete",
  seriesComplete: "/series/[id]/complete",
  rallyComplete: "/rally/[id]/complete",
  rallyMypageSpotMap: "/rally/mypage/spot-map",
  rallyMypageSpotDetail: "/rally/mypage/spot-detail",
  rallyMypageBadgeList: "/rally/mypage/badge-list",
  rallyReplyComment: "/rally/reply-comment/:id",

  series: "/series/[id]",
  seriDetails: "/series/[id]/detail",
  seriRanking: "/series/[id]/ranking",
  seriFastestFinishTime: "/series/:id/ranking/fastest-finish-time",
  seriNumberOfTimesCompleted: "/series/:id/ranking/number-of-times-completed",
  seriReview: "/series/[id]/review",
  serie: "/series",

  rallyFastestFinishTime: "/rally/ranking/:id/fastest-finish-time",
  rallyNumberOfTimesCompleted: "/rally/ranking/:id/number-of-times-completed",

  profilePlayerRally: "/profile/player/rally/[id]",
  profilePlayerGrandRally: "/profile/player/grand-rally/[id]",
  profileCreatorRally: "/profile/creator/rally/[id]",
  profileCreatorGrandRally: "/profile/creator/grand-rally/[id]",

  loginTwitter: `${process.env.NEXT_PUBLIC_API_HOST}${API_PATHS.authTwitter}?auth_origin_url=${process.env.NEXT_PUBLIC_APP_HOST}/login-loading`,
  loginLine: `${process.env.NEXT_PUBLIC_API_HOST}${API_PATHS.authLine}?auth_origin_url=${process.env.NEXT_PUBLIC_APP_HOST}/login-loading`,
  loginGoogle: `${process.env.NEXT_PUBLIC_API_HOST}${API_PATHS.authGoogle}?auth_origin_url=${process.env.NEXT_PUBLIC_APP_HOST}/login-loading`,
  signUpTwitter: `${process.env.NEXT_PUBLIC_API_HOST}${API_PATHS.authTwitter}?auth_origin_url=${process.env.NEXT_PUBLIC_APP_HOST}/login-loading`,
  signUpLine: `${process.env.NEXT_PUBLIC_API_HOST}${API_PATHS.authLine}?auth_origin_url=${process.env.NEXT_PUBLIC_APP_HOST}/login-loading`,
  signUpGoogle: `${process.env.NEXT_PUBLIC_API_HOST}${API_PATHS.authGoogle}?auth_origin_url=${process.env.NEXT_PUBLIC_APP_HOST}/login-loading`,

  rallyCreateInfo: "/rally-create/info",
  rallyCreateSpotList: "/rally-create/spot-list/:rallyId",
  rallyEditSpotList: "/rally-create/edit-spot-list/:rallyId",
  rallyCreateSpotDetail: "/rally-create/spot-detail/:spotId",
  rallyCreateSpot: "/rally-create/create-spot/:rallyId",
  rallyCreateSystemSetting: "/rally-create/system-setting/:rallyId",
  rallyCreateSettingCompleted: "/rally-create/setting-completed/:rallyId",
  rallyCreatePublicCompleted: "/rally-create/public-completed/:rallyId",
  rallyEditInfo: "/rally-create/info/:rallyId",
  rallyCreateEditSystemSetting: "/rally-create/edit-system-setting/:rallyId",

  termsOfService: "/terms-of-service",
  privacyPolicy: "/privacy-policy",
  specifiedCommercialTransactions: "/specified-commercial-transactions",

  recommend: "/recommend",
  nearly: "/nearly",
  nearByCheckin: "/nearby-checkin",
  loginSuccess: "/login-success",
  loginLoading: "/login-loading",
  certificationDetail: "/certification-detail/:id",
  myPageCoupon: "/mypage/coupon",
  grandCoupon: "/series/[id]/coupon",
  rallyCoupon: "/rally/[id]/coupon",
  spotCoupon: "/rally/mypage/spot-detail/[id]/coupon",
  couponDetail: "/coupon/[id]",
  searchResult: "/search/creator/result",
  rewardConfirm: "/reward-confirm/[id]"
};

export default PATHS;
