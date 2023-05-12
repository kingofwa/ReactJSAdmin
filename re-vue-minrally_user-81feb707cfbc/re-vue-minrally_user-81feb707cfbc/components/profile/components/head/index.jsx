import PATHS from "@config/paths";
import { useAuth } from "@contexts/auth";
import { Avatar, Button, Row } from "antd";
import useMe from "hooks/useMe";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import RenderButtonFollow from "@components/ButtonFollow";
import UpdateProfileModal from "../update-profile-modal";
import styles from "./style.module.scss";

const Head = ({ profile, getProfile, isMyProfile }) => {
  const auth = useAuth();
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const showModalUpdate = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const isShowFollow =
    useMe(profile?.id) || profile?.setting?.show_following_rally;

  const getNumberOfFollowing = () => {
    return profile?.number_of_following ?? 0;
  };

  const getNumberOfFollowers = () => {
    return profile?.number_of_followers ?? 0;
  };

  const onGoUserFollower = () => {
    if (isShowFollow) {
      const url = PATHS.playerFollowerById.replace(/:id/, profile?.id);
      router.push(url);
    }
  };

  const onGoUserFollowed = () => {
    if (isShowFollow) {
      const url = PATHS.playerFollowedUserById.replace(/:id/, profile?.id);
      router.push(url);
    }
  };

  return (
    <div className={styles.headProfile}>
      <Avatar
        className={styles.avatar}
        src={profile?.avatar_url || "/img/avatar-holder.svg"}
      />
      {isMyProfile && (
        <Button className={styles.btnImage} onClick={showModalUpdate}>
          編 集
        </Button>
      )}

      {!isMyProfile && (
        <RenderButtonFollow profile={profile} />
      )}

      <div className={styles.userName}>{profile?.user_name}</div>
      {profile?.is_follower && (
        <div className={styles.follower}>フォローされています</div>
      )}

      <div className={styles.follow}>
        <span
          onClick={onGoUserFollowed}
          className={isShowFollow && styles.followText}
        >
          <b>{getNumberOfFollowing()}</b> フォロー中
        </span>
        <span
          onClick={onGoUserFollower}
          className={isShowFollow && styles.followText}
        >
          <b>{getNumberOfFollowers()}</b> フォロワー
        </span>
      </div>
      <div className={styles.introduction}>{profile?.information}</div>
      <Row className={styles.socialGroup} justify="center">
        {profile?.related_links?.map(item => (
          <span key={item.id}>
            <Link href={item.url}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialItem}
              >
                {item.name}
              </a>
            </Link>
          </span>
        ))}
      </Row>

      {auth.isLoggedIn && (
        <UpdateProfileModal
          visible={visible}
          hideModal={hideModal}
          getProfile={getProfile}
        />
      )}
    </div>
  );
};

export default Head;
