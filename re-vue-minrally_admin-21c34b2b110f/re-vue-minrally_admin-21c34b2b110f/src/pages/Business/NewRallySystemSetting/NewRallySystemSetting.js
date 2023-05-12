import React, { useState, useEffect } from 'react';
import AdminBreadcrumb from '@components/AdminBreadcrumb';
import HeaderTitle from '@components/HeaderTitle';
import SystemSettingForm from '@components/Event/SystemSettingForm';
import { PATHS } from '@config/paths';
import { getEventDetail } from '@api/event';
import { getGrandRally } from '@api/business';
import useQuery from '@utils/useQuery';
import { message, Spin } from 'antd';
import { map } from 'lodash';
import './styles.scss';

const NewRallySystemSetting = ({ location }) => {
  const query = useQuery();
  const rallyId = query.get('rallyId');
  const [isLoading, setIsLoading] = useState(false);
  const [eventDetail, setEventDetail] = useState();
  const [seriesOptions, setSeriesOptions] = useState([]);

  const onMatchedRoutes = () => {
    return [
      {
        route: {
          path: PATHS.businessManagement,
          breadcrumbName: 'ラリー管理'
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
          breadcrumbName: 'システム設定'
        }
      }
    ];
  };

  const fetchSeries = async () => {
    try {
      setIsLoading(true);
      const response = await getGrandRally({});
      const options = map(response?.data, series => {
        return { value: series?.id, label: series?.name };
      });
      setSeriesOptions(options);
    } catch (error) {
      message.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEventInfo = async () => {
    try {
      setIsLoading(true);
      const response = await getEventDetail(rallyId);
      setEventDetail(response);
    } catch (error) {
      message.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (rallyId) {
      fetchEventInfo();
      fetchSeries();
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
              isBusiness
            />
          </div>
        </div>
      </Spin>
    </>
  );
};

export default NewRallySystemSetting;
