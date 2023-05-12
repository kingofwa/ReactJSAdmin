import React from 'react';
import { assign } from 'lodash';
import CustomDatePicker from './CustomDatePicker';
import PropTypes from 'prop-types';
import './styles.scss';

const DateRange = ({ value, onChange, allowClear = true }) => {
  const handleChange = newValue => {
    if (onChange) {
      onChange(assign({}, value, newValue));
    }
  };

  const disabledDate = (startValue, endValue) => {
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.isAfter(endValue, 'day');
  };

  return (
    <div className="date-range">
      <CustomDatePicker
        disabledDate={date => disabledDate(date, value.endDate)}
        value={value.startDate}
        onChange={date => handleChange({ startDate: date })}
        allowClear={allowClear}
        placeholder="開始"
      />
      <span className="date-range__separator">〜</span>
      <CustomDatePicker
        disabledDate={date => disabledDate(value.startDate, date)}
        value={value.endDate}
        onChange={date => handleChange({ endDate: date })}
        allowClear={allowClear}
        placeholder="終了"
      />
    </div>
  );
};

DateRange.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func
};

DateRange.defaultProps = {
  value: {
    startDate: null,
    endDate: null
  }
};

export default DateRange;
