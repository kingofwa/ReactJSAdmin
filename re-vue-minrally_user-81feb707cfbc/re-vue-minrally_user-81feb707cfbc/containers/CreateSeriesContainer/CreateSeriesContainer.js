/* eslint-disable no-plusplus */
import HeaderBack from "@components/common/header/HeaderBack";
import SeriesInfoForm from "@components/mypage/Creator/SeriesInfoForm";
import { MESSAGES } from "@config/messages";
import PATHS from "@config/paths";
import { LoaderContext } from "@contexts/loader";
import { MESSAGE_DURATION, RALLY_PERIOD } from "@utils/constants";
import { DATE_DEFAULT } from "@utils/date";
import { message } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { createGameSeri } from "@components/mypage/service";

const CreateSeriesContainer = () => {
  const router = useRouter();
  const [iSubmit, setIsSubmit] = useState(false);

  // const [avatarUrl, setAvatarUrl] = useState("");
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);

  const { redirectTo = PATHS.mypageCreator } = router.query;

  const onSubmit = async value => {
    try {
      showLoadingAnim();
      setIsSubmit(true);
      const startDate = moment(value?.periodDate?.start_date).format(
        DATE_DEFAULT
      );
      const endDate = moment(value?.periodDate?.end_date).format(DATE_DEFAULT);
      const hasExpired = value?.period === RALLY_PERIOD.expired;
      const payloads = {
        name: value.name.trim(),
        description: value.description.trim(),
        tags: value.tags,
        game_ids: value.game_ids,
        ...value.certificateSeri
      };
      if (hasExpired) {
        payloads.start_date = startDate;
        payloads.end_date = endDate;
      }

      await createGameSeri(payloads);
      message.success({
        content: MESSAGES.createSuccess,
        duration: MESSAGE_DURATION
      });
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.push(PATHS.mypageCreator);
      }
    } catch (error) {
      //
    } finally {
      hideLoadingAnim();
      setIsSubmit(true);
    }
  };

  return (
    <>
      <HeaderBack title="グランドラリー作成" />
      <SeriesInfoForm onSubmit={onSubmit} isSubmit={iSubmit} />
    </>
  );
};

export default CreateSeriesContainer;
