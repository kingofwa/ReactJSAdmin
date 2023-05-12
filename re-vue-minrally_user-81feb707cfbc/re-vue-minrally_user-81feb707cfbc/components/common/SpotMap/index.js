/* eslint-disable import/no-unresolved */
import { DEFAULT_CENTER_MAP } from "@config/constants";
import {
  Circle,
  GoogleMap,
  Marker,
  useLoadScript,
  InfoWindow
} from "@react-google-maps/api";
import usePosition from "hooks/usePosition";
import { head, size } from "lodash";
import Link from "next/link";
import { useState } from "react";
import styles from "./styles.module.scss";

const SpotMap = ({ spots, zoom = 20 }) => {
  const [activeMarker, setActiveMarker] = useState("");
  const { lat, lng } = usePosition();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["geometry"]
  });
  if (!isLoaded) return <div>Loading...</div>;

  const centerLocation = {
    lat: lat || Number(head(spots)?.lat) || DEFAULT_CENTER_MAP.lat,
    lng: lng || Number(head(spots)?.lng) || DEFAULT_CENTER_MAP.lng
  };

  const handleActiveMarker = marker => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return (
    <GoogleMap
      zoom={zoom}
      center={centerLocation}
      mapContainerClassName={styles.mapContainer}
    >
      {size(spots) > 0 &&
        spots?.map((spot, index) => {
          const idx = `${index + 1}`;
          return (
            <div key={spot?.id}>
              <Marker
                position={{ lat: Number(spot?.lat), lng: Number(spot?.lng) }}
                label={idx}
                onClick={() => handleActiveMarker(spot?.id)}
              >
                {activeMarker === spot?.id ? (
                  <InfoWindow onCloseClick={() => setActiveMarker("")}>
                    <div>
                      <Link
                        href={`https://www.google.com/maps/search/?api=1&query=${spot?.lat},${spot?.lng}`}
                      >
                        <a target="_blank" className={styles.address}>
                          {spot?.name}
                        </a>
                      </Link>
                    </div>
                  </InfoWindow>
                ) : null}
              </Marker>
              {spot?.range && (
                <Circle
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

export default SpotMap;
