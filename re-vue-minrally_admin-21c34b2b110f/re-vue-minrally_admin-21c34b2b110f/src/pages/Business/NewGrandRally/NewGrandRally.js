import React, { useState } from 'react';
import { Form, message } from 'antd';
import AdminBreadcrumb from '@components/AdminBreadcrumb';
import HeaderTitle from '@components/HeaderTitle';
import SeriesInfoForm from '@components/Series/SeriesInfoForm';
import { DEFAULT_TEMPLATE_CERTIFICATE } from '@config/constants';
import { PATHS } from '@config/paths';
import { MESSAGES } from '@config/messages';
import { dataSerialization } from '@utils/form';
import { pushMessage } from '@utils/main';
import { DATE_DEFAULT } from '@utils/date';
import { transformData } from '@components/form/CouponFormInput/transformData';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { createGrandRally } from '@api/business';
import useQuery from '@utils/useQuery';
import { useHistory } from 'react-router-dom';
import './styles.scss';

const NewGrandRally = ({ location }) => {
  const [form] = Form.useForm();
  const [certificate, setCertificate] = useState(DEFAULT_TEMPLATE_CERTIFICATE);
  const [isSubmit, setIsSubmit] = useState(false);
  const query = useQuery();
  const history = useHistory();
  const redirectTo = query.get('redirectTo');

  const onMatchedRoutes = () => {
    return [
      {
        route: {
          path: PATHS.business.grandRallyManagement,
          breadcrumbName: 'グランドラリー管理'
        }
      },
      {
        route: {
          path: null,
          breadcrumbName: 'グランドラリー登録'
        }
      }
    ];
  };

  const onSubmit = async values => {
    try {
      setIsSubmit(true);
      const data = form.getFieldValue();
      const params = {
        name: data?.name,
        description: data?.description,
        tags: data?.tag_list,
        reward_attributes: { reward_template_id: values?.reward_template_id },
        certificate_image_template_attributes: certificate
      };
      if (data?.games_ids) {
        params.games_ids = data?.games_ids;
      }
      const hasPhotos =
        !isEmpty(values?.photos) && typeof values?.photos === 'object';
      if (hasPhotos) {
        params.top_photo = values?.photos;
      }
      const couponData = await transformData(data);
      if (couponData) {
        params.coupon_reward_template_attributes = couponData;
      }

      const startDate = moment(values?.period?.start_date).format(DATE_DEFAULT);
      const endDate = moment(values?.period?.end_date).format(DATE_DEFAULT);

      if (values?.period) {
        params.start_date = startDate;
        params.end_date = endDate;
      }

      const payload = await dataSerialization(params);
      await createGrandRally(payload);
      pushMessage(MESSAGES.createSuccess);
      if (redirectTo) {
        history.push(redirectTo);
      } else {
        history.push(PATHS.business.grandRallyManagement);
      }
    } catch (error) {
      message.error(error);
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <>
      <HeaderTitle title="グランドラリー管理" />
      <div className="main-container business-detail">
        <AdminBreadcrumb
          locationPath={location.pathname}
          onMatchedRoutes={onMatchedRoutes}
        />
        <div className="business-detail-content">
          <SeriesInfoForm
            form={form}
            onSubmit={onSubmit}
            certificate={certificate}
            setCertificate={setCertificate}
            isSubmit={isSubmit}
            isCreate
            isBusiness
          />
        </div>
      </div>
    </>
  );
};

export default NewGrandRally;
