import React, { useEffect, useState } from 'react';
import AdminBreadcrumb from '@components/AdminBreadcrumb';
import HeaderTitle from '@components/HeaderTitle';
import { PATHS } from '@config/paths';
import useQuery from '@utils/useQuery';
import { DATE_DEFAULT } from '@utils/date';
import moment from 'moment';
import { generateFormData } from '@utils/form';
import { message, Spin } from 'antd';
import { createRally } from '@api/event';
import { useHistory } from 'react-router-dom';
import { getBusinessDetail } from '@api/business';
import { pushMessage } from '@utils/main';
import { MESSAGES } from '@config/messages';
import RegisterRallyForm from '@components/Business/RegisterRallyForm';
import './styles.scss';

const EventRegistration = ({ location }) => {
  const query = useQuery();
  const businessId = query.get('id');
  const [isLoading, setIsLoading] = useState(false);
  const [businessData, setBusinessData] = useState();
  const [isDraft, setIsDraft] = useState(false);
  const history = useHistory();

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
          path: `${PATHS.businessDetail}?id=${businessId}`,
          breadcrumbName: businessData?.business_name
        }
      },
      {
        route: {
          path: null,
          breadcrumbName: 'ラリー登録'
        }
      },
      {
        route: {
          path: null,
          breadcrumbName: 'ラリー情報'
        }
      }
    ];
  };

  const onSubmit = async values => {
    try {
      setIsLoading(true);
      const youtubeVideos = values.youtube_video_list?.filter(item => !!item);
      const relatedLinksAttributes = values?.related_links_attributes?.filter(
        item => item.name && item.url
      );
      const params = {
        name: values?.name,
        description: values?.description,
        tags: values?.tags,
        youtube_videos: youtubeVideos,
        related_links_attributes: relatedLinksAttributes
      };

      if (values?.period) {
        const startDate = moment(values?.period?.start_date).format(
          DATE_DEFAULT
        );
        const endDate = moment(values?.period?.end_date).format(DATE_DEFAULT);
        params.start_date = startDate;
        params.end_date = endDate;
      }
      if (values.top_photo) {
        params.top_photo = values.top_photo;
      }
      const payload = await generateFormData(params);
      const response = await createRally(businessId, payload);
      const rallyId = response?.id;
      if (!isDraft) {
        const url = `${PATHS.eventRegistrationSpot}?id=${rallyId}`;
        history.push(url);
      } else {
        pushMessage(MESSAGES.saveDraft);
        const url = `${PATHS.businessDetail}?id=${businessId}`;
        history.push(url);
      }
    } catch (error) {
      message.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBusinessDetail = async () => {
    try {
      const response = await getBusinessDetail(businessId);
      setBusinessData(response);
    } catch (error) {
      message.error(error);
    }
  };

  useEffect(() => {
    if (businessId) {
      fetchBusinessDetail();
    }
    // eslint-disable-next-line
  }, [businessId]);

  return (
    <>
      <Spin spinning={isLoading} className="custom-spinner">
        <HeaderTitle title="ラリー登録" />
        <div className="main-container event-detail">
          <AdminBreadcrumb
            locationPath={location.pathname}
            onMatchedRoutes={onMatchedRoutes}
          />
          <div className="event-detail-content">
            <RegisterRallyForm onSubmit={onSubmit} setIsDraft={setIsDraft} />
          </div>
        </div>
      </Spin>
    </>
  );
};

export default EventRegistration;
