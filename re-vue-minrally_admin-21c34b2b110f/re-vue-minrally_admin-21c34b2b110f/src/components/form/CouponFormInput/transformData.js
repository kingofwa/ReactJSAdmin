import moment from 'moment';
import { isEmpty } from 'lodash';
import { FORMATTER } from '@config/constants';

export const transformData = (data) => {
  if (data.hasCoupon !== 'yes') {
    return null;
  }
  const expiration_date = moment(data?.expiration_date).format(
    FORMATTER.date
  );
  const coupon_reward_template_attributes = {
    id: data?.couponId,
    name: data?.coupon_reward_template_attributes_name,
    description: data?.coupon_reward_template_attributes_description,
    limit_number_of_issues_per_user: '',
    limit_number_of_times_of_use_per_sheet: '',
    expiration_date: expiration_date
  };
  if (data?.issuesPerUser !== 0) {
    coupon_reward_template_attributes.limit_number_of_issues_per_user =
      data?.issue_per_user;
  }
  if (data?.issuesPerSheet !== 0) {
    coupon_reward_template_attributes.limit_number_of_times_of_use_per_sheet =
      data?.issue_per_sheet;
  }
  const hasImage =
    !isEmpty(data?.coupon_reward_template_attributes_photos) &&
    typeof data?.coupon_reward_template_attributes_photos === 'object';
  if (hasImage) {
    coupon_reward_template_attributes.image =
      data?.coupon_reward_template_attributes_photos;
  }

  return coupon_reward_template_attributes;
};
