/* eslint-disable no-useless-escape */

// eslint-disable-next-line import/prefer-default-export
export const getIdYouTuBe = (url) => {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  if (!url) return null
  const match = url.match(regExp)
  if (match && match[2].length === 11) {
    return match[2]
  }

  return null
}