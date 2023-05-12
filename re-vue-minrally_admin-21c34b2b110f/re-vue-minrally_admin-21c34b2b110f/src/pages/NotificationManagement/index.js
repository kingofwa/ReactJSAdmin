import React, { useEffect, useState } from 'react';
import AdminBreadcrumb from '@components/AdminBreadcrumb';
import HeaderTitle from '@components/HeaderTitle';
import NotificationTable from './elements/NotificationTable';
import { NUM_PER_PAGE } from '@config/constants';
import { Spin, message } from 'antd';
import { getNotification, deleteNotification } from '@api/notification';
import { pushMessage } from '@utils/main';
import { MESSAGES } from '@config/messages';
import './styles.scss';

const NotificationManagement = ({ location }) => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    page: 1,
    pageSize: NUM_PER_PAGE
  });

  const fetchNotification = async (page = 1) => {
    try {
      setLoading(true);
      const newParams = { page, per: NUM_PER_PAGE };
      const response = await getNotification(newParams);
      setNotification(response?.data);
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
    fetchNotification(newPage);
  };

  const onDeleteNotification = async id => {
    try {
      await deleteNotification(id);
      fetchNotification(pagination?.current);
      pushMessage(MESSAGES.deleteSuccess);
    } catch (error) {
      message.error(error);
    }
  };

  useEffect(() => {
    fetchNotification();
    // eslint-disable-next-line
  }, []);

  const onMatchedRoutes = () => {
    return [
      {
        route: {
          path: null,
          breadcrumbName: 'お知らせ管理'
        }
      }
    ];
  };

  return (
    <>
      <HeaderTitle title="お知らせ管理" isNotification />
      <div className="main-container notification-management-list">
        <AdminBreadcrumb
          locationPath={location.pathname}
          onMatchedRoutes={onMatchedRoutes}
        />
        <div className="notification-management-list-content">
          <Spin spinning={loading} className="custom-spinner">
            {notification && (
              <NotificationTable
                data={notification}
                onPageChange={onPageChange}
                pagination={pagination}
                fetchCreator={fetchNotification}
                onDeleteNotification={onDeleteNotification}
              />
            )}
          </Spin>
        </div>
      </div>
    </>
  );
};

export default NotificationManagement;
