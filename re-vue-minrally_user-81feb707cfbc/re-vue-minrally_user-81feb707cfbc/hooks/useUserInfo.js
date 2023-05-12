import { useAuth } from "@contexts/auth";
import { getUserInfo } from "@services/user/info";
import { useEffect, useState } from "react";

// this hook Get user info and save to localStorage

const useUserInfo = () => {
  const auth = useAuth();

  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    if (auth?.isLoggedIn)
      getUserInfo().then(res => {
        if (res) {
          setUserInfo(res);
          auth.updateUserInfo(res);
        }
      });
  }, [auth?.isLoggedIn]);

  return userInfo;
};

export default useUserInfo;
