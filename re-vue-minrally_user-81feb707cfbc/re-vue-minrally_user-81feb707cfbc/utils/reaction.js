/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import _ from "lodash";

/** Change In Client Used When Infinite Scroll */

// Remove Item liked in list liked - unlike
export const removeItemById = (array, id) => {
  if (Array.isArray(array))
    _.remove(array, ele => {
      return ele?.id === id;
    });
  return array;
};

/**  update status reaction (like, follow, ...) */
export const updateReaction = (array, id, reactionKey, numberKey) => {
  if (Array.isArray(array) && id && reactionKey) {
    const index = _.findIndex(array, ["id", id]);
    let _item = array[index];
    let _numberKey;

    if (_item[reactionKey]) {
      _numberKey = _item[numberKey] - 1;
    } else {
      _numberKey = _item[numberKey] + 1;
    }
    _item = {
      ..._item,
      [reactionKey]: !_item[reactionKey],
      [numberKey]: _numberKey
    };
    _.fill(array, _item, index, index + 1);

    return array;
  }
};
