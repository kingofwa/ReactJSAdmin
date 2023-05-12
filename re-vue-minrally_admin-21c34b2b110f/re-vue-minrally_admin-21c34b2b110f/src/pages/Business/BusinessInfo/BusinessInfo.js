import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Spin, message } from 'antd';
import AdminBreadcrumb from '@components/AdminBreadcrumb';
import HeaderTitle from '@components/HeaderTitle';
import BusinessInfoForm from '@components/Business/BusinessInfoForm';
import ChangePassword from '@components/Business/ChangePassword';
import {
  getBusinessAccInfo,
  updateBusinessAccInfo,
  changeBusinessPassword
} from '@api/business';
import { pushMessage } from '@utils/main';
import { MESSAGES } from '@config/messages';
import { formatRelatedLinks } from '@utils/helper';
import { dataSerialization } from '@utils/form';
import { logout } from '@store/user';
import { PATHS } from '@config/paths';
import './styles.scss';

const BusinessInfoPage = ({ location }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [businessAvatar, setBusinessAvatar] = useState();
  const [preRelatedLinks, setPreRelatedLinks] = useState([]);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const history = useHistory();

  const onMatchedRoutes = () => {
    return [
      {
        route: {
          path: null,
          breadcrumbName: '事業者管理'
        }
      }
    ];
  };

  const fetchInfo = async () => {
    try {
      setLoading(true);
      const response = await getBusinessAccInfo();
      if (response?.profile_image_url) {
        setBusinessAvatar(response?.profile_image_url);
      }
      setPreRelatedLinks(response?.related_links);
      form.setFieldsValue({
        business_name: response?.business_name,
        department_name: response?.department_name,
        person_in_charge_name: response?.person_in_charge_name,
        email: response?.email,
        sex: response?.sex,
        year_of_birth: response?.year_of_birth,
        information: response?.information,
        // photos: photos?.originFileObj,
        related_links_attributes: response?.related_links,
        profession: response?.profession
      });
      // setData(response);
    } catch (error) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
    // eslint-disable-next-line
  }, []);

  const onChangePassword = async values => {
    try {
      setIsChangePassword(true);
      await changeBusinessPassword(values);
      pushMessage(MESSAGES.updateSuccess);
      history.push(PATHS.business.login);
      await logout();
    } catch (error) {
      message.error(error);
    } finally {
      setIsChangePassword(false);
    }
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
        related_links_attributes: formatRelatedLinks(
          preRelatedLinks,
          relatedLinksAttributes
        ),
        profession: values?.profession
      };
      if (values?.photos) {
        params.profile_image = values?.photos;
      }
      const payload = await dataSerialization(params);
      const response = await updateBusinessAccInfo(payload);
      if (response) {
        pushMessage(MESSAGES.updateSuccess);
      }
    } catch (error) {
      message.error(error);
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <HeaderTitle title="事業者情報" />
      <div className="main-container business-detail">
        <AdminBreadcrumb
          locationPath={location.pathname}
          onMatchedRoutes={onMatchedRoutes}
        />
        <div className="business-detail-content">
          <BusinessInfoForm
            form={form}
            onSubmit={onSubmit}
            businessAvatar={businessAvatar}
            isSubmit={isSubmit}
            isEdit
          />
        </div>
        <div className="business-detail-content">
          <ChangePassword
            onSubmit={onChangePassword}
            disabled={isChangePassword}
          />
        </div>
      </div>
    </Spin>
  );
};

export default BusinessInfoPage;
