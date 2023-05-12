import React, { useEffect, useState } from 'react';
import { Col, Divider, message } from 'antd';
import CustomButton from '@components/buttons/custom-button';
import { DateInput } from '@components/form';
import SummaryTable from './SummaryTable';
import MonthTable from './MonthTable';
import EventTable from './EventTable';
import PrefectureTable from './PrefectureTable';
import DailyTable from './DailyTable';
import { getSeriesAnalysis } from '@api/series';
import useQuery from '@utils/useQuery';
import { ANALYSIS, FORMATTER } from '@config/constants';
import moment from 'moment';
import './styles.scss';

const SeriesAnalysis = ({ isBusiness }) => {
  const [analysisAll, setAnalysisAll] = useState(true);
  const query = useQuery();
  const id = query.get('id');
  const [loading, setLoading] = useState(false);
  const [summaryData, setSummaryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [prefectureData, setPrefectureData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const defaultMonth = moment().format(FORMATTER.monthFormat);
  const [monthSelect, setMonthSelect] = useState(moment());

  const fetchAllAnalysis = async () => {
    try {
      setLoading(true);
      const [summary, monthly, event, prefecture] = await Promise.all([
        getSeriesAnalysis(id, { by: ANALYSIS.SUMMARY }),
        getSeriesAnalysis(id, { by: ANALYSIS.MONTHLY }),
        getSeriesAnalysis(id, { by: ANALYSIS.EVENT }),
        getSeriesAnalysis(id, { by: ANALYSIS.PREFECTURE })
      ]);
      setSummaryData(summary);
      setMonthlyData(monthly);
      setEventData(event);
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
      const [summary, event, prefecture, daily] = await Promise.all([
        getSeriesAnalysis(id, { by: ANALYSIS.SUMMARY, month }),
        getSeriesAnalysis(id, { by: ANALYSIS.EVENT, month }),
        getSeriesAnalysis(id, { by: ANALYSIS.PREFECTURE, month }),
        getSeriesAnalysis(id, { by: ANALYSIS.DAILY, month })
      ]);
      setSummaryData(summary);
      setEventData(event);
      setPrefectureData(prefecture);
      setDailyData(daily);
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
    fetchAnalysisByMonth(filterMonth);
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
      <div className="series-detail-row">
        <Col span={14}>
          <SummaryTable
            data={summaryData}
            loading={loading}
            isAnalysisAll
            isBusiness={isBusiness}
          />
          <MonthTable
            data={monthlyData}
            loading={loading}
            isBusiness={isBusiness}
          />
          <EventTable
            data={eventData}
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
      <div className="series-detail-row">
        <Col span={14}>
          <SummaryTable
            data={summaryData}
            loading={loading}
            isBusiness={isBusiness}
          />
          <EventTable
            data={eventData}
            loading={loading}
            isBusiness={isBusiness}
          />
          <PrefectureTable
            data={prefectureData}
            loading={loading}
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
    <div className="series-detail">
      <div className="series-detail-title mt-30">グランドラリー分析</div>
      <div className="series-detail-body">
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
                  picker: 'month'
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
  );
};

export default SeriesAnalysis;
