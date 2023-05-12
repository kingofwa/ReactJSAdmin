import { Button, Tooltip } from "antd";
import { useRouter } from "next/router";
import PATHS from "@config/paths";
import { STATUS_RESPONSE } from "@utils/constants";
import { useAuth } from "@contexts/auth";
import { useEffect, useState } from "react";
import {
  addUserFollower,
  deleteUserFollower
} from "@components/mypage/service";
import styles from "./styles.module.scss";

const RenderButtonFollow = ({ profile }) => {
  const auth = useAuth();
  const router = useRouter();
  const [isFollow, setFollow] = useState();

  const handleFollow = id => {
    if (auth?.isLoggedIn) {
      addUserFollower({ user_id: id })
        .then(res => {
          if (res.status === STATUS_RESPONSE.success) {
            setFollow(true)
          }
        })
        .finally();
    } else {
      router.push(`${PATHS.login}?redirectTo=${router.asPath}`);
    }
  };

  const handleUnFollow = id => {
    deleteUserFollower(id)
      .then(res => {
        if (res.status === STATUS_RESPONSE.success) {
          setFollow(false)
        }
      })
      .finally();
  };

  const handleFollowUser = () => {
    return !isFollow
      ? handleFollow(profile?.id)
      : handleUnFollow(profile?.id);
  };

  const content = (
    <button type="button" className={styles.textConfirmUnFollow} onClick={handleFollowUser}  key={profile?.id}>{profile?.user_name}さんの<br />フォローを解除する</button>
  );
  useEffect(() => {
    if (profile) {
      setFollow(profile?.is_following)
    }
  }, profile)
  return (
    <>
      {isFollow && auth?.isLoggedIn ? (
        <Tooltip placement="left" title={content} trigger="click" overlayClassName={`${styles.TooltipContain}`} color="white" overlayInnerStyle={{ 'border-radius': '6px' }}>
          <Button className={`${styles.btnFollow} ${styles.active}`}>フォロー中</Button>
        </Tooltip>

      ) : (
        <Button className={styles.btnFollow} onClick={handleFollowUser}>
          フォローする
        </Button>
      )}
    </>
  )
}
export default RenderButtonFollow;
