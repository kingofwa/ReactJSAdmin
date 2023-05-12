import React from 'react';
import CustomButton from '@components/buttons/custom-button';
import { PATHS } from '@config/paths';
import { useHistory } from 'react-router-dom';
import './styles.scss';

const HeaderTitle = ({
  title,
  isBusiness = false,
  isUser = false,
  isBanner = false,
  isNotification = false
}) => {
  const history = useHistory();
  return (
    <>
      <div className="header-title">
        <span className="header-title-text">{title}</span>
        {isBusiness && (
          <CustomButton
            type="primary"
            size="large"
            className="btn-outLine header-title-btn"
            onClick={() => history.push(PATHS.businessNew)}
          >
            事業者登録
          </CustomButton>
        )}

        {isUser && (
          <CustomButton
            type="primary"
            size="large"
            className="btn-outLine header-title-btn"
            onClick={() => history.push(PATHS.masterApplicationList)}
          >
            ラリーマスター申請確認
          </CustomButton>
        )}

        {isBanner && (
          <CustomButton
            type="primary"
            size="large"
            className="btn-outLine header-title-btn"
            onClick={() => history.push(PATHS.bannerNew)}
          >
            バナー作成
          </CustomButton>
        )}
        {isNotification && (
          <CustomButton
            type="primary"
            size="large"
            className="btn-outLine header-title-btn"
            onClick={() => history.push(PATHS.notificationRegistration)}
          >
            お知らせ登録
          </CustomButton>
        )}
      </div>
    </>
  );
};

export default HeaderTitle;
