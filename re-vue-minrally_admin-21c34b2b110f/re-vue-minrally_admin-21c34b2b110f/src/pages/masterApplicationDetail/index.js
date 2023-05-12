import React, { useEffect, useState } from 'react';
import AdminBreadcrumb from '@components/AdminBreadcrumb';
import HeaderTitle from '@components/HeaderTitle';
import MasterInfoForm from './elements/MasterInfoForm';
import { PATHS } from '@config/paths';
import { Form, Spin } from 'antd';
import CustomButton from '@components/buttons/custom-button';
import useQuery from '@utils/useQuery';
import { getCreatorDetail } from '@api/creator';
import { DATE_NIHON } from '@utils/date';
import { get } from 'lodash';
import UnapprovedModal from '@components/Modals/UnapprovedModal';
import ApprovedModal from '@components/Modals/ApprovedModal';
import moment from 'moment-timezone';
import './styles.scss';

const MasterApplicationDetail = ({ location }) => {
  const [form] = Form.useForm();
  const [showModalUnapproved, setShowModalUnapproved] = useState(false);
  const [showModalApproved, setShowModalApproved] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const query = useQuery();
  const id = query.get('id');

  const fetchMasterDetail = async () => {
    try {
      setLoading(true);
      const response = await getCreatorDetail(id);
      setData(response);
      const referUrls = get(response, 'refer_urls', []);
      form.setFieldsValue({
        userName: response?.user_name,
        birthDate: moment(response?.birthday)
          .tz('Asia/Tokyo')
          .format(DATE_NIHON),
        gender: response?.sex === 'male' ? '男性' : '女性',
        prefectures: response?.prefecture,
        fullName: `${response?.first_name} ${response?.last_name}`,
        profession: response?.job,
        email: response?.email,
        collaborativeSNS: response?.collaborative_sns?.name,
        referenceURL: referUrls.map(item => ` ${item?.name}`),
        rallyContent: response?.introduction
      });
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMasterDetail();
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
          path: PATHS.masterApplicationList,
          breadcrumbName: 'ラリーマスター申請確認'
        }
      },
      {
        route: {
          path: null,
          breadcrumbName: data?.user_name
        }
      }
    ];
  };

  return (
    <>
      <HeaderTitle title={data?.user_name} />
      <div className="main-container master-detail">
        <AdminBreadcrumb
          locationPath={location.pathname}
          onMatchedRoutes={onMatchedRoutes}
        />
        <div className="master-detail-content">
          <Spin spinning={loading} className="custom-spinner">
            <MasterInfoForm form={form} />
            <div className="master-detail-actions">
              <CustomButton
                onClick={() => {
                  setShowModalUnapproved(true);
                }}
              >
                却下する
              </CustomButton>
              <CustomButton
                onClick={() => {
                  setShowModalApproved(true);
                }}
              >
                承認する
              </CustomButton>
            </div>
            <UnapprovedModal
              visible={showModalUnapproved}
              onVisible={() => {
                setShowModalUnapproved(false);
              }}
              id={id}
            />
            <ApprovedModal
              visible={showModalApproved}
              onVisible={() => {
                setShowModalApproved(false);
              }}
              id={id}
            />
          </Spin>
        </div>
      </div>
    </>
  );
};

export default MasterApplicationDetail;
