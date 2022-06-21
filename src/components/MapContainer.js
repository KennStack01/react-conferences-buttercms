import React from "react";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-shadow.png";
import { Icon } from "leaflet";
import marker from "../../assets/images/location.svg";

const myIcon = new Icon({
  iconUrl: marker,
  iconSize: [48, 48],
});

const MapContainerComponent = () => {
  const position = [40.741895, -73.989308];

  if (typeof window !== "undefined") {
    return (
      <MapContainer
        // className="leaflet-container"
        style={{ height: "800px", width: "100%" }}
        center={position}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={myIcon}>
          <Popup>
            A pretty CSS3 popup text details ebele awa tpyer. <br /> Easily
            customizable.
          </Popup>
        </Marker>
      </MapContainer>
    );
  }
  return null;
};

export default MapContainerComponent;
