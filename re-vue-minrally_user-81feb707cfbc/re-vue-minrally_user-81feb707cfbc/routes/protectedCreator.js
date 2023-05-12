import PATHS from "@config/paths";
import { getRole, ROLE } from "@utils/storage/user";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const protectedCreator = WrappedComponent => {
  return props => {
    if (typeof window !== "undefined") {
      const router = useRouter();

      const [mounted, setMounted] = useState(false);

      const isCreator = getRole() === ROLE.creator;

      useEffect(() => {
        setMounted(true);
      }, []);

      if (!isCreator) {
        router.push(PATHS.mypageCreator);
        return null;
      }
      return mounted && <WrappedComponent {...props} />;
    }
    return null;
  };
};

export default protectedCreator;
