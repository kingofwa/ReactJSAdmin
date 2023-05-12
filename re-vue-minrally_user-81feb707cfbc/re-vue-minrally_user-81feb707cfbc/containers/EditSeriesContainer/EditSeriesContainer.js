/* eslint-disable no-plusplus */
import HeaderBack from "@components/common/header/HeaderBack";
import SeriesInfoForm from "@components/mypage/Creator/SeriesInfoForm";
import { MESSAGES } from "@config/messages";
import PATHS from "@config/paths";
import { LoaderContext } from "@contexts/loader";
import { PHOTO, RALLY_PERIOD } from "@utils/constants";
import { DATE_DEFAULT } from "@utils/date";
import { generateFormData } from "@utils/form";
import { message } from "antd";
import moment from "moment-timezone";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { getUserASerie, putUserASerie } from "@components/mypage/service";

const EditSeriesContainer = () => {
  moment.tz.setDefault("Asia/Tokyo");
  const router = useRouter();
  const seriId = router?.query?.id;
  const [seriesInfo, setSeriesInfo] = useState();
  const [iSubmit, setIsSubmit] = useState(false);
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);

  const fetchSeriesInfo = async () => {
    try {
      showLoadingAnim();
      const res = await getUserASerie(seriId);
      setSeriesInfo(res.data);
    } catch (error) {
      // console.log(error);
    } finally {
      hideLoadingAnim();
    }
  };

  const onSubmit = async value => {
    try {
      showLoadingAnim();
      setIsSubmit(true);
      const payloads = {
        name: value.name.trim(),
        description: value.description.trim(),
        tags: value.tags,
        game_ids: value.game_ids,
        ...value.certificateSeri
        // top_photo: value.top_photo?.file?.originFileObj
      };

      if (value.top_photo) {
        if (value.top_photo === PHOTO.delete) {
          payloads.top_photo = null;
        } else if (value.top_photo?.file?.originFileObj) {
          payloads.top_photo = value.top_photo?.file?.originFileObj;
        }
      }
      const startDate = moment(value?.periodDate?.start_date).format(
        DATE_DEFAULT
      );
      const endDate = moment(value?.periodDate?.end_date).format(DATE_DEFAULT);
      const hasExpired = value?.period === RALLY_PERIOD.expired;

      payloads.start_date = hasExpired ? startDate : "";
      payloads.end_date = hasExpired ? endDate : "";

      const data = generateFormData(payloads);
      await putUserASerie(seriId, data);
      message.success(MESSAGES.editSuccess);
      router.push(PATHS.mypageCreator);
    } catch (error) {
      message.error(error);
    } finally {
      hideLoadingAnim();
      setIsSubmit(false);
    }
  };

  // const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (seriId) {
      fetchSeriesInfo();
    }
  }, [seriId]);

  return (
    <>
      <HeaderBack title="グランドラリー編集" />
      <SeriesInfoForm
        onSubmit={onSubmit}
        isSubmit={iSubmit}
        seriesInfo={seriesInfo}
        isEdit
      />
    </>
  );
};

export default EditSeriesContainer;
