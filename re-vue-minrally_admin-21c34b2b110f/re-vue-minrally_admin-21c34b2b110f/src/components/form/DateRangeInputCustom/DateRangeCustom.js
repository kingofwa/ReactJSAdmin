import React from 'react';
import { assign } from 'lodash';
import PropTypes from 'prop-types';
import CustomDatePicker from '@components/form/CustomDatePicker';
import moment from 'moment-timezone';

import './styles.scss';

const DateRangeSeries = ({
  value,
  onChange,
  disabledDate,
  allowClear = true
}) => {
  const handleChange = newValue => {
    if (onChange) {
      onChange(assign({}, value, newValue));
    }
  };

  const handleDisabledDate = (startValue, endValue) => {
    if (startValue && !endValue) {
      return moment(startValue).tz('Asia/Tokyo').isBefore(disabledDate, 'day');
    }
    if (!startValue && endValue) {
      return moment(endValue).tz('Asia/Tokyo').isBefore(disabledDate, 'day');
    }
    return (
      startValue.isAfter(endValue, 'day') ||
      startValue.isBefore(disabledDate, 'day')
    );
  };

  return (
    <div className="date-range-series">
      <div className="date-range-series-row">
        <span>開始日</span>
        <CustomDatePicker
          disabledDate={date => handleDisabledDate(date, value.end_date)}
          value={
            value.start_date ? moment(value.start_date).tz('Asia/Tokyo') : null
          }
          onChange={date => handleChange({ start_date: date })}
          allowClear={allowClear}
          placeholder="年/月/日"
        />
      </div>

      <div className="date-range-series-row">
        <span>終了日</span>
        <CustomDatePicker
          disabledDate={date => handleDisabledDate(value.start_date, date)}
          value={
            value.end_date ? moment(value.end_date).tz('Asia/Tokyo') : null
          }
          onChange={date => handleChange({ end_date: date })}
          allowClear={allowClear}
          placeholder="年/月/日"
        />
      </div>
    </div>
  );
};

DateRangeSeries.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func
};

DateRangeSeries.defaultProps = {
  value: {
    start_date: null,
    end_date: null
  }
};

export default DateRangeSeries;
