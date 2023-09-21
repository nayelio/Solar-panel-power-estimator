require("dotenv").config();

import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

interface Props {
  onChangeLocation: (position: { lat: number; lng: number }) => void;
}
export default function MapContainer(props: Props) {
  const mapStyles = {
    height: "600px",
    width: "700px",
  };

  const [CurrentLocation, setCurrentLocation] = useState({
    lat: 10.96854,
    lng: -74.78132,
  });
  const apiKey = process.env.MAP_API_KEY;
  console.log(apiKey);
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Actualiza el estado con la ubicación actual
          setCurrentLocation({ lat: latitude, lng: longitude });
          props.onChangeLocation({ lat: latitude, lng: longitude });
        },
        function (error) {
          console.error("Error al obtener la ubicación: " + error.message);
        }
      );
    } else {
      console.error("La geolocalización no es compatible en este navegador.");
    }
  }, []);

  return (
    <div>
      <LoadScript googleMapsApiKey="AIzaSyBS4pSnVBQUgW25s4Nya5RLmssC3Ej5btk">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={18}
          center={CurrentLocation}
        ></GoogleMap>
      </LoadScript>
    </div>
  );
}
