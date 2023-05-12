import API_PATHS from "@config/api-paths";
import appRequest from "@utils/app-request";

const getSlider = () => {
  return appRequest
    .get(API_PATHS.slider)
    .then(response => {
      const { data } = response?.data;
      return Promise.resolve(data);
    })
    .catch(error => Promise.reject(error.message));
};

export default getSlider;
