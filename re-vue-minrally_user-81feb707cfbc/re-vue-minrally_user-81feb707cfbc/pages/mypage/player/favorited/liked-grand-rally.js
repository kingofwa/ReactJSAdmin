import GrandRally from "@components/mypage/Player/FavoriteContainer/GrandRally";
import withPrivateRoute from "@routes/withPrivaterRoute";
// import { PrivateLayout } from "@layouts";

const LikedRallyPage = () => {
  return <GrandRally />;
};

// LikedRallyPage.layout = PrivateLayout;

export default withPrivateRoute(LikedRallyPage);
