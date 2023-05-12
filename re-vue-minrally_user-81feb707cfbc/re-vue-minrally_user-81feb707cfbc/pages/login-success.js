/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import Login from "@components/auth/Login";
import { AuthLayout } from "@layouts";
import { useAuth } from "@contexts/auth";
import { LoaderContext } from "@contexts/loader";
import { getUserInfo } from "@services/user/info";
import { message } from "antd";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import PATHS from "@config/paths";

const LoginSuccessPage = () => {
  const router = useRouter();
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);
  const auth = useAuth();

  const { redirect = PATHS.home } = router.query;

  const getInfo = async () => {
    showLoadingAnim();
    const { accessToken, client, uid, expiry, sns_oauth_and_registered } =
      router.query;
    const credentials = {
      accessToken,
      client,
      uid,
      expiry
    };
    auth.logUserIn({ credentials, user: {} });
    try {
      const user = await getUserInfo();
      auth.logUserIn({ credentials, user });
      if (sns_oauth_and_registered === "false") {
        router.push(PATHS.userInfo);
      }
      router.push(redirect);
    } catch (error) {
      message.error(error?.message);
    } finally {
      hideLoadingAnim();
    }
  };

  useEffect(() => {
    if (router.query.uid) {
      getInfo();
    }
  }, [router.query]);

  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
};

export default LoginSuccessPage;
