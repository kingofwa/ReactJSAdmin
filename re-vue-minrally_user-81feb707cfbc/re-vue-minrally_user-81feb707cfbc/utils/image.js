/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
import { message } from "antd";
import { isArray } from "lodash";
import { MESSAGE_DURATION } from "./constants";

// eslint-disable-next-line import/prefer-default-export
export const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (file && file.type.match("image.*")) {
      reader?.readAsDataURL(file);
    }
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

// get file from  url img
export const srcToFile = async urls => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  if (isArray(urls)) {
    const arrImg = [];
    for (let i = 0; i < urls.length; i++) {
      await fetch(urls[i], {
        method: "GET",
        headers
      })
        .then(async response => {
          const contentType = response.headers.get("content-type");
          const blob = await response.blob();
          const _file = new File([blob], `fileName-${i}`, { contentType });
          const file = { originFileObj: _file, url: urls[i] };
          arrImg.push(file);
        })
        .catch(() => Promise.resolve());
    }
    return arrImg;
  }
  let contentType;
  return fetch(urls)
    .then(response => {
      contentType = response.headers.get("content-type");
      return response.blob();
    })
    .then(blob => {
      const _file = new File([blob], "fileName", { contentType });
      const file = { originFileObj: _file, url: urls };
      return file;
    })
    .catch(() => Promise.resolve());
};

// Hook function which will be executed before uploading
export const beforeUpload = file => {
  const isValidType =
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "image/gif";
  if (!isValidType) {
    message.error(
      "画像フォーマットが正しくありません。 .png/.jpg/.gif 形式の画像を選択してください。"
    );
  }
  const isValidSize = file.size / 1024 / 1024 <= 20;
  if (!isValidSize) {
    message.error("20MBまでで画像を選択してください。");
  }
  return isValidType && isValidSize;
};

export const beforeUploadImage = file => {
  const isValidType =
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "image/gif";
  if (!isValidType) {
    message.error(
      "画像フォーマットが正しくありません。 .png/.jpg/.gif 形式の画像を選択してください。"
    );
  }
  const isValidSize = file.size / 1024 / 1024 <= 20;
  if (!isValidSize) {
    message.error({
      content: "20MBまで画像を選択してください。",
      duration: MESSAGE_DURATION
    });
  }
  return isValidType && isValidSize;
};
