/* eslint-disable import/no-unresolved */
import { DEFAULT_CENTER_MAP } from '@config/constants';
import {
  Circle,
  GoogleMap,
  Marker,
  useLoadScript
} from '@react-google-maps/api';
import { head } from 'lodash';
import React from 'react';
import './styles.scss';

const Map = ({ spots, coordinates, zoom = 20 }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
    libraries: ['geometry']
  });
  if (!isLoaded) return <div>Loading...</div>;

  const centerLocation = {
    lat: coordinates?.lat || Number(head(spots)?.lat) || DEFAULT_CENTER_MAP.lat,
    lng: coordinates?.lng || Number(head(spots)?.lng) || DEFAULT_CENTER_MAP.lng
  };

  return (
    <GoogleMap
      zoom={zoom}
      center={centerLocation}
      mapContainerClassName="mapContainer"
    >
      {coordinates && (
        <>
          <Marker
            position={{
              lat: coordinates?.lat ?? DEFAULT_CENTER_MAP.lat,
              lng: coordinates?.lng ?? DEFAULT_CENTER_MAP.lng
            }}
          />
        </>
      )}

      {spots &&
        spots?.map((spot, index) => {
          const idx = `${index + 1}`;

          return (
            <div key={Math.random()}>
              <Marker
                // position={{ lat: +spot?.lat, lng: +spot?.lng }}
                position={{ lat: Number(spot?.lat), lng: Number(spot?.lng) }}
                label={idx}
              />
              {spot?.range && (
                <Circle
                  // center={{ lat: +spot?.lat, lng: +spot?.lng }}
                  center={{ lat: Number(spot?.lat), lng: Number(spot?.lng) }}
                  radius={spot?.range}
                  options={{
                    strokeColor: '#0080ff',
                    strokeOpacity: 1,
                    strokeWeight: 2,
                    fillColor: '#0080ff',
                    fillOpacity: 0.1
                  }}
                />
              )}
            </div>
          );
        })}
    </GoogleMap>
  );
};

export default Map;
