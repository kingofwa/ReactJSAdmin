import { useAuth } from "@contexts/auth";
import { useEffect, useState } from "react";

// this hook check a profile is self

const useMe = id => {
  const auth = useAuth();
  const [isSelf, setIsSelf] = useState(false);

  useEffect(() => {
    if (auth?.isLoggedIn && id) {
      const userID = auth.user.id;
      // eslint-disable-next-line no-underscore-dangle
      const _isSelf = userID === id;
      setIsSelf(_isSelf);
    }
  }, [auth, id]);

  return isSelf;
};

export default useMe;
