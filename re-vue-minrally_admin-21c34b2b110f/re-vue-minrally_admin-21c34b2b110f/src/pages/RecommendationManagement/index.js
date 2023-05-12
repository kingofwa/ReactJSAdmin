import React, { useState } from 'react';
import AdminBreadcrumb from '@components/AdminBreadcrumb';
import HeaderTitle from '@components/HeaderTitle';
import CustomButton from '@components/buttons/custom-button';
import RallyGrand from './RallyGrand';
import Rally from './Rally';
import './styles.scss';

const RecommendationManagement = ({ location }) => {
  const [isGrand, setIsGrand] = useState(false);

  const onMatchedRoutes = () => {
    return [
      {
        route: {
          path: null,
          breadcrumbName: 'おすすめ管理'
        }
      }
    ];
  };

  return (
    <>
      <HeaderTitle title="おすすめ管理" />
      <div className="main-container">
        <AdminBreadcrumb
          locationPath={location.pathname}
          onMatchedRoutes={onMatchedRoutes}
        />
        <div>
          <div className="recommendation-management-detail-actions">
            <CustomButton
              onClick={() => setIsGrand(false)}
              className={`${isGrand && 'btn-no-select'}`}
            >
              おすすめラリー
            </CustomButton>
            <CustomButton
              className={`${!isGrand && 'btn-no-select'} ml-10`}
              onClick={() => setIsGrand(true)}
            >
              おすすめグランドラリー
            </CustomButton>
          </div>
          {isGrand ? <RallyGrand /> : <Rally />}
        </div>
      </div>
    </>
  );
};

export default RecommendationManagement;
