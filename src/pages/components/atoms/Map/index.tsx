import { Position } from "@/pages";
import { DrawingManagerF, GoogleMap, MarkerF } from "@react-google-maps/api";
import { useEffect, useState } from "react";

interface Props {
  position: Position | null;
  onChangeLocation: (position: { lat: number; lng: number }) => void;
  setArea: (area: number) => void;
  setPerimeter: (perimeter: number) => void;
}

const defaultPosition = { lat: 10.96854, lng: -74.78132 };

export default function MapContainer(props: Props) {
  const mapStyles = {
    width: "100%", // Ancho del mapa
    height: "500px", // Altura del mapa
    backgroundColor: "#f0f0f0", // Color de fondo del mapa
    border: "1px solid #ccc", // Borde del mapa
    borderRadius: "30px", // Radio de borde del mapa
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Sombra del mapa

    // Otras propiedades y valores personalizados según tus necesidades
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Actualiza el estado con la ubicación actual
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

  const [polygon, setPolygon] = useState<google.maps.Polygon[]>([]);

  return (
    <div
      className="mapcontainer"
      style={{
        width: "95%",
        alignSelf: "center",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "20px",
        justifyContent: "center",
      }}
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={21}
        center={props.position ?? defaultPosition}
      >
        {props.position != null && <MarkerF position={props.position} />}

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

            props.setArea(
              google.maps.geometry.spherical.computeArea(e.getPath())
            );
            props.setPerimeter(
              google.maps.geometry.spherical.computeLength(e.getPath())
            );
          }}
        />
      </GoogleMap>

      {polygon.length ? (
        <button
          onClick={() => {
            polygon.forEach((e) => e.getPath().clear());
            setPolygon([]);
          }}
          className="clear-button"
          style={{
            alignSelf: "end",
            width: "fitcontainer",
            marginInlineEnd: "20px",
            height: "35px",
            marginBlock: "20px",
          }}
        >
          Borrar área selecionada
        </button>
      ) : null}
    </div>
  );
}
