/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from "use-places-autocomplete";
import { useEffect } from "react";
import { get, toString } from "lodash";
import { AutoComplete, Form } from "antd";
import { ERROR_MESSAGES } from "@config/messages";
import styles from "./styles.module.scss";

const LocationAutoComplete = ({
  setLocationInfo = () => {},
  address,
  disabled,
  setLocationPhoto = () => {},
  setIsErr = () => {},
  isErr
}) => {
  const {
    ready,
    value,
    suggestions: { data },
    setValue
  } = usePlacesAutocomplete({
    requestOptions: {
      // componentRestrictions: { country: ["JP", "US", "VN"] },
      language: "ja",
      region: "JP"
    }
  });

  const getCoordinates = async location => {
    const parameter = {
      address: location
    };
    const results = await getGeocode(parameter);
    const { lat, lng } = getLatLng(results[0]);
    setLocationInfo({ address: location, coordinates: { lat, lng } });
  };

  const placeCallBack = (place, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const firstPhoto = get(place, "photos[0]");
      const photo = firstPhoto?.getUrl();
      setLocationPhoto(photo);
    }
  };

  const getImage = id => {
    const placeService = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    placeService.getDetails(
      {
        placeId: id
      },
      placeCallBack
    );
  };

  const onSelect = (textValue, option) => {
    getCoordinates(textValue);
    setValue(textValue, false);
    getImage(option?.placeId);
  };

  const onSearch = searchText => {
    setValue(searchText);
    setIsErr(false);
  };

  const options = data.map(({ place_id, description }) => ({
    value: description,
    placeId: place_id
  }));

  useEffect(() => {
    setValue(toString(address), false);
  }, []);

  return (
    <>
      <div className={styles.locationComplete}>
        <Form.Item
          label=""
          name="address"
          rules={[{ required: true, message: ERROR_MESSAGES.empty }]}
        >
          <AutoComplete
            options={options}
            style={{
              width: "100%"
            }}
            onSelect={onSelect}
            onSearch={onSearch}
            disabled={!ready || disabled}
            defaultValue={value || ""}
            // placeholder="input here"
          />
        </Form.Item>
        {isErr && (
          <span className={styles.errMess}>{ERROR_MESSAGES.empty}</span>
        )}
      </div>
    </>
  );
};

export default LocationAutoComplete;
