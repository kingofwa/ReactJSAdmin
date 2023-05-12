import React, { useState } from 'react';
import CustomButton from '@components/buttons/custom-button';
import PlayerGameTable from './PlayerGameTable';
import PlayerSeriesTable from './PlayerSeriesTable';
import './styles.scss';

const PlayerInformation = () => {
  const [isSeriesInfo, setIsSeriesInfo] = useState(true);

  return (
    <>
      <div className="user-card-info">
        <div className="user-card-info-title">参加中のグランドラリー・ラリー</div>
        <div className="user-card-info-body">
          <div className="user-card-actions">
            <CustomButton
              onClick={() => setIsSeriesInfo(true)}
              className={`${!isSeriesInfo && 'btn-no-select'}`}
            >
              グランドラリー情報
            </CustomButton>
            <CustomButton
              className={`${isSeriesInfo && 'btn-no-select'} ml-10`}
              onClick={() => setIsSeriesInfo(false)}
            >
              ラリー情報
            </CustomButton>
          </div>
          {isSeriesInfo ? <PlayerSeriesTable /> : <PlayerGameTable />}
        </div>
      </div>
    </>
  );
};

export default PlayerInformation;
