import { EmptyLayout, MainLayout } from '@layouts';
import { PATHS } from '@config/paths';
import LoginPage from '@pages/login';
import DashBoard from '@pages/dashBoard';
import BusinessManagement from '@pages/businessManagement';
import UserManagement from '@pages/userManagement';
import BusinessDetail from '@pages/businessDetail';
import SeriesDetail from '@pages/seriesDetail';
import BusinessNew from '@pages/businessNew';
import EventDetail from '@pages/eventDetail';
import SeriesNew from '@pages/seriesNew';
import UserDetail from '@pages/userDetail';
import MasterApplicationList from '@pages/masterApplicationList';
import MasterApplicationDetail from '@pages/masterApplicationDetail';
import BannerAdministration from '@pages/bannerAdministration';
import BannerDetail from '@pages/bannerDetail';
import BannerNew from '@pages/bannerNew';
import EventRegistration from '@pages/eventRegistration';
import EventRegistrationSpot from '@pages/eventRegistrationSpot';
import EventRegistrationSpotSetting from '@pages/eventRegistrationSpotSetting';
import EventRegistrationSystemSetting from '@pages/EventRegistrationSystemSetting';
import RecommendationManagement from '@pages/RecommendationManagement';
import NotificationManagement from '@pages/NotificationManagement';
import NotificationRegistration from '@pages/NotificationRegistration';
import NotificationDetail from '@pages/NotificationDetail';
import FeaturedManagement from '@pages/FeaturedManagement';
import BusinessLoginPage from '@pages/Business/Login';
import BusinessDashBoardPage from '@pages/Business/DashBoard';
import BusinessInfoPage from '@pages/Business/BusinessInfo';
import GrandRallyManagement from '@pages/Business/GrandRallyManagement';
import NewGrandRally from '@pages/Business/NewGrandRally';
import RallyManagement from '@pages/Business/RallyManagement';
import PlayerManagement from '@pages/Business/PlayerManagement';
import PlayerDetail from '@pages/Business/PlayerDetail';
import NewRally from '@pages/Business/NewRally/NewRally';
import GrandRallyDetail from '@pages/Business/GrandRallyDetail';
import RallyDetail from '@pages/Business/RallyDetail/RallyDetail';
import NewRallySpotList from '@pages/Business/NewRallySpotList';
import EditSpot from '@pages/Business/EditSpot';
import NewRallySystemSetting from '@pages/Business/NewRallySystemSetting';
import ForgotPassword from '@pages/Business/ForgotPassword';
import ResetPassword from '@pages/Business/ResetPassword/ResetPassword';
import RewardManagement from '@pages/RewardManagement';
import RewardManagementDetail from '@pages/RewardManagementDetail';

export const INIT_ROUTES = [
  {
    path: PATHS.login,
    layout: EmptyLayout,
    component: LoginPage,
    exact: true
  },
  {
    path: PATHS.business.home,
    layout: EmptyLayout,
    component: BusinessLoginPage,
    exact: true
  },
  {
    path: PATHS.business.login,
    layout: EmptyLayout,
    component: BusinessLoginPage,
    exact: true
  },
  {
    path: PATHS.business.forgotPassword,
    layout: EmptyLayout,
    component: ForgotPassword
  },
  {
    path: PATHS.business.resetPassword,
    layout: EmptyLayout,
    component: ResetPassword
  }
];

