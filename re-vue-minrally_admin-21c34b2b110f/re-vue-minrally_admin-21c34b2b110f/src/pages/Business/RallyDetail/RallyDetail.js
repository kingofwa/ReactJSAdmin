import React, { useState, useEffect } from 'react';
import AdminBreadcrumb from '@components/AdminBreadcrumb';
import HeaderTitle from '@components/HeaderTitle';
import { PATHS } from '@config/paths';
import useQuery from '@utils/useQuery';
import {
  getEventDetail,
  updateEvent,
  saveEventFinnish,
  saveEventFinnishDraft
} from '@api/event';
import { Form, message, Spin } from 'antd';
import moment from 'moment-timezone';
import { DATE_DEFAULT } from '@utils/date';
import { every, get, map, size } from 'lodash';
import { generateFormData } from '@utils/form';
import {
  DEFAULT_TEMPLATE_CERTIFICATE,
  EVENT_STATUS,
  SPOT_STATUS
} from '@config/constants';
import { formatRelatedLinks } from '@utils/helper';
import { pushMessage } from '@utils/main';
import { MESSAGES } from '@config/messages';
import { PHOTO } from '@config/constants';
import { transformData } from '@components/form/CouponFormInput/transformData';
import EventForm from '@components/RallyDetail/EventForm';
import SpotManagementTable from '@components/RallyDetail/SpotManagementTable';
import EventAnalysis from '@components/RallyDetail/EventAnalysis';
import { PeriodSetingEnum, STATUS_ENUM } from '@config/constants';
import { getRallyStatus } from '@utils/helper';
import { getGrandRally } from '@api/business';

import './styles.scss';

