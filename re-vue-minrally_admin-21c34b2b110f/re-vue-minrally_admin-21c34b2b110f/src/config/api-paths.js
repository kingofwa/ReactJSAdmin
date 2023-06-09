export const API_PATHS = {
  signIn: '/auth/sign_in',
  signOut: '/auth/sign_out',
  statistics: '/statistics',
  creator: '/creator_applications',
  users: '/users',
  searchUsers: '/users/searchs',
  playingSeries: '/users/:user_id/playing/series',
  playingGames: '/users/:user_id/playing/games',
  ownedSeries: '/users/:user_id/owned/series',
  ownedGames: '/users/:user_id/owned/games',
  featuredHashtags: '/featured_hashtags',
  operators: '/operators',
  operatorSeries: '/operators/:operator_id/series',
  operatorGames: '/operators/:operator_id/games',
  banners: '/banners',
  series: '/series',
  seriesGames: '/series/:id/games',
  games: '/games',
  rewardTemplates: '/reward_templates',
  bannersOrder: '/banners/order',
  singleGames: '/operators/:id/single-games',
  seriesAnalysis: '/series/:id/analysis',
  createSeries: '/operators/:id/series',
  eventAnalysis: '/games/:id/analysis',
  notifications: '/notifications',
  tags: '/tags',
  featuredUsers: '/featured_users',
  updateFeaturedUsers: '/featured_users/update',
  spots: '/spots',
  gameSpots: '/games/:id/spots',
  gameSpotsDraft: '/games/:id/spots/save-draft',
  gameSpot: '/games/:game_id/spots/:id',
  gameSpotDraft: '/games/:game_id/spots/:id/save-draft',
  gameSpotOrder: '/games/:game_id/spots-ordering',
  recommended: '/recommended',
  updateRecommended: '/recommended/update',
  eventFinnish: '/games/:id/?save=finish',
  eventFinnishDraft: '/games/:id/?save=draft',
  eventSpot: '/games/:game_id/spots/:spot_id',
  seriesEvent: '/series/:series_id/remove-game/:game_id',
  operatorCsv: '/operators/:id/csv/games',
  sendPassword: '/operators/:id/generate-business-account',
  accInfo: '/acc-info',
  orphanGames: '/games/orphan_games',
  changePassword: '/acc-info/update_password',
  rankingTopUsers: '/featured_users/ranking_top_users',
  rankingTopHashtags: '/tags/ranking_hashtags',
  players: '/players',
  playerPlaying: '/players/:id/plays',
  password: '/auth/password'
};
