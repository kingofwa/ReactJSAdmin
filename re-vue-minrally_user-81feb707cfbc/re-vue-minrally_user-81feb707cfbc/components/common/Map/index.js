/* eslint-disable import/no-unresolved */
import { DEFAULT_CENTER_MAP } from "@config/constants";
import {
  Circle,
  GoogleMap,
  Marker,
  useLoadScript
} from "@react-google-maps/api";
import usePosition from "hooks/usePosition";
import { head } from "lodash";
import styles from "./styles.module.scss";

const Map = ({ spots, coordinates, zoom = 20, range }) => {
  const { lat, lng } = usePosition();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["geometry"]
  });
  if (!isLoaded) return <div>Loading...</div>;

  const centerLocation = {
    lat:
      coordinates?.lat ||
      lat ||
      Number(head(spots)?.lat) ||
      DEFAULT_CENTER_MAP.lat,
    lng:
      coordinates?.lng ||
      lng ||
      Number(head(spots)?.lng) ||
      DEFAULT_CENTER_MAP.lng
  };

  return (
    <GoogleMap
      zoom={zoom}
      center={centerLocation}
      mapContainerClassName={styles.mapContainer}
    >
      {coordinates && (
        <>
          <Marker
            position={{
              lat: coordinates?.lat ?? DEFAULT_CENTER_MAP.lat,
              lng: coordinates?.lng ?? DEFAULT_CENTER_MAP.lng
            }}
          />
          {range && (
            <Circle
              center={{
                lat: coordinates?.lat ?? DEFAULT_CENTER_MAP.lat,
                lng: coordinates?.lng ?? DEFAULT_CENTER_MAP.lng
              }}
              radius={range}
              options={{
                strokeColor: "#0080ff",
                strokeOpacity: 1,
                strokeWeight: 2,
                fillColor: "#0080ff",
                fillOpacity: 0.1
              }}
            />
          )}
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
                    strokeColor: "#0080ff",
                    strokeOpacity: 1,
                    strokeWeight: 2,
                    fillColor: "#0080ff",
                    fillOpacity: 0.1
                  }}
                />
              )}
            </div>
          );
        })}
      {lat && lng && (
        <Marker
          position={{ lat, lng }}
          icon={{
            url: "/icons/bluecircle.png"
          }}
        />
      )}
    </GoogleMap>
  );
};

export default Map;