export const ROUTES = [
  ...INIT_ROUTES,
  {
    path: PATHS.dashboard,
    layout: MainLayout,
    component: DashBoard,
    exact: true,
    private: true,
    breadcrumbName: 'ダッシュボード'
  },
  {
    path: PATHS.businessManagement,
    layout: MainLayout,
    component: BusinessManagement,
    exact: true,
    private: true,
    breadcrumbName: '事業者管理'
  },
  {
    path: PATHS.userManagement,
    layout: MainLayout,
    component: UserManagement,
    exact: true,
    private: true,
    breadcrumbName: 'ユーザー管理'
  },
  {
    path: PATHS.businessDetail,
    layout: MainLayout,
    component: BusinessDetail,
    private: true
  },
  {
    path: PATHS.seriesDetail,
    layout: MainLayout,
    component: SeriesDetail,
    private: true
  },
  {
    path: PATHS.businessNew,
    layout: MainLayout,
    component: BusinessNew,
    private: true
  },
  {
    path: PATHS.eventDetail,
    layout: MainLayout,
    component: EventDetail,
    private: true
  },
  {
    path: PATHS.seriesNew,
    layout: MainLayout,
    component: SeriesNew,
    private: true
  },
  {
    path: PATHS.userDetail,
    layout: MainLayout,
    component: UserDetail,
    private: true
  },
  {
    path: PATHS.masterApplicationList,
    layout: MainLayout,
    component: MasterApplicationList,
    private: true
  },
  {
    path: PATHS.masterApplicationDetail,
    layout: MainLayout,
    component: MasterApplicationDetail,
    private: true
  },
  {
    path: PATHS.bannerAdministration,
    layout: MainLayout,
    component: BannerAdministration,
    private: true
  },
  {
    path: PATHS.bannerDetail,
    layout: MainLayout,
    component: BannerDetail,
    private: true
  },
  {
    path: PATHS.bannerNew,
    layout: MainLayout,
    component: BannerNew,
    private: true
  },
  {
    path: PATHS.eventRegistration,
    layout: MainLayout,
    component: EventRegistration,
    private: true
  },
  {
    path: PATHS.eventRegistrationSpot,
    layout: MainLayout,
    component: EventRegistrationSpot,
    private: true
  },
  {
    path: PATHS.eventRegistrationSpotSetting,
    layout: MainLayout,
    component: EventRegistrationSpotSetting,
    private: true
  },
  {
    path: PATHS.eventRegistrationSystemSetting,
    layout: MainLayout,
    component: EventRegistrationSystemSetting,
    private: true
  },
  {
    path: PATHS.recommendationManagement,
    layout: MainLayout,
    component: RecommendationManagement,
    private: true
  },
  {
    path: PATHS.notificationManagement,
    layout: MainLayout,
    component: NotificationManagement,
    private: true
  },
  {
    path: PATHS.notificationRegistration,
    layout: MainLayout,
    component: NotificationRegistration,
    private: true
  },
  {
    path: PATHS.notificationDetail,
    layout: MainLayout,
    component: NotificationDetail,
    private: true
  },
  {
    path: PATHS.featuredManagement,
    layout: MainLayout,
    component: FeaturedManagement,
    private: true
  },
  {
    path: PATHS.business.forgotPassword,
    layout: MainLayout,
    component: ForgotPassword,
    private: true
  }
];

export const BUSINESS_ROUTES = [
  ...INIT_ROUTES,
  {
    path: PATHS.business.dashboard,
    layout: MainLayout,
    component: BusinessDashBoardPage,
    exact: true,
    private: true,
    breadcrumbName: 'ダッシュボード'
  },
  {
    path: PATHS.business.info,
    layout: MainLayout,
    component: BusinessInfoPage,
    private: true
  },
  {
    path: PATHS.business.grandRallyManagement,
    layout: MainLayout,
    component: GrandRallyManagement,
    private: true
  },
  {
    path: PATHS.business.newGranRally,
    layout: MainLayout,
    component: NewGrandRally,
    private: true
  },
  {
    path: PATHS.business.rallyManagement,
    layout: MainLayout,
    component: RallyManagement,
    private: true
  },
  {
    path: PATHS.business.playerManagement,
    layout: MainLayout,
    component: PlayerManagement,
    private: true
  },
  {
    path: PATHS.business.playerDetail,
    layout: MainLayout,
    component: PlayerDetail,
    private: true
  },
  {
    path: PATHS.business.newRally,
    layout: MainLayout,
    component: NewRally,
    private: true
  },
  {
    path: PATHS.business.grandRallyDetail,
    layout: MainLayout,
    component: GrandRallyDetail,
    private: true
  },
  {
    path: PATHS.business.rallyDetail,
    layout: MainLayout,
    component: RallyDetail,
    private: true
  },
  {
    path: PATHS.business.newRallySpotList,
    layout: MainLayout,
    component: NewRallySpotList,
    private: true
  },
  {
    path: PATHS.business.editSpot,
    layout: MainLayout,
    component: EditSpot,
    private: true
  },
  {
    path: PATHS.business.newRallySystemSetting,
    layout: MainLayout,
    component: NewRallySystemSetting,
    private: true
  },
  {
    path: PATHS.business.rewardManagement,
    layout: MainLayout,
    component: RewardManagement,
    private: true
  },
  {
    path: PATHS.business.rewardManagementDetail,
    layout: MainLayout,
    component: RewardManagementDetail,
    private: true
  }
];
