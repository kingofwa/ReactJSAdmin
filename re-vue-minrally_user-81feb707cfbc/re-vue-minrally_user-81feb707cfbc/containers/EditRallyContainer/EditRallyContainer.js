/* eslint-disable import/no-unresolved */
import HeaderBack from "@components/common/header/HeaderBack";
import RallySteps from "@components/RallyCreate/RallySteps";
import RallyTitle from "@components/RallyCreate/RallyTitle";
import { editGames, getRallyInfo } from "@components/RallyCreate/service";
import PATHS from "@config/paths";
import { LoaderContext } from "@contexts/loader";
import { omit, size } from "lodash";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import RallyInfoForm from "@components/RallyCreate/RallyInfoForm";
import moment from "moment-timezone";
import { generateFormData } from "@utils/form";
import { formatRelatedLinks } from "@utils/helper";
// import { srcToFile } from "@utils/image";
import { DATE_DEFAULT } from "@utils/date";
import { MESSAGE_DURATION, PHOTO, RALLY_PERIOD } from "@utils/constants";
import { RALLY_STATUS } from "@config/constants";
import { message } from "antd";
import { MESSAGES } from "@config/messages";
import styles from "./styles.module.scss";

const EditRallyContainer = () => {
  const router = useRouter();
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);
  const rallyId = router?.query?.rallyId;
  const [rallyInfo, setRallyInfo] = useState();
  const [preRelatedLinks, setPreRelatedLinks] = useState();
  const [topImage, setTopImage] = useState();
  const [googleImage, setGoogleImage] = useState();
  const [isDraft, setIsDraft] = useState(false);
  const [data, setData] = useState({});
  // const [initPhoto, setInitPhoto] = useState();

  const isCreate = router?.query?.isEdit === "false";

  const isPublished = data?.status === RALLY_STATUS.PUBLISHED;

  const fetchRallyInfo = async () => {
    try {
      showLoadingAnim();
      const response = await getRallyInfo(rallyId);
      setData(response);
      const relatedLinks =
        size(response?.related_links) > 0
          ? response?.related_links
          : [{ name: "", url: "" }];
      setPreRelatedLinks(response?.related_links);
      const youtubeLinks =
        size(response?.youtube_video_list) > 0
          ? response?.youtube_video_list
          : [""];
      const info = {
        name: response?.name,
        description: response?.description,
        tags: response?.tag_list,
        youtube_videos: youtubeLinks,
        related_links_attributes: relatedLinks,
        note: response?.note || "",
        note_updated_at: response?.note_updated_at,
        created_at: response?.created_at
      };
      if (response?.start_date && response?.end_date) {
        const startDate = moment(response?.start_date);
        const endDate = moment(response?.end_date);
        info.periodDate = {
          start_date: startDate,
          end_date: endDate
        };
      }
      setGoogleImage(response?.google_image_url);
      setTopImage(response?.top_photo_url);
      setRallyInfo(info);
    } catch (error) {
      //
    } finally {
      hideLoadingAnim();
    }
  };

  useEffect(() => {
    if (rallyId) {
      fetchRallyInfo();
    }
  }, [rallyId]);

  const onSubmit = async values => {
    try {
      showLoadingAnim();
      const youtubeVideos = values.youtube_videos?.filter(item => !!item);
      const relatedLinksAttributes = values?.related_links_attributes?.filter(
        item => item.name && item.url
      );
      let params = {
        ...values,
        description: values?.description.trim(),
        note: values.note.trim(),
        youtube_videos: youtubeVideos || [],
        related_links_attributes: formatRelatedLinks(
          preRelatedLinks,
          relatedLinksAttributes
        )
      };
      params = omit(params, ["top_photo", "periodDate"]);
      if (values.top_photo) {
        if (values.top_photo === PHOTO.delete) {
          params.top_photo = null;
        } else {
          params.top_photo = values.top_photo?.file?.originFileObj;
        }
      }
      const startDate = moment(values?.periodDate?.start_date)
        .tz("Asia/Tokyo")
        .format(DATE_DEFAULT);
      const endDate = moment(values?.periodDate?.end_date)
        .tz("Asia/Tokyo")
        .format(DATE_DEFAULT);
      const hasExpired = values?.period === RALLY_PERIOD.expired;

      params.start_date = hasExpired ? startDate : "";
      params.end_date = hasExpired ? endDate : "";

      const payload = generateFormData(params);
      await editGames(rallyId, payload);

      let url = isCreate
        ? PATHS.rallyCreateSpotList.replace(/:rallyId/, rallyId)
        : PATHS.rallyEditSpotList.replace(/:rallyId/, rallyId);
      if (isDraft) {
        url = PATHS.mypageCreator;
      }
      message.success({
        content: MESSAGES.updateAndSave,
        duration: MESSAGE_DURATION
      });
      router.push(url);
    } catch (error) {
      message.error({ content: error, duration: MESSAGE_DURATION });
    } finally {
      hideLoadingAnim();
    }
  };

  return (
    <>
      <HeaderBack
        title={isCreate ? "ラリー作成" : "ラリー編集"}
        backUrl={PATHS.mypageCreator}
      />
      <div className={styles.container}>
        <div className={styles.noteHead}>
          以下の必須項目(*)を入力し、
          <br /> スポット登録にお進みください。
        </div>
        <RallySteps current={0} isPublished={isPublished} rallyId={rallyId} />
        <RallyTitle content="ラリー情報" />
        <RallyInfoForm
          onSubmit={onSubmit}
          rallyInfo={rallyInfo}
          topImage={topImage}
          isEdit
          setIsDraft={setIsDraft}
          isCreate={isCreate}
          googleImage={googleImage}
        />
      </div>
    </>
  );
};

export default EditRallyContainer;
