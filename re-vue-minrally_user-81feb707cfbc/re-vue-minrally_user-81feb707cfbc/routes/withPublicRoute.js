import PATHS from "@config/paths";
import { useAuth } from "@contexts/auth";
// import { useMessage } from "@contexts/message";
// import { getUserInfo } from "@services/user/info";
// import { STATUS_CREATOR } from "@utils/constants";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// TODO : temp
const withPublicRoute = WrappedComponent => {
  return props => {
    if (typeof window !== "undefined") {
      const router = useRouter();
      const auth = useAuth();

      // const { setMessage } = useMessage();
      const [mounted, setMounted] = useState(false);
      useEffect(() => {
        setMounted(true);
      }, []);

      // const getInfo = async () => {
      //   const { accessToken, client, uid, expiry } = router.query;

      //   const credentials = {
      //     accessToken,
      //     client,
      //     uid,
      //     expiry
      //   };
      //   auth.logUserIn({ credentials, user: {} });
      //   try {
      //     const user = await getUserInfo();
      //     auth.logUserIn({ credentials, user });
      //   } catch (error) {
      //     setMessage({
      //       type: "error",
      //       title: "",
      //       message: error
      //     });
      //   }
      // };

      // useEffect(() => {
      //   if (router.query.uid) {
      //     getInfo();
      //   }
      // }, [router.query]);

      if (auth?.user?.is_creator) {
        router.push(PATHS.mypageCreator);
      }
      return mounted && <WrappedComponent {...props} />;
    }
    return null;
  };
};

export default withPublicRoute;
