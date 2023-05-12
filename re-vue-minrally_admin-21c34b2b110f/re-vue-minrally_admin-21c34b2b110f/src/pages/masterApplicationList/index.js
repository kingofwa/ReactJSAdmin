import React, { useEffect, useState } from 'react';
import AdminBreadcrumb from '@components/AdminBreadcrumb';
import HeaderTitle from '@components/HeaderTitle';
import MasterTab from './elements/MasterTab';
import { PATHS } from '@config/paths';
import { getCreator } from '@api/creator';
import { NUM_PER_PAGE } from '@config/constants';
import { Spin } from 'antd';
import './styles.scss';

const MasterApplicationList = ({ location }) => {
  const [loading, setLoading] = useState(false);
  const [creator, setCreator] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    page: 1,
    pageSize: NUM_PER_PAGE
  });

  const fetchCreator = async (page = 1) => {
    try {
      setLoading(true);
      const newParams = { status: 'submitted', page, per: NUM_PER_PAGE };
      const response = await getCreator(newParams);
      setCreator(response?.data);
      setPagination({
        ...pagination,
        total: response?.meta?.count,
        current: response?.meta?.page
      });
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };

  const onPageChange = newPage => {
    fetchCreator(newPage);
  };

  useEffect(() => {
    fetchCreator();
    // eslint-disable-next-line
  }, []);

  const onMatchedRoutes = () => {
    return [
      {
        route: {
          path: PATHS.userManagement,
          breadcrumbName: 'ユーザー管理'
        }
      },
      {
        route: {
          path: null,
          breadcrumbName: 'ラリーマスター申請確認'
        }
      }
    ];
  };

  return (
    <>
      <HeaderTitle title="ラリーマスター申請確認" />
      <div className="main-container master-application-list">
        <AdminBreadcrumb
          locationPath={location.pathname}
          onMatchedRoutes={onMatchedRoutes}
        />
        <div className="master-application-list-content">
          <Spin spinning={loading} className="custom-spinner">
            {creator && (
              <MasterTab
                data={creator}
                onPageChange={onPageChange}
                pagination={pagination}
                fetchCreator={fetchCreator}
              />
            )}
          </Spin>
        </div>
      </div>
    </>
  );
};

export default MasterApplicationList;
