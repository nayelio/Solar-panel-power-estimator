import { Button, Input } from "@mui/material";
import {
  DrawingManager,
  GoogleMap,
  Libraries,
  MarkerF,
  useJsApiLoader,
  Data,
  DrawingManagerF,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import InputSearchPlace from "../InputSearchPlace";

interface Props {
  onChangeLocation: (position: { lat: number; lng: number }) => void;
}

const libraries: Libraries = ["places", "maps", "drawing"];

export default function MapContainer(props: Props) {
  const mapStyles = {
    height: "600px",
    width: "700px",
  };
  const apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY ?? "";
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries,
  });

  const [currentLocation, setCurrentLocation] = useState({
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

  const { ref } = usePlacesWidget({
    apiKey,
    onPlaceSelected: (place) => console.log(place),
  });

  const [polygon, setPolygon] = useState<google.maps.Polygon[]>([]);

  if (!isLoaded) return null;
  return (
    <div>
      <InputSearchPlace
        onSelectPlace={(e) => {
          props.onChangeLocation(e);
          setCurrentLocation({
            lat: e.lat,
            lng: e.lng,
          });
        }}
      />
      {polygon.length ? (
        <button
          onClick={() => {
            polygon.forEach((e) => e.getPath().clear());

            setPolygon([]);
          }}
        >
          Borrar
        </button>
      ) : null}
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={21}
        center={currentLocation}
      >
        <MarkerF position={currentLocation} />
        <DrawingManagerF
          drawingMode={google.maps.drawing.OverlayType.POLYGON}
          options={{
            drawingControl: true,
            drawingControlOptions: {
              position: google.maps.ControlPosition.TOP_CENTER,
              drawingModes: [google.maps.drawing.OverlayType.POLYGON],
            },
            circleOptions: {
              fillColor: `#ffff00`,
              fillOpacity: 1,
              strokeWeight: 5,
              clickable: false,
              editable: true,
              zIndex: 1,
            },
          }}
          onPolygonComplete={(e) => {
            setPolygon((prev) => [...prev, e]);
            console.log(
              "area",
              google.maps.geometry.spherical.computeArea(e.getPath())
            );
            console.log(
              "perimetro",
              google.maps.geometry.spherical.computeLength(e.getPath())
            );
          }}
        />
      </GoogleMap>
    </div>
  );
}
