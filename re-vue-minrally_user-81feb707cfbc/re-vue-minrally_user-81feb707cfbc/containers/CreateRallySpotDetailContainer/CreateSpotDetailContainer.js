/* eslint-disable import/no-unresolved */
import React, { useContext, useEffect, useState } from "react";
import HeaderBack from "@components/common/header/HeaderBack";
import RallySteps from "@components/RallyCreate/RallySteps";
import RallyTitle from "@components/RallyCreate/RallyTitle";
import SpotDetailForm from "@components/RallyCreate/SpotDetailForm";
import { useRouter } from "next/router";
import { LoaderContext } from "@contexts/loader";
import {
  GetSpotsDetail,
  UpdateSpotsDetail,
  UpdateSpotsDetailDraft
} from "@components/RallyCreate/service";
import { srcToFile } from "@utils/image";
import { generateFormDataMultipleFile } from "@utils/form";
import { formatRelatedLinks } from "@utils/helper";
import PATHS from "@config/paths";
import { MESSAGES } from "@config/messages";
import { size } from "lodash";
import { message } from "antd";
import { MESSAGE_DURATION, SPOT_STATUS } from "@utils/constants";

const SpotRegistrationDetail = () => {
  const router = useRouter();
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);
  const rallyId = router?.query?.rallyId;
  const spotId = router?.query?.id;
  const [spotData, setSpotData] = useState();
  const [listImage, setListImage] = useState([]);
  const [preRelatedLinks, setPreRelatedLinks] = useState();
  const [loading, setLoading] = useState(false);
  const [locationInfo, setLocationInfo] = useState();
  const isEdit = router?.query?.isEdit === "true";
  const [hasPlayer, setHasPlayer] = useState(false);
  const [locationPhoto, setLocationPhoto] = useState();
  const [isDraft, setIsDraft] = useState(false);

  const fetchSpotDetail = async () => {
    try {
      showLoadingAnim();
      setLoading(true);
      const res = await GetSpotsDetail(rallyId, spotId);
      setHasPlayer(res?.game?.number_of_players > 0);
      const response = res?.data;
      const photo = await srcToFile(response?.photo_urls);
      const hasRelatedLinks = size(response?.related_links) > 0;
      const isUnregistered = response?.status === SPOT_STATUS.unregistered;
      const data = {
        ...response,
        photos: { fileList: photo },
        related_links_attributes: hasRelatedLinks
          ? response?.related_links
          : [{ name: "", url: "" }],
        name: isUnregistered ? "" : response?.name
      };

      setSpotData(data);
      const images = photo.map((el, index) => {
        return {
          uid: index,
          originFileObj: el.originFileObj,
          thumbUrl: el.url
        };
      });
      setListImage(images);
      setPreRelatedLinks(response?.related_links);
      setLocationInfo({
        address: response?.address,
        coordinates: { lat: Number(response?.lat), lng: Number(response?.lng) }
      });
    } catch (error) {
      //
    } finally {
      setLoading(false);
      hideLoadingAnim();
    }
  };

  useEffect(() => {
    if (spotId && rallyId) {
      fetchSpotDetail();
    }
  }, [spotId, rallyId]);

  const onSubmit = async values => {
    try {
      showLoadingAnim();
      const relatedLinksAttributes = values?.related_links_attributes?.filter(
        item => item.name && item.url
      );
      const fileList = values?.photos?.fileList?.map(el => {
        return el.originFileObj;
      });

      const params = {
        ...values,
        related_links_attributes: formatRelatedLinks(
          preRelatedLinks,
          relatedLinksAttributes
        ),
        // photos: fileList,
        address: locationInfo?.address,
        lat: Number(locationInfo?.coordinates?.lat),
        lng: Number(locationInfo?.coordinates?.lng),
        description: values?.description || ""
      };
      if (size(values?.photos?.fileList) === 0) {
        params.photos = null;
      } else {
        params.photos = fileList;
      }
      if (locationPhoto) {
        params.google_image_url = locationPhoto;
      }
      const payload = generateFormDataMultipleFile(
        {
          ...params
        },
        "photos"
      );

      if (isDraft) {
        await UpdateSpotsDetailDraft(rallyId, spotId, payload);
      } else {
        await UpdateSpotsDetail(rallyId, spotId, payload);
      }

      let url = PATHS.rallyCreateSpotList.replace(/:rallyId/, rallyId);
      if (isEdit) {
        message.success({
          content: MESSAGES.editSuccess,
          duration: MESSAGE_DURATION
        });
        url = PATHS.rallyEditSpotList.replace(/:rallyId/, rallyId);
      }
      router.push(url);
    } catch (error) {
      message.error(error);
    } finally {
      hideLoadingAnim();
    }
  };

  const renderContent = () => {
    if (!loading) {
      return (
        <SpotDetailForm
          spotData={spotData}
          preRelatedLinks={preRelatedLinks}
          onSubmit={onSubmit}
          listImage={listImage}
          setListImage={setListImage}
          setLocationInfo={setLocationInfo}
          locationInfo={locationInfo}
          rallyId={rallyId}
          isEdit={isEdit}
          hasPlayer={hasPlayer}
          setLocationPhoto={setLocationPhoto}
          setIsDraft={setIsDraft}
          locationPhoto={locationPhoto}
        />
      );
    }
    return null;
  };

  return (
    <>
      <HeaderBack title={isEdit ? "ラリー編集" : "ラリー作成"} />
      <div className="create-rally-detail-container">
        <RallySteps current={1} />
        <RallyTitle content="スポット設定" />
        {renderContent()}
      </div>
    </>
  );
};

export default SpotRegistrationDetail;
