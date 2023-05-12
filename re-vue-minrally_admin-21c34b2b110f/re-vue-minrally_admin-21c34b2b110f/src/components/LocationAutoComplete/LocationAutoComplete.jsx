/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import usePlacesAutocomplete from 'use-places-autocomplete';
import React, { useEffect } from 'react';
import { get, toString } from 'lodash';
import { AutoComplete, Form } from 'antd';
import { ERROR_MESSAGES } from '@config/messages';
import './styles.scss';

const LocationAutoComplete = ({
  setLocationInfo = () => {},
  address = '',
  disabled,
  setLocationPhoto = () => {}
}) => {
  const {
    ready,
    value,
    suggestions: { data },

    setValue
  } = usePlacesAutocomplete({
    requestOptions: {
      // componentRestrictions: { country: ['JP', 'US', 'VN'] },
      region: 'JP'
    }
  });

  const placeCallBack = (place, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const locationLat = place?.geometry?.location?.lat();
      const locationLng = place?.geometry?.location?.lng();

      setLocationInfo({ lat: locationLat, lng: locationLng });

      const firstPhoto = get(place, 'photos[0]');
      const photo = firstPhoto?.getUrl();
      setLocationPhoto(photo);
    }
  };

  const getImage = id => {
    const placeService = new google.maps.places.PlacesService(
      document.createElement('div')
    );
    placeService.getDetails(
      {
        placeId: id
      },
      placeCallBack
    );
  };

  const onSelect = (textValue, option) => {
    setValue(textValue, false);
    getImage(option?.placeId);
  };

  const onSearch = searchText => {
    setValue(searchText);
  };

  const options = data.map(({ place_id, description }) => ({
    value: description,
    placeId: place_id
  }));

  useEffect(() => {
    setValue(toString(address), false);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="locationComplete">
        <Form.Item
          label=""
          name="address"
          rules={[{ required: true, message: ERROR_MESSAGES.empty }]}
        >
          <AutoComplete
            options={options}
            style={{
              width: '100%'
            }}
            onSelect={onSelect}
            onSearch={onSearch}
            disabled={!ready || disabled}
            defaultValue={value || ''}
            // placeholder="input here"
          />
        </Form.Item>
      </div>
    </>
  );
};

export default LocationAutoComplete;
