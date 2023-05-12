/* eslint-disable import/no-unresolved */
import API_PATHS from "@config/api-paths";
import appRequest from "@utils/app-request";

// eslint-disable-next-line import/prefer-default-export
export const getListCoupon = params => {
  return appRequest
    .get(API_PATHS.couponRewards, { params })
    .then(response => {
      const { meta } = response.data;
      const { data } = response.data;
      return Promise.resolve({ data, meta });
      // return Promise.resolve(fakeData);
    })
    .catch(error => Promise.reject(error.message));
};

export const getCouponDetail = id => {
  const url = API_PATHS.couponDetail.replace(/:id/, id);
  return appRequest
    .get(url)
    .then(response => {
      return Promise.resolve(response.data?.data);
    })
    .catch(error => Promise.reject(error?.message));
};

export const applyCoupon = id => {
  const url = API_PATHS.applyCoupon.replace(/:id/, id);
  return appRequest
    .put(url)
    .then(response => {
      return Promise.resolve(response?.data?.data);
    })
    .catch(error => Promise.reject(error?.message));
};
