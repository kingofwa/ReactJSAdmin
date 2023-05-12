import React, { useState } from 'react';
import { PATHS } from '@config/paths';
import AdminBreadcrumb from '@components/AdminBreadcrumb';
import HeaderTitle from '@components/HeaderTitle';
import BusinessInfoForm from '@components/Business/BusinessInfoForm';
import { Form } from 'antd';
import { createBusinessInfo } from '@api/business';
import { generateFormData } from '@utils/form';
import { isEmpty } from 'lodash';
import { useHistory } from 'react-router-dom';
import { formatRelatedLinks } from '@utils/helper';
import { pushMessage } from '@utils/main';
import { MESSAGE_TYPE } from '@config/constants';
import { MESSAGES } from '@config/messages';
import './styles.scss';
import { sendPassword } from '../../api/business';

const BusinessNew = ({ location }) => {
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);
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
          path: null,
          breadcrumbName: '事業者登録'
        }
      }
    ];
  };

  const onSubmit = async values => {
    try {
      setIsSubmit(true);
      const relatedLinksAttributes = values?.related_links_attributes?.filter(
        item => item.name && item.url
      );

      const params = {
        business_name: values?.business_name,
        department_name: values?.department_name,
        person_in_charge_name: values?.person_in_charge_name,
        email: values?.email,
        information: values?.information,
        sex: values?.sex,
        year_of_birth: values?.year_of_birth,
        profession: values?.profession,
        related_links_attributes: formatRelatedLinks([], relatedLinksAttributes)
      };
      const hasPhotos =
        !isEmpty(values?.photos) && typeof values?.photos === 'object';
      if (hasPhotos) {
        params.profile_image = values?.photos;
      }
      const payload = await generateFormData(params);
      const response = await createBusinessInfo(payload);
      if (response?.id) {
        await sendPassword(response?.id);
      }
      pushMessage(MESSAGES.createSuccess);
      history.push(PATHS.businessManagement);
    } catch (error) {
      pushMessage(error, MESSAGE_TYPE.ERROR);
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <>
      <HeaderTitle title="事業者登録" />
      <div className="main-container business-detail">
        <AdminBreadcrumb
          locationPath={location.pathname}
          onMatchedRoutes={onMatchedRoutes}
        />
        <div className="business-detail-content">
          <BusinessInfoForm
            form={form}
            onSubmit={onSubmit}
            isSubmit={isSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default BusinessNew;
