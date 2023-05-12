import { TYPE_USER } from "@config/constants";
import PATHS from "@config/paths";
import { RANKING_FILTER } from "@utils/constants";
import { useRouter } from "next/router";
import { useCallback } from "react";
import styles from "./styles.module.scss";

const RankingUserItem = ({
  user,
  rank,
  type,
  role,
  isShowUser,
  isFixedUser
}) => {
  const router = useRouter();
  const goProfile = () => {
    if (role === TYPE_USER.player)
      router.push(PATHS.profilePlayerRally.replace(/\[id\]/, user?.id));
    else if (role === TYPE_USER.creator)
      router.push(PATHS.profileCreatorRally.replace(/\[id\]/, user?.id));
  };

  // const formatFastestFinishTime = (day, hours, minutes) => {
  //   let unit;
  //   if (!day && !hours) unit = `${minutes ?? 0}分`;
  //   else if (!day) unit = `${hours}時間${minutes}分`;
  //   else unit = `${day}日${hours}時間${minutes}分`;
  //   return unit;
  // };

  const renderUnit = useCallback(() => {
    let unit;
    switch (type) {
      case RANKING_FILTER.followerCount:
        unit = `${user?.follower_count ?? 0}人`;
        break;
      case RANKING_FILTER.ralliesCreatedCount:
        unit = `${user?.rallies_created_count ?? 0}ラリー`;
        break;
      case RANKING_FILTER.peopleCheckedCount:
        unit = `${user?.people_checked_count ?? 0}回`;
        break;
      case RANKING_FILTER.peopleTraveledDistance:
        // unit = `${(user?.people_traveled_distance / 1000).toFixed(1) || 0}km`;
        unit = `${(user?.people_traveled_distance / 1000 ?? 0).toFixed(1)}km`;
        break;
      case RANKING_FILTER.checkedCount:
        unit = `${user?.checked_count ?? 0}回`;
        break;
      case RANKING_FILTER.traveledDistance:
        // unit = `${Math.round(user?.traveled_distance ?? 0)}km`;
        unit = `${(user?.traveled_distance / 1000 ?? 0).toFixed(1)}km`;
        break;
      case RANKING_FILTER.ralliesCompletedCount:
        unit = `${user?.rallies_completed_count ?? 0}ラリー`;
        break;
      case RANKING_FILTER.fastestFinishTime:
        // unit = formatFastestFinishTime(
        //   user?.fastest_finish_time?.days,
        //   user?.fastest_finish_time?.hours,
        //   user?.fastest_finish_time?.minutes
        // );
        unit = user?.fastest_finish_time_string;
        break;

      case RANKING_FILTER.numberOfTimesCompleted:
        unit = `${user?.number_of_times_completed ?? 0}回`;
        break;
      default:
        unit = `${user?.rallies_joined_count ?? 0}ラリー`;
        break;
    }
    return unit;
  }, [type, user]);

  const isShowItem = useCallback(() => {
    switch (type) {
      case RANKING_FILTER.followerCount:
        return user?.follower_count > 0;
      case RANKING_FILTER.ralliesCreatedCount:
        return user?.rallies_created_count > 0;
      case RANKING_FILTER.peopleCheckedCount:
        return user?.people_checked_count > 0;
      case RANKING_FILTER.peopleTraveledDistance:
        return user?.people_traveled_distance > 0;
      case RANKING_FILTER.checkedCount:
        return user?.checked_count > 0;
      case RANKING_FILTER.traveledDistance:
        return user?.traveled_distance > 0;
      case RANKING_FILTER.ralliesCompletedCount:
        return user?.rallies_completed_count > 0;
      case RANKING_FILTER.fastestFinishTime:
        return user?.fastest_finish_time_string;
      case RANKING_FILTER.numberOfTimesCompleted:
        return user?.number_of_times_completed > 0;
      default:
        return user?.rallies_joined_count > 0;
    }
  }, [type, user]);

  if (isShowItem()) {
    return (
      <div
        className={
          (isShowUser && styles.showUserItem) ||
          (isFixedUser && styles.showFixedUserItem)
        }
      >
        <div className={styles.userItem}>
          {rank < 4 ? (
            <div className={styles.ranking}>
              <img
                src={`/icons/ic-rank-${rank}.svg`}
                alt="ranking"
                className={styles.rankIcon}
              />
              <span className={styles.rank}>{rank}</span>
            </div>
          ) : (
            <span className={styles.ranking}>{rank}位</span>
          )}
          <div className={styles.avatar} onClick={goProfile}>
            <img
              alt="avatar"
              src={user?.avatar_url || "/img/avatar-holder.svg"}
            />
          </div>
          <span className={styles.name} onClick={goProfile}>
            {user?.user_name}
          </span>
          <p className={styles.time}>{renderUnit()}</p>
        </div>
      </div>
    );
  }
  return null;
};

export default RankingUserItem;
