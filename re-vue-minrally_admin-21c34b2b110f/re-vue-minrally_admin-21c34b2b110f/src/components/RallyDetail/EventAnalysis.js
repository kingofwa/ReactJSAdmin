import React, { useState, useEffect } from 'react';
import { Col, Divider, message } from 'antd';
import CustomButton from '@components/buttons/custom-button';
import { DateInput } from '@components/form';
import SummaryTable from './SummaryTable';
import MonthTable from './MonthTable';
import PrefectureTable from './PrefectureTable';
import DailyTable from './DailyTable';
import useQuery from '@utils/useQuery';
import { getEventAnalysis } from '@api/event';
import { ANALYSIS, FORMATTER } from '@config/constants';
import moment from 'moment';
import './styles.scss';

const EventAnalysis = ({ isBusiness }) => {
  const query = useQuery();
  const id = query.get('id');
  const [analysisAll, setAnalysisAll] = useState(true);
  const [loading, setLoading] = useState(false);
  const [summaryData, setSummaryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [prefectureData, setPrefectureData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const defaultMonth = moment().format(FORMATTER.monthFormat);
  const [monthSelect, setMonthSelect] = useState(moment());

  const fetchAllAnalysis = async () => {
    try {
      setLoading(true);
      const [summary, monthly, prefecture] = await Promise.all([
        getEventAnalysis(id, { by: ANALYSIS.SUMMARY }),
        getEventAnalysis(id, { by: ANALYSIS.MONTHLY }),
        getEventAnalysis(id, { by: ANALYSIS.PREFECTURE })
      ]);
      setSummaryData(summary);
      setMonthlyData(monthly);
      setPrefectureData(prefecture);
    } catch (error) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalysisByMonth = async (month = defaultMonth) => {
    try {
      setLoading(true);
      if (month) {
        const [summary, prefecture, daily] = await Promise.all([
          getEventAnalysis(id, { by: ANALYSIS.SUMMARY, month }),
          getEventAnalysis(id, { by: ANALYSIS.PREFECTURE, month }),
          getEventAnalysis(id, { by: ANALYSIS.DAILY, month, per: 31 })
        ]);
        setSummaryData(summary);
        setPrefectureData(prefecture);
        setDailyData(daily);
      } else {
        const [summary, prefecture, daily] = await Promise.all([
          getEventAnalysis(id, { by: ANALYSIS.SUMMARY }),
          getEventAnalysis(id, { by: ANALYSIS.PREFECTURE }),
          getEventAnalysis(id, { by: ANALYSIS.DAILY, per: 31 })
        ]);
        setSummaryData(summary);
        setPrefectureData(prefecture);
        setDailyData(daily);
      }
    } catch (error) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onChangeDate = value => {
    setMonthSelect(value);
  };

  const onFilterMonth = () => {
    const filterMonth = moment(monthSelect).format(FORMATTER.monthFormat);
    if (monthSelect) {
      fetchAnalysisByMonth(filterMonth);
    } else {
      fetchAnalysisByMonth(null);
    }
  };

  useEffect(() => {
    if (id) {
      if (analysisAll) {
        fetchAllAnalysis();
      } else {
        fetchAnalysisByMonth();
      }
    }
    // eslint-disable-next-line
  }, [id, analysisAll]);

  const renderAnalysisAll = () => {
    return (
      <div className="event-detail-row">
        <Col span={14}>
          <SummaryTable
            data={summaryData}
            loading={loading}
            isBusiness={isBusiness}
          />
          <MonthTable
            data={monthlyData}
            loading={loading}
            isAnalysisAll
            isBusiness={isBusiness}
          />
        </Col>
        <Col className="prefecture-col">
          <PrefectureTable
            data={prefectureData}
            loading={loading}
            isAnalysisAll
            isBusiness={isBusiness}
          />
        </Col>
      </div>
    );
  };

  const renderAnalysisDaily = () => {
    return (
      <div className="event-detail-row">
        <Col span={14}>
          <SummaryTable
            loading={loading}
            data={summaryData}
            isDaily
            isBusiness={isBusiness}
          />
          <PrefectureTable
            loading={loading}
            data={prefectureData}
            isBusiness={isBusiness}
          />
        </Col>
        <Col className="prefecture-col">
          <DailyTable
            loading={loading}
            data={dailyData}
            isBusiness={isBusiness}
          />
        </Col>
      </div>
    );
  };

  return (
    <>
      <div className="event-detail">
        <div className="event-detail-title mt-30">ラリー分析</div>
        <div className="event-detail-body">
          <div className="row">
            <CustomButton
              onClick={() => setAnalysisAll(true)}
              className={`${!analysisAll && 'btn-no-select'}`}
            >
              全体
            </CustomButton>
            <CustomButton
              className={`${analysisAll && 'btn-no-select'} ml-10`}
              onClick={() => setAnalysisAll(false)}
            >
              月別
            </CustomButton>
            {!analysisAll && (
              <div className="row select-date">
                <span className="select-date-text">年月</span>
                <DateInput
                  inputProps={{
                    format: FORMATTER.monthFormatJP,
                    value: monthSelect,
                    onChange: onChangeDate,
                    picker: 'month',
                    placeholder: 'YYYY年MM月'
                  }}
                  noMargin
                />
                <CustomButton className="ml-10" onClick={onFilterMonth}>
                  設定
                </CustomButton>
              </div>
            )}
          </div>
          <Divider />
          {analysisAll ? renderAnalysisAll() : renderAnalysisDaily()}
        </div>
      </div>
    </>
  );
};

export default EventAnalysis;
