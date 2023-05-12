import React, { useEffect, useState } from 'react';
import AdminBreadcrumb from '@components/AdminBreadcrumb';
import HeaderTitle from '@components/HeaderTitle';
import NotificationForm from '@components/NotificationForm';
import { PATHS } from '@config/paths';
import { Form, message, Spin } from 'antd';
import useQuery from '@utils/useQuery';
import { getNotificationDetail, updateNotification } from '@api/notification';
import { useHistory } from 'react-router-dom';
import { pushMessage } from '@utils/main';
import { MESSAGES } from '@config/messages';
import './styles.scss';

const NotificationDetail = ({ location }) => {
  const [form] = Form.useForm();
  const query = useQuery();
  const id = query.get('id');
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const history = useHistory();

  const onMatchedRoutes = () => {
    return [
      {
        route: {
          path: PATHS.notificationManagement,
          breadcrumbName: 'お知らせ管理'
        }
      },
      {
        route: {
          path: null,
          breadcrumbName: 'お知らせ詳細'
        }
      }
    ];
  };

  const getKind = kind => {
    switch (kind) {
      case 'system':
        return 'システム';
      case 'campaign':
        return 'キャンペーン';
      case 'other':
        return 'その他';
      default:
        return '-';
    }
  };

  const fetchNotificationDetail = async () => {
    try {
      setLoading(true);
      const response = await getNotificationDetail(id);
      const info = {
        kind: getKind(response?.kind),
        title: response?.title,
        content: response?.content,
        status: response?.status
      };
      setData(info);
      form.setFieldsValue(info);
    } catch (error) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async values => {
    try {
      setIsSubmit(true);
      const params = {
        status: values?.status
      };
      await updateNotification(id, params);
      pushMessage(MESSAGES.updateSuccess);
      history.push(PATHS.notificationManagement);
    } catch (error) {
      message.error(error);
    } finally {
      setIsSubmit(false);
    }
  };

  useEffect(() => {
    fetchNotificationDetail();
    // eslint-disable-next-line
  }, [id]);

  return (
    <>
      <Spin spinning={loading} className="custom-spinner">
        <HeaderTitle title="お知らせ詳細" />
        <div className="main-container">
          <AdminBreadcrumb
            locationPath={location.pathname}
            onMatchedRoutes={onMatchedRoutes}
          />
          <div>
            <NotificationForm
              form={form}
              onSubmit={onSubmit}
              isEdit
              data={data}
              isSubmit={isSubmit}
            />
          </div>
        </div>
      </Spin>
    </>
  );
};

export default NotificationDetail;
