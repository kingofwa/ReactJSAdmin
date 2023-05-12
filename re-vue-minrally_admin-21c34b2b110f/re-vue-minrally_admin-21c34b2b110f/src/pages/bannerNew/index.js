import React, { useState } from 'react';
import AdminBreadcrumb from '@components/AdminBreadcrumb';
import HeaderTitle from '@components/HeaderTitle';
import BannerInfoForm from '@components/BannerInfoForm';
import { PATHS } from '@config/paths';
import { Form, message } from 'antd';
import { isEmpty } from 'lodash';
import { useHistory } from 'react-router-dom';
import { createBanner } from '@api/banners';
import { generateFormData } from '@utils/form';
import './styles.scss';
import { pushMessage } from '../../utils/main';
import { MESSAGES } from '../../config/messages';

const BannerNew = ({ location }) => {
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const history = useHistory();

  const onMatchedRoutes = () => {
    return [
      {
        route: {
          path: PATHS.bannerAdministration,
          breadcrumbName: 'バナー管理'
        }
      },
      {
        route: {
          path: null,
          breadcrumbName: 'バナー作成'
        }
      }
    ];
  };

  const onSubmit = async values => {
    try {
      setIsSubmit(true);
      const params = {
        name: values?.name,
        url: values?.url,
        status: values?.status
      };
      const hasPhotos =
        !isEmpty(values?.photos) && typeof values?.photos === 'object';
      if (hasPhotos) {
        params.image = values?.photos;
      }
      const payload = await generateFormData(params);
      await createBanner(payload);
      pushMessage(MESSAGES.createSuccess);
      history.push(PATHS.bannerAdministration);
    } catch (error) {
      message.error('作成できませんでした。');
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <>
      <HeaderTitle title="バナー作成" />
      <div className="main-container banner-detail">
        <AdminBreadcrumb
          locationPath={location.pathname}
          onMatchedRoutes={onMatchedRoutes}
        />
        <div className="banner-detail-content">
          <BannerInfoForm form={form} onSubmit={onSubmit} isSubmit={isSubmit} />
        </div>
      </div>
    </>
  );
};

export default BannerNew;
