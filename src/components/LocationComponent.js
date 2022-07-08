import React, { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet/dist/images/marker-shadow.png";
import icon from "./constants";

const LocationComponent = ({ conference }) => {
  const [position, setPosition] = useState(null);
  const [bbox, setBbox] = useState([]);

  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      const radius = e.accuracy;
      const circle = L.circle(e.latlng, radius);
      circle.addTo(map);
      setBbox(e.bounds.toBBoxString().split(","));
    });
  }, [map]);

  const LOCATION = {
    lat: conference.lat,
    lng: conference.lng,
  };
  return (
    <Marker position={[LOCATION.lat, LOCATION.lng]} icon={icon}>
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
