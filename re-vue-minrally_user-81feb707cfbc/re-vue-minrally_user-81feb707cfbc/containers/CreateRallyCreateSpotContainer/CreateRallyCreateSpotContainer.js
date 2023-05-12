/* eslint-disable import/no-unresolved */
import React, { useContext, useState } from "react";
import HeaderBack from "@components/common/header/HeaderBack";
import RallySteps from "@components/RallyCreate/RallySteps";
import RallyTitle from "@components/RallyCreate/RallyTitle";
import SpotDetailForm from "@components/RallyCreate/SpotDetailForm";
import { useRouter } from "next/router";
import { LoaderContext } from "@contexts/loader";
import { createSpot, createSpotDraft } from "@components/RallyCreate/service";
import { generateFormData, generateFormDataMultipleFile } from "@utils/form";
import PATHS from "@config/paths";
import { get, omit, size } from "lodash";
import { DEFAULT_CENTER_MAP } from "@config/constants";
import { formatRelatedLinks } from "@utils/helper";

const CreateRallyCreateSpotContainer = () => {
  const router = useRouter();
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);
  const rallyId = router?.query?.id;
  const [listImage, setListImage] = useState([]);
  const [isDraft, setIsDraft] = useState(false);
  const [locationInfo, setLocationInfo] = useState({});
  const isEdit = router?.query?.isEdit === "true";
  const [locationPhoto, setLocationPhoto] = useState();

  const onSubmit = async values => {
    try {
      showLoadingAnim();
      const fileList = values?.photos?.fileList?.map(el => {
        return el.originFileObj;
      });
      const relatedLinksAttributes = values?.related_links_attributes?.filter(
        item => item.name && item.url
      );

      let params = {
        ...values,
        address: get(locationInfo, "address"),
        lat: Number(locationInfo?.coordinates?.lat) || DEFAULT_CENTER_MAP.lat,
        lng: Number(locationInfo?.coordinates?.lng) || DEFAULT_CENTER_MAP.lng
      };

      params = omit(params, [
        "photos",
        "related_links_attributes",
        "range",
        "description"
      ]);
      if (size(relatedLinksAttributes) > 0) {
        // params.related_links_attributes = relatedLinksAttributes;
        params.related_links_attributes = formatRelatedLinks(
          [],
          relatedLinksAttributes
        );
      }
      if (size(fileList) === 0 && locationPhoto) {
        params.google_image_url = locationPhoto;
      }
      if (values?.range) {
        params.range = values?.range;
      }

      if (values?.description) {
        params.description = values?.description;
      }

      let payload = generateFormData(params);
      if (values?.photos) {
        params.photos = fileList;
        payload = generateFormDataMultipleFile(params, "photos");
      }

      if (isDraft) {
        await createSpotDraft(rallyId, payload);
      } else {
        await createSpot(rallyId, payload);
      }
      const url = isEdit
        ? PATHS.rallyEditSpotList.replace(/:rallyId/, rallyId)
        : PATHS.rallyCreateSpotList.replace(/:rallyId/, rallyId);
      router.push(url);
    } catch (error) {
      //
    } finally {
      hideLoadingAnim();
    }
  };

  return (
    <>
      <HeaderBack title={isEdit ? "ラリー編集" : "ラリー作成"} />
      <div className="create-rally-detail-container">
        <RallySteps current={1} />
        <RallyTitle content="スポット設定" />
        <SpotDetailForm
          onSubmit={onSubmit}
          listImage={listImage}
          setListImage={setListImage}
          setIsDraft={setIsDraft}
          setLocationInfo={setLocationInfo}
          locationInfo={locationInfo}
          setLocationPhoto={setLocationPhoto}
          locationPhoto={locationPhoto}
        />
      </div>
    </>
  );
};

export default CreateRallyCreateSpotContainer;
