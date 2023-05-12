import React, { useState } from 'react';
import AdminBreadcrumb from '@components/AdminBreadcrumb';
import HeaderTitle from '@components/HeaderTitle';
import { PATHS } from '@config/paths';
import { DATE_DEFAULT } from '@utils/date';
import moment from 'moment';
import { dataSerialization } from '@utils/form';
import { message, Spin } from 'antd';
import { useHistory } from 'react-router-dom';
import { pushMessage } from '@utils/main';
import { MESSAGES } from '@config/messages';
import RegisterRallyForm from '@components/Business/RegisterRallyForm';
import { createBusinessRally } from '@api/business';
import './styles.scss';

const NewRally = ({ location }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const history = useHistory();

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
          breadcrumbName: 'ラリー登録'
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
      const payload = await dataSerialization(params);
      const response = await createBusinessRally(payload);
      const rallyId = response?.id;
      if (!isDraft) {
        const url = `${PATHS.business.newRallySpotList}?id=${rallyId}`;
        history.push(url);
      } else {
        pushMessage(MESSAGES.saveDraft);
        const url = `${PATHS.business.rallyManagement}`;
        history.push(url);
      }
    } catch (error) {
      message.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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

export default NewRally;
