import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import Autocomplete from "react-google-autocomplete";

interface Props {
  onChangeLocation: (position: { lat: number; lng: number }) => void;
}
export default function MapContainer(props: Props) {
  const mapStyles = {
    height: "600px",
    width: "700px",
  };
  const apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY ?? "";
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const [CurrentLocation, setCurrentLocation] = useState({
    lat: 10.96854,
    lng: -74.78132,
  });

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

  if (!isLoaded) return null;
  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={18}
        center={CurrentLocation}
      ></GoogleMap>
      <Autocomplete
        apiKey={apiKey}
        onPlaceSelected={(place) => {
          console.log(place);
        }}
      />
      ;
    </div>
  );
}