const RallyDetail = ({ location }) => {
  moment.tz.setDefault('Asia/Tokyo');
  const [form] = Form.useForm();
  const query = useQuery();
  const eventId = query.get('id');
  const [loading, setLoading] = useState(false);
  const [eventDetail, setEventDetail] = useState();
  const [preRelatedLinks, setPreRelatedLinks] = useState([]);
  const [certificate, setCertificate] = useState(DEFAULT_TEMPLATE_CERTIFICATE);
  const [topPhoto, setTopPhoto] = useState();
  const [googlePhoto, setGooglePhoto] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [seriesOptions, setSeriesOptions] = useState([]);
  const [isDraft, setIsDraft] = useState(false);
  const [couponInfo, setCouponInfo] = useState();
  const isPublished = eventDetail?.status === EVENT_STATUS.PUBLISHED;
  const isAllSpotRegistered =
    every(eventDetail?.spots, ['status', SPOT_STATUS.registrations]) &&
    size(eventDetail?.spots) > 2;
  const [spotsData, setSpotsData] = useState([]);
  const title = `${get(eventDetail, ['owner_info', 'business_name'])}-${
    eventDetail?.name
  }`;

  const onMatchedRoutes = () => {
    return [
      {
        route: {
          path: PATHS.business.rallyManagement,
          breadcrumbName: 'ラリー管理'
        }
      },
      {
        route: {
          path: null,
          breadcrumbName: eventDetail?.name
        }
      }
    ];
  };

  const fetchEventDetail = async () => {
    try {
      setLoading(true);
      const response = await getEventDetail(eventId);
      const businessId = get(response, 'owner_info.id');
      fetchSeries(businessId);

      if (response?.top_photo_url) {
        setTopPhoto({ name: 'topPhoto', url: response?.top_photo_url });
      }
      if (response?.google_image_url) {
        setGooglePhoto({
          name: 'googlePhoto',
          url: response?.google_image_url
        });
      }

      const eventInfo = {
        name: response?.name,
        description: response?.description,
        registration_date: moment(response?.registration_date).format(
          DATE_DEFAULT
        ),
        serie_name: response?.serie_name,
        tag_list: response?.tag_list,
        reward: response?.reward,
        spots: response?.spots,
        related_links_attributes: response?.related_links,
        youtube_video_list: response?.youtube_video_list,
        note: response?.note,
        status: getRallyStatus(response?.status)
      };
      setCertificate(response?.certificate_image_template);
      eventInfo.certificateSetting = 'yes';

      if (response?.start_date && response?.end_date) {
        const startDate = moment(response?.start_date);
        const endDate = moment(response?.end_date);
        eventInfo.period = {
          start_date: startDate,
          end_date: endDate
        };
        eventInfo.periodSetting = PeriodSetingEnum.LIMITED;
      } else {
        eventInfo.periodSetting = PeriodSetingEnum.UNLIMITED;
      }
      if (response?.serie_id) {
        eventInfo.serie_id = response?.serie_id;
      }
      setSpotsData(response?.spots);
      form.setFieldsValue(eventInfo);
      setPreRelatedLinks(response?.related_links || []);
      setEventDetail(response);
      setCouponInfo(response?.coupon_reward_template);
    } catch (error) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async values => {
    try {
      setIsSubmit(true);
      const youtubeVideos = values.youtube_video_list?.filter(item => !!item);
      const relatedLinksAttributes = values?.related_links_attributes?.filter(
        item => item.name && item.url
      );

      const params = {
        name: values?.name,
        description: values?.description,
        note: values?.note || '',
        tags: values?.tag_list || [],
        youtube_videos: youtubeVideos || [],
        related_links_attributes: formatRelatedLinks(
          preRelatedLinks,
          relatedLinksAttributes
        )
      };
      const startDate = moment(values?.period?.start_date).format(DATE_DEFAULT);
      const endDate = moment(values?.period?.end_date).format(DATE_DEFAULT);
      params.start_date = values?.period ? startDate : '';
      params.end_date = values?.period ? endDate : '';
      if (values?.certificateSetting === 'yes') {
        params.certificate_image_template_attributes = certificate;
      } else {
        params.certificate_image_template_attributes = null;
      }
      if (values?.serie_id) {
        params.serie_id = values?.serie_id;
      }
      if (values.photos) {
        if (values.photos === PHOTO.delete) {
          params.top_photo = null;
        } else {
          params.top_photo = values.photos;
        }
      }
      const couponData = await transformData(values);
      if (couponData) {
        params.coupon_reward_template_attributes = couponData;
      } else if (couponInfo?.id) {
        params.coupon_reward_template_attributes = {
          id: couponInfo?.id,
          _destroy: true
        };
      }
      const payload = await generateFormData(params, [
        'coupon_reward_template_attributes'
      ]);
      if (isPublished) {
        await updateEvent(eventId, payload);
        pushMessage(MESSAGES.updateSuccess);
      } else {
        if (isDraft) {
          await saveEventFinnishDraft(eventId, payload);
          pushMessage(MESSAGES.saveDraft);
        } else {
          await saveEventFinnish(eventId, payload);
          pushMessage(MESSAGES.updateSuccess);
        }
      }
      // history.push(
      //   `${PATHS.businessDetail}?id=${get(eventDetail, ['owner_info', 'id'])}`
      // );
    } catch (error) {
      message.error(error);
    } finally {
      setIsSubmit(false);
    }
  };

  const fetchSeries = async () => {
    try {
      const response = await getGrandRally({});
      const grandRally = response?.data;
      const options = map(grandRally, series => {
        return { value: series?.id, label: series?.name };
      });
      setSeriesOptions(options);
    } catch (error) {
      message.error(error);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchEventDetail();
    }
    // eslint-disable-next-line
  }, [eventId]);

  return (
    <>
      <HeaderTitle title={title} />
      <div className="main-container event-detail">
        <AdminBreadcrumb
          locationPath={location.pathname}
          onMatchedRoutes={onMatchedRoutes}
        />
        <div className="event-detail-content">
          <Spin spinning={loading} className="custom-spinner">
            <EventForm
              form={form}
              onSubmit={onSubmit}
              eventData={eventDetail}
              certificate={certificate}
              setCertificate={setCertificate}
              topPhoto={topPhoto}
              googlePhoto={googlePhoto}
              isSubmit={isSubmit}
              seriesOptions={seriesOptions}
              setIsDraft={setIsDraft}
              isDisableSubmit={!isAllSpotRegistered}
              isBusiness
            />
            <SpotManagementTable
              spotsData={spotsData}
              rallyId={eventId}
              setSpotsData={setSpotsData}
              hasPlayer={eventDetail?.number_of_players > 0}
              isPublished={eventDetail?.status === STATUS_ENUM.PUBLISHED}
              isBusiness
            />
            <EventAnalysis isBusiness />
          </Spin>
        </div>
      </div>
    </>
  );
};

export default RallyDetail;
