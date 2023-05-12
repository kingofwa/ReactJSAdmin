/* eslint-disable import/no-unresolved */
import HeaderBack from "@components/common/header/HeaderBack";
import RallySteps from "@components/RallyCreate/RallySteps";
import RallyTitle from "@components/RallyCreate/RallyTitle";
import { createGames } from "@components/RallyCreate/service";
import PATHS from "@config/paths";
import { LoaderContext } from "@contexts/loader";
import { get } from "lodash";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import RallyInfoForm from "@components/RallyCreate/RallyInfoForm";
import { DATE_DEFAULT } from "@utils/date";
import moment from "moment";
import { MESSAGE_DURATION, RALLY_PERIOD } from "@utils/constants";
import { message } from "antd";
import { MESSAGES } from "@config/messages";
import { formatRelatedLinks } from "@utils/helper";
import styles from "./styles.module.scss";

const CreateRallyContainer = () => {
  const router = useRouter();
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);
  const [isDraft, setIsDraft] = useState(false);

  const onSubmit = async value => {
    try {
      showLoadingAnim();
      const youtubeVideos = value.youtube_videos?.filter(item => !!item);
      const relatedLinksAttributes = value?.related_links_attributes?.filter(
        item => item.name && item.url
      );

      const startDate = moment(value?.periodDate?.start_date).format(
        DATE_DEFAULT
      );
      const endDate = moment(value?.periodDate?.end_date).format(DATE_DEFAULT);

      const hasExpired = value?.period === RALLY_PERIOD.expired;

      const params = {
        name: value?.name,
        description: value?.description,
        tags: value?.tags,
        youtube_videos: youtubeVideos,
        related_links_attributes: formatRelatedLinks([], relatedLinksAttributes)
      };
      if (value?.note) {
        params.note = value?.note;
      }
      if (hasExpired) {
        params.start_date = startDate;
        params.end_date = endDate;
      }

      const response = await createGames(params);
      const rallyId = get(response, "data.id");
      let url = PATHS.rallyCreateSpotList.replace(/:rallyId/, rallyId);
      if (isDraft) {
        message.success({
          content: MESSAGES.saveDraft,
          duration: MESSAGE_DURATION
        });
        url = PATHS.mypageCreator;
      }
      router.push(url);
    } catch (error) {
      message.error({ content: error, duration: MESSAGE_DURATION });
    } finally {
      hideLoadingAnim();
    }
  };

  return (
    <>
      <HeaderBack title="ラリー作成" />
      <div className="create-rally-detail-container">
        <div className={styles.noteHead}>
          以下の必須項目(*)を入力し、
          <br /> スポット登録にお進みください。
        </div>
        <RallySteps current={0} />
        <RallyTitle content="ラリー情報" />
        <RallyInfoForm onSubmit={onSubmit} setIsDraft={setIsDraft} />
      </div>
    </>
  );
};

export default CreateRallyContainer;
