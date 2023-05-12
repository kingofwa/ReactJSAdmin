import { STATUS_ENUM, QUESTION_TYPE, TEXT_BOX_TYPE } from '@config/constants';
import { get, head, isEmpty, map } from 'lodash';

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

  // add arr selected and list data remove
  return [...arr, ...arrRemove];
};

export const getRallyStatus = status => {
  switch (status) {
    case STATUS_ENUM.DRAFT:
      return '下書き';
    case STATUS_ENUM.PUBLISHED:
      return '公開中';
    case STATUS_ENUM.PRIVATE:
      return '非公開';
    default:
      return '-';
  }
};

export const getFormRewardData = values => {
  const reward = {
    expiry_date: values?.form_expiry_date,
    description: values?.form_description
  };

  const question_attributes = map(values?.question_attributes, question => {
    const type = question?.type || QUESTION_TYPE.TEXT_BOX;
    const questionInfo = {
      type
    };

    if (type === QUESTION_TYPE.TEXT_BOX) {
      questionInfo.limit_text =
        question?.limit_text || TEXT_BOX_TYPE.TEXT_INPUT;
    } else if (
      type === QUESTION_TYPE.CHECK_BOX ||
      type === QUESTION_TYPE.RADIO_BUTTON
    ) {
      const reward_image_template_attributes = map(
        question?.reward_image_template_attributes,
        item => {
          const itemData = {
            title: item?.title
          };
          if (item?.id) {
            itemData.id = item?.id;
          }
          if (!isEmpty(item?.photos)) {
            const image = head(item?.photos);
            console.log('image: ', image);
            itemData.image = get(image, 'originFileObj');
          }
          return itemData;
        }
      );
      questionInfo.reward_image_template_attributes =
        reward_image_template_attributes;
    }

    questionInfo.is_required = values?.is_required || false;
    return questionInfo;
  });

  reward.question_attributes = question_attributes;

  return reward;
};
