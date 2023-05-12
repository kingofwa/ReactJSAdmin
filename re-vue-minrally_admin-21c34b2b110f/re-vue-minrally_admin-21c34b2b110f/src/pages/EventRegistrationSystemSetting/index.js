import React, { useState, useEffect } from 'react';
import AdminBreadcrumb from '@components/AdminBreadcrumb';
import HeaderTitle from '@components/HeaderTitle';
import SystemSettingForm from './elements/SystemSettingForm';
import { PATHS } from '@config/paths';
import { getAllSeries, getEventDetail } from '@api/event';
import useQuery from '@utils/useQuery';
import { message, Spin } from 'antd';
import { map } from 'lodash';
import './styles.scss';

const EventRegistrationSystemSetting = ({ location }) => {
  const query = useQuery();
  const rallyId = query.get('rallyId');
  const [isLoading, setIsLoading] = useState(false);
  const [businessId, setBusinessId] = useState();
  const [eventDetail, setEventDetail] = useState();
  const [seriesOptions, setSeriesOptions] = useState([]);

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
          path: `${PATHS.businessDetail}?id=${eventDetail?.owner_info?.id}`,
          breadcrumbName: eventDetail?.owner_info?.business_name
        }
      },
      {
        route: {
          path: `${PATHS.eventRegistrationSpot}?id=${rallyId}`,
          breadcrumbName: eventDetail?.name
        }
      },
      {
        route: {
          path: null,
          breadcrumbName: 'システム設定'
        }
      }
    ];
  };

  const fetchSeries = async () => {
    try {
      setIsLoading(true);
      const response = await getAllSeries(businessId);
      const options = map(response, series => {
        return { value: series?.id, label: series?.name };
      });
      setSeriesOptions(options);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEventInfo = async () => {
    try {
      setIsLoading(true);
      const response = await getEventDetail(rallyId);
      setEventDetail(response);
      setBusinessId(response?.owner_info?.id);
    } catch (error) {
      message.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (businessId) {
      fetchSeries();
    }
    // eslint-disable-next-line
  }, [businessId]);

  useEffect(() => {
    if (rallyId) {
      fetchEventInfo();
    }
    // eslint-disable-next-line
  }, [rallyId]);

  return (
    <>
      <Spin spinning={isLoading} className="custom-spinner">
        <HeaderTitle title="ラリー登録" />
        <div className="main-container system-setting">
          <AdminBreadcrumb
            locationPath={location.pathname}
            onMatchedRoutes={onMatchedRoutes}
          />
          <div className="system-setting-content">
            <SystemSettingForm
              eventDetail={eventDetail}
              seriesOptions={seriesOptions}
              rallyId={rallyId}
              businessId={businessId}
            />
          </div>
        </div>
      </Spin>
    </>
  );
};

export default EventRegistrationSystemSetting;
