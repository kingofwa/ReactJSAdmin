import PATHS from "@config/paths";
import { retrieveUserInfo } from "@utils/storage/user";
import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const withPrivateRoute = WrappedComponent => {
  return props => {
    if (typeof window !== "undefined") {
      const router = useRouter();

      const [mounted, setMounted] = useState(false);

      const isLogin = !_.isEmpty(retrieveUserInfo());

      useEffect(() => {
        setMounted(true);
      }, []);

      if (!isLogin) {
        const redirectPath = `${PATHS.login}?redirectTo=${router.asPath}`;
        router.push(redirectPath);
        return null;
      }
      return mounted && <WrappedComponent {...props} />;
    }
    return null;
  };
};

export default withPrivateRoute;
