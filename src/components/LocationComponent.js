import React from "react";
import { Icon } from "leaflet";
import { Popup, Marker } from "react-leaflet";
import marker from "../../assets/images/location.svg";

// Init custom map icon
// if (typeof window !== 'undefined') {

// }
const myIcon =
  typeof window !== "undefined"
    ? new Icon({
        iconUrl: marker,
        iconSize: [48, 48],
      })
    : null;

const LocationComponent = ({ conference }) => {
  const LOCATION = {
    lat: conference.lat,
    lng: conference.lng,
  };
  return (
    <Marker position={[LOCATION.lat, LOCATION.lng]} icon={myIcon}>
      <Popup>
        <h1>{conference.title}</h1> <br />
        <h5>{conference.location}</h5>
        <h6> {conference.date} </h6> <br />
        <a href={conference.conference_url} target="_blank" rel="noreferrer">
          Discover
        </a>
      </Popup>
    </Marker>
  );
};

export default LocationComponent;
