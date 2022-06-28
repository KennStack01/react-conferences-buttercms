import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-shadow.png";
import LocationComponent from "./LocationComponent";
import CurrentLocation from "./CurrentLocation";

const MapContainerComponent = () => {
  const data = useStaticQuery(graphql`
    query {
      allButterCollection {
        edges {
          node {
            value {
              title
              location
              lat
              lng
              date(fromNow: true)
              conference_url
            }
          }
        }
      }
    }
  `);

  const conferences = data.allButterCollection.edges[0].node.value;
  console.log(conferences);

  if (typeof window !== "undefined") {
    return (
      <div>
        <MapContainer
          style={{ height: "800px", width: "100%" }}
          center={[conferences[0].lat, conferences[0].lng]}
          zoom={3}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {conferences.map((conference, index) => {
            return (
              <div key={index}>
                <LocationComponent conference={conference} />
              </div>
            );
          })}

          <CurrentLocation />
        </MapContainer>
      </div>
    );
  }
  return null;
};

export default MapContainerComponent;
