import Rally from "@components/mypage/Player/FavoriteContainer/Rally";
import withPrivateRoute from "@routes/withPrivaterRoute";
// import { PrivateLayout } from "@layouts";

const LikedRallyPage = () => {
  return <Rally />;
};

// LikedRallyPage.layout = PrivateLayout;

export default withPrivateRoute(LikedRallyPage);
