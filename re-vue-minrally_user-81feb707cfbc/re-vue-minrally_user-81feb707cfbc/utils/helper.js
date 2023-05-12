import { map } from "lodash";
import moment from "moment-timezone";
import { DATE_DEFAULT } from "./date";

// eslint-disable-next-line import/prefer-default-export
export const currencyFormat = number => {
  return number?.toLocaleString("en-US");
};

// export const isInOneWeek = date => {
//   if (date) {
//     const toDay = new Date();
//     const lastUpdate = new Date(date);

//     const time = (toDay - lastUpdate) / (1000 * 60);
//     return time <= 10; // 10m
//   }
//   return false;
// };

export const isInOneWeek = date => {
  const today = new Date(moment().format(DATE_DEFAULT));
  const lastUpdate = moment(date, DATE_DEFAULT).add("days", 7);
  const lastUpdateNextWeek = new Date(lastUpdate);
  return lastUpdateNextWeek >= today;
};

// export const isInOneDay = date => {
//   if (date) {
//     const toDay = new Date();
//     const lastUpdate = new Date(date);
//     const time = (toDay - lastUpdate) / (24 * 3600 * 1000);
//     return time <= 1; // 1 day
//   }
//   return false;
// };

export const isCanCheckIn = date => {
  if (date) {
    const toDay = new Date(moment().format(DATE_DEFAULT));
    const lastUpdate = new Date(moment(date).format(DATE_DEFAULT));
    return toDay > lastUpdate;
  }
  return true;
};

// Dynamic input URL: add key _destroy in to item deleted
export const formatRelatedLinks = (preArr, arr) => {
  const idSelect = arr?.map(el => el?.id);

  // get list remove
  const arrRemovePre = preArr?.filter(el => !idSelect.includes(el?.id));

  // add key destroy in to element deleted
  const arrRemove = arrRemovePre?.map(el => {
    let dataRemove = { ...el };
    dataRemove = { ...dataRemove, _destroy: true };
    return dataRemove;
  });

  const arrSelect = map(arr, (el, index) => {
    return {
      ...el,
      order_number: index
    };
  });

  // add arr selected and list data remove
  return [...arrSelect, ...arrRemove];
};

export const numberWithCommas = x => {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

export const isNotExpired = (startDate, endDate) => {
  if (startDate && endDate) {
    const currentDate = moment().tz("Asia/Tokyo").format(DATE_DEFAULT);
    const startDateStr = moment(startDate)
      .tz("Asia/Tokyo")
      .format(DATE_DEFAULT);
    const endDateStr = moment(endDate).tz("Asia/Tokyo").format(DATE_DEFAULT);
    if (currentDate < startDateStr || currentDate > endDateStr) {
      return false;
    }
    return true;
  }
  return true;
};
