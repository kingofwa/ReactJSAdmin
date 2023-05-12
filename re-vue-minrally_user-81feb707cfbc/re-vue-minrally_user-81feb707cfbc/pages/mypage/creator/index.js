/* eslint-disable import/no-unresolved */
import CreatorMypage from "@components/mypage/Creator";
import { HomeLayout } from "@layouts";
import withPrivateRoute from "@routes/withPrivaterRoute";

const CreatorInformationPage = () => {
  return (
    <HomeLayout>
      <CreatorMypage />
    </HomeLayout>
  );
};

export default withPrivateRoute(CreatorInformationPage);
