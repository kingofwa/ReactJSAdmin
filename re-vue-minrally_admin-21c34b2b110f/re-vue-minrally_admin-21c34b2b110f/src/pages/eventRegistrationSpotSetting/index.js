import React, { useEffect, useState } from 'react';
import AdminBreadcrumb from '@components/AdminBreadcrumb';
import HeaderTitle from '@components/HeaderTitle';
import SpotSettingForm from '@components/Event/SpotSettingForm';
import { PATHS } from '@config/paths';
import useQuery from '@utils/useQuery';
import {
  getRallyDetailSpot,
  updateSpot,
  createSpot,
  createSpotDraft,
  updateSpotDraft,
  getEventDetail
} from '@api/event';
import { Form, message, Spin } from 'antd';
import { isEmpty, pick } from 'lodash';
import { useHistory } from 'react-router-dom';
import { formatRelatedLinks } from '@utils/helper';
import { EVENT_STATUS } from '@config/constants';
import { pushMessage } from '@utils/main';
import { MESSAGES } from '@config/messages';
import { transformData } from '@components/form/CouponFormInput/transformData';
import { dataSerialization } from '@utils/form';
import './styles.scss';

const EventRegistrationSpotSetting = ({ location }) => {
  const query = useQuery();
  const rallyId = query.get('rallyId');
  const spotId = query.get('id');
  const [spotDetail, setSpotDetail] = useState({});
  const [couponInfo, setCouponInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [preRelatedLinks, setPreRelatedLinks] = useState([]);
  const [locationInfo, setLocationInfo] = useState();
  const [locationPhoto, setLocationPhoto] = useState();
  const history = useHistory();
  const isEdit = !!spotId;
  const [isDraft, setIsDraft] = useState();
  const redirectTo = query.get('redirectTo');
  const isPublished = spotDetail?.game?.status === EVENT_STATUS.PUBLISHED;
  const hasPlayer = spotDetail?.game?.number_of_players > 0;
  const [eventDetail, setEventDetail] = useState({});
  const [form] = Form.useForm();

  const onMatchedRoutes = () => {
    return [
      {
        route: {
          path: PATHS.businessManagement,
          breadcrumbName: '事業者管理'
        }
      },
      {
        route: {
          path: `${PATHS.businessDetail}?id=${
            spotDetail?.operator?.id || eventDetail?.owner_info?.id
          }`,
          breadcrumbName:
            spotDetail?.operator?.name || eventDetail?.owner_info?.business_name
        }
      },
      {
        route: {
          path: `${PATHS.eventDetail}?id=${rallyId}`,
          breadcrumbName: spotDetail?.game?.name || eventDetail?.name
        }
      },
      {
        route: {
          path: null,
          breadcrumbName: isEdit ? spotDetail?.name : 'スポット設定'
        }
      }
    ];
  };

  const onSubmit = async values => {
    try {
      const data = form.getFieldValue();
      setIsLoading(true);
      const relatedLinksAttributes = values?.related_links_attributes?.filter(
        item => item.name && item.url
      );
      const params = pick(values, [
        'name',
        'address',
        'range',
        'allow_type_of_checkin'
      ]);
      params.related_links_attributes = formatRelatedLinks(
        preRelatedLinks,
        relatedLinksAttributes
      );
      params.lat = locationInfo?.lat;
      params.lng = locationInfo?.lng;
      if (!isEmpty(values?.photos)) {
        params.photos = values?.photos;
      } else {
        params.photos = 'null';
      }

      if (locationPhoto) {
        params.google_image_url = locationPhoto;
      }
      params.description = values?.description || '';
      const couponData = await transformData(data);
      if (couponData) {
        params.coupon_reward_template_attributes = couponData;
      } else {
        if (couponInfo) {
          params.coupon_reward_template_attributes = {
            id: couponInfo?.id,
            _destroy: true
          };
        }
      }
      const payload = dataSerialization(params);

      if (isEdit) {
        if (!isDraft) {
          await updateSpot(rallyId, spotId, payload);
          pushMessage(MESSAGES.updateSuccess);
        } else {
          await updateSpotDraft(rallyId, spotId, payload);
          pushMessage(MESSAGES.saveDraft);
        }
      } else {
        if (!isDraft) {
          await createSpot(rallyId, payload);
          pushMessage(MESSAGES.createSuccess);
        } else {
          await createSpotDraft(rallyId, payload);
          pushMessage(MESSAGES.saveDraft);
        }
      }
      if (redirectTo) {
        history.push(redirectTo);
      } else {
        const url = `${PATHS.eventRegistrationSpot}?id=${rallyId}`;
        history.push(url);
      }
    } catch (error) {
      //
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSpotDetail = async () => {
    try {
      setIsLoading(true);
      const response = await getRallyDetailSpot(rallyId, spotId);
      setSpotDetail(response);
      setPreRelatedLinks(response?.related_links);
      setLocationInfo({
        lat: Number(response?.lat),
        lng: Number(response?.lng)
      });
      setCouponInfo(response?.coupon_reward_template);
    } catch (error) {
      message.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEventDetail = async () => {
    try {
      const response = await getEventDetail(rallyId);
      setEventDetail(response);
    } catch (error) {
      message.error(error);
    }
  };

  useEffect(() => {
    if (rallyId) {
      fetchEventDetail();
    }
    // eslint-disable-next-line
  }, [rallyId]);

  useEffect(() => {
    if (rallyId && spotId) {
      getSpotDetail();
    }
    // eslint-disable-next-line
  }, [spotId, rallyId]);

  return (
    <>
      <Spin spinning={isLoading} className="custom-spinner">
        <HeaderTitle title="ラリー登録" />
        <div className="main-container spot-setting">
          <AdminBreadcrumb
            locationPath={location.pathname}
            onMatchedRoutes={onMatchedRoutes}
          />
          <div className="spot-setting-content">
            <SpotSettingForm
              spotData={spotDetail}
              preRelatedLinks={preRelatedLinks}
              onSubmit={onSubmit}
              setLocationInfo={setLocationInfo}
              locationInfo={locationInfo}
              rallyId={rallyId}
              spotId={spotId}
              setLocationPhoto={setLocationPhoto}
              isEdit={isEdit}
              setIsDraft={setIsDraft}
              isPublished={isPublished}
              hasPlayer={hasPlayer}
              locationPhoto={locationPhoto}
              eventDetail={eventDetail}
              form={form}
            />
          </div>
        </div>
      </Spin>
    </>
  );
};

export default EventRegistrationSpotSetting;
