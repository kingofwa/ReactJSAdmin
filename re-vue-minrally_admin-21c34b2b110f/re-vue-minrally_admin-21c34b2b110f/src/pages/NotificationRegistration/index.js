import React, { useState } from 'react';
import AdminBreadcrumb from '@components/AdminBreadcrumb';
import HeaderTitle from '@components/HeaderTitle';
import NotificationForm from '@components/NotificationForm';
import { PATHS } from '@config/paths';
import { Form } from 'antd';
import { useHistory } from 'react-router-dom';
import { createNotification } from '@api/notification';
import { pushMessage } from '@utils/main';
import { MESSAGES } from '@config/messages';
import { MESSAGE_TYPE } from '@config/constants';
import './styles.scss';

const NotificationRegistration = ({ location }) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [isSubmit, setIsSubmit] = useState(false);

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
          breadcrumbName: 'お知らせ登録'
        }
      }
    ];
  };

  const onSubmit = async values => {
    try {
      setIsSubmit(true);
      const params = {
        kind: values?.kind,
        title: values?.title,
        content: values?.content,
        status: values?.status
      };
      await createNotification(params);
      pushMessage(MESSAGES.createSuccess);
      history.push(PATHS.notificationManagement);
    } catch (error) {
      pushMessage(error, MESSAGE_TYPE.ERROR);
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <>
      <HeaderTitle title="お知らせ登録" />
      <div className="main-container">
        <AdminBreadcrumb
          locationPath={location.pathname}
          onMatchedRoutes={onMatchedRoutes}
        />
        <div>
          <NotificationForm
            form={form}
            onSubmit={onSubmit}
            isSubmit={isSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default NotificationRegistration;
