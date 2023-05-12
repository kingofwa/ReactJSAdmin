import { split } from "lodash";

// eslint-disable-next-line import/prefer-default-export
export const convertHtmlLineBreak = string => {
  return split(string, /\n/).map((item, index) => {
    // eslint-disable-next-line react/no-array-index-key
    return index === 0 ? item : [<br key={index} />, item];
  });
};
