const API_BASE_PATH = "/api/v1";
const API_USER_PATH = `${API_BASE_PATH}/user`;
const API_AUTH_PATH = `${API_BASE_PATH}/auth`;

const API_PATHS = {
  login: `${API_AUTH_PATH}/sign_in`,
  logout: `${API_AUTH_PATH}/sign_out`,
  authTwitter: `${API_AUTH_PATH}/twitter`,
  authLine: `${API_AUTH_PATH}/line`,
  authGoogle: `${API_AUTH_PATH}/google_oauth2`,
  profile: {
    info: `${API_BASE_PATH}/profiles/:id`,

    playingGame: `${API_BASE_PATH}/profiles/:id/playing/games`,
    playingSeri: `${API_BASE_PATH}/profiles/:id/playing/series`,

    favoritesGame: `${API_BASE_PATH}/profiles/:id/favorites/games`,
    favoritesSeri: `${API_BASE_PATH}/profiles/:id/favorites/series`,

    followings: `${API_BASE_PATH}/profiles/:id/followings`,
    games: `${API_BASE_PATH}/profiles/:id/games`,
    series: `${API_BASE_PATH}/profiles/:id/series`,
    seriesDetail: `${API_BASE_PATH}/profiles/:profileId/series/:seriesId`
  },
  slider: `${API_BASE_PATH}/banners`,
  recommended: `${API_BASE_PATH}/games/recommended`,
  gamesRecommended: `${API_BASE_PATH}/games/recommended`,
  grandRecommended: `${API_BASE_PATH}/series/recommended`,
  nearby: `${API_BASE_PATH}/games/nearby`,
  games: `${API_BASE_PATH}/games`,
  series: `${API_BASE_PATH}/series`,
  players: `${API_BASE_PATH}/players`,
  creators: `${API_BASE_PATH}/creators`,

  profilesRecommend: `${API_BASE_PATH}/profiles/recommended`,
  searchProfiles: `${API_BASE_PATH}/profiles/search`,

  seriesDetailGames: `${API_BASE_PATH}/series/:id/games`,
  seriFootprints: `${API_BASE_PATH}/series/:id/footprints`,
  seriDetail: `${API_BASE_PATH}/series/:id`,
  seriRanking: `${API_BASE_PATH}/series/:id/ranking-players`,
  seriReviewComment: `${API_BASE_PATH}/series/:id/comments`,

  rallyRanking: `${API_BASE_PATH}/games/:id/ranking-players`,

  tags: `${API_BASE_PATH}/tags`,
  searchGames: `${API_BASE_PATH}/games/search`,
  detailGame: `${API_BASE_PATH}/games/:id`,
  detailSeri: `${API_BASE_PATH}/series/:id`,
  categories: `${API_BASE_PATH}/inquiries/categories`,
  inquiries: `${API_BASE_PATH}/inquiries`,
  spotGame: `${API_BASE_PATH}/games/:id/spots`,
  footprints: `${API_BASE_PATH}/games/:id/footprints`,
  spotDetail: `${API_BASE_PATH}/spots/:spotId`,
  spotComment: `${API_BASE_PATH}/spots/:id/comments`,
  reviewComment: `${API_BASE_PATH}/games/:id/comments`,
  commentDetail: `${API_BASE_PATH}/comments/:id`,
  replyComment: `${API_BASE_PATH}/comments/:id/replies`,
  gameHistories: `${API_BASE_PATH}/games/:id/history`,
  seriesHistories: `${API_BASE_PATH}/series/:id/history`,
  userFollowers: `${API_BASE_PATH}/profiles/:id/followers`,
  userFollowings: `${API_BASE_PATH}/profiles/:id/followings`,

  user: {
    info: `${API_USER_PATH}/info`,
    favoriteGame: `${API_USER_PATH}/favorite/games`,
    favoriteSeri: `${API_USER_PATH}/favorite/series`,
    games: `${API_USER_PATH}/games`,
    series: `${API_USER_PATH}/series`,
    reward: `${API_USER_PATH}/reward_templates`,
    singleGames: `${API_USER_PATH}/single-games`,
    seriesCertificate: `${API_USER_PATH}/series/[id]/certificate_image_template`,
    rallyCertificate: `${API_USER_PATH}/games/[id]/certificate_image_template`,
    playingGames: `${API_USER_PATH}/playing/games`,

    playingSeries: `${API_USER_PATH}/playing/series`,
    checkinHistory: `${API_USER_PATH}/checkin/history`,
    following: `${API_USER_PATH}/following/users`,
    followers: `${API_USER_PATH}/followers`,
    checkin: `${API_USER_PATH}/checkin`,
    likeCmt: `${API_BASE_PATH}/comments/:id/like/like`,
    unLikeCmt: `${API_BASE_PATH}/comments/:id/like/unlike`,
    deleteCmt: `${API_BASE_PATH}/comments/:id`,
    updateCmt: `${API_BASE_PATH}/comments/:id`,
    deleteSpot: `${API_USER_PATH}/games/:rallyId/spots/:spotId`,
    spotOrder: `${API_USER_PATH}/games/:id/spots-ordering`,
    activities: `${API_USER_PATH}/activities`
  },

  certificate: `${API_BASE_PATH}/certificates/:id`,

  getSpotsCheckin: `${API_BASE_PATH}/games/:id/spots`,

  creatorApplication: `${API_BASE_PATH}/creator_application`,
  notifications: `${API_BASE_PATH}/notifications`,
  readAllNotifications: `${API_BASE_PATH}/notifications/read_all`,
  userNotifications: `${API_BASE_PATH}/user/notifications`,
  viewNotification: `${API_BASE_PATH}/notifications/:id/update-view`,
  viewUserNotification: `${API_USER_PATH}/notifications/:id/update-view`,
  readAllUserNotifications: `${API_USER_PATH}/notifications/read_all`,
  couponRewards: `${API_USER_PATH}/coupon-rewards`,
  couponDetail: `${API_USER_PATH}/coupon-rewards/:id`,
  applyCoupon: `${API_USER_PATH}/coupon-rewards/:id/apply`
};

export default API_PATHS;
