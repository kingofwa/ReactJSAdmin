import React from "react";
import { assign } from "lodash";
import moment from "moment-timezone";
import { Col, Row } from "antd";
import CustomDatePicker from "./CustomDatePicker";
import styles from "./styles.module.scss";

const DateRangeCustom = ({
  value = {
    start_date: null,
    end_date: null
  },
  onChange,
  allowClear = true
}) => {
  const handleChange = newValue => {
    if (onChange) {
      onChange(assign({}, value, newValue));
    }
  };

  const disabledDate = (startValue, endValue) => {
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.isAfter(endValue, "day");
  };

  return (
    <div className={styles.formItemDefault}>
      <Row gutter={20} align="middle" className={styles.row}>
        <Col className={styles.labelDate}>開始日</Col>
        <Col>
          <CustomDatePicker
            disabledDate={date => disabledDate(date, value.end_date)}
            value={
              value.start_date
                ? moment(value.start_date).tz("Asia/Tokyo")
                : null
            }
            onChange={date => handleChange({ start_date: date })}
            allowClear={allowClear}
            placeholder="年/月/日"
          />
        </Col>
      </Row>

      <Row gutter={20} align="middle">
        <Col className={styles.labelDate}>終了日</Col>
        <Col>
          <CustomDatePicker
            disabledDate={date => disabledDate(value.start_date, date)}
            value={
              value.end_date ? moment(value.end_date).tz("Asia/Tokyo") : null
            }
            onChange={date => handleChange({ end_date: date })}
            allowClear={allowClear}
            placeholder="年/月/日"
          />
        </Col>
      </Row>
    </div>
  );
};

export default DateRangeCustom;
