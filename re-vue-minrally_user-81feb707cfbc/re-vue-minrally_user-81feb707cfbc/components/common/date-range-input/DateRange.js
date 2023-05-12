import React from "react";
import { assign } from "lodash";
import { Col, Row } from "antd";
// import { ERROR_MESSAGES } from "@config/messages";
import moment from "moment-timezone";
import CustomDatePicker from "./CustomDatePicker";
import styles from "./styles.module.scss";

const DateRange = ({
  value = {
    start_date: null,
    end_date: null
  },
  disabledDate,
  onChange = () => {},
  allowClear = true
}) => {
  const handleChange = newValue => {
    if (onChange) {
      onChange(assign({}, value, newValue));
    }
  };

  const handleDisabledDate = (startValue, endValue) => {
    if (startValue && !endValue) {
      return moment(startValue).tz("Asia/Tokyo").isBefore(disabledDate, "day");
    }
    if (!startValue && endValue) {
      return moment(endValue).tz("Asia/Tokyo").isBefore(disabledDate, "day");
    }

    return (
      startValue.isAfter(endValue, "day") ||
      startValue.isBefore(disabledDate, "day")
    );
  };

  return (
    <div className={styles.dateRange}>
      <Row gutter={20} align="middle">
        <Col className={styles.labelDate}>開始日</Col>
        <Col>
          <CustomDatePicker
            disabledDate={date => handleDisabledDate(date, value.end_date)}
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
      <Row gutter={20} align="middle" className={styles.mb30}>
        <Col className={styles.labelDate}>終了日</Col>
        <Col>
          <CustomDatePicker
            disabledDate={date => handleDisabledDate(value.start_date, date)}
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

export default DateRange;
