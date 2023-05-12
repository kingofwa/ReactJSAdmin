/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
import { isArray } from 'lodash';

// eslint-disable-next-line import/prefer-default-export
export const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

// get file from  url img
export const srcToFile = async urls => {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  if (isArray(urls)) {
    const arrImg = [];
    for (let i = 0; i < urls.length; i++) {
      await fetch(urls[i], {
        method: 'GET'
      })
        .then(async response => {
          const contentType = response.headers.get('content-type');
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
  return fetch(urls, {
    method: 'GET'
  })
    .then(response => {
      contentType = response.headers.get('content-type');
      return response.blob();
    })
    .then(blob => {
      const _file = new File([blob], 'fileName', { contentType });
      const file = { originFileObj: _file, url: urls };
      return file;
    })
    .catch(() => Promise.resolve());
};

export const dataURLtoFile = (dataurl, filename) => {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};
