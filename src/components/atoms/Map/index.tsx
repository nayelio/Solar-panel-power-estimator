import { usePanel } from "@/contexts/PanelsContext";
import { usePosition } from "@/contexts/PositionContext";
import { useRate } from "@/contexts/RateContext";
import { generatePanels } from "@/helpers/panels";
import {
  DrawingManagerF,
  GoogleMap,
  MarkerF,
  PolygonF,
} from "@react-google-maps/api";
import { useEffect, useMemo } from "react";

interface Props {
  enableDraw: boolean;
}

const defaultPosition = { lat: 11.0190513, lng: -74.8537228 };

const mapStyles = {
  width: "100%", // Ancho del mapa
  height: "100%", // Altura del mapa
  backgroundColor: "#f0f0f0", // Color de fondo del mapa
  border: "1px solid #ccc", // Borde del mapa
  borderRadius: "30px", // Radio de borde del mapa
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  // Otras propiedades y valores personalizados según tus necesidades
};

const MapContainer = ({ enableDraw }: Props) => {
  const { position, setPerimeter, setPolygons, setArea, polygons } =
    usePosition();
  const { panels } = usePanel();

  return (
    <div
      style={{
        width: "70%",
        height: "100%",
        borderRadius: "20px",
      }}
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={23}
        center={position ?? defaultPosition}
        mapTypeId="satellite"

        // Establece la vista por defecto como satelital
      >
        {position != null && <MarkerF position={position} />}
        {panels.map((item, index) => (
          <PolygonF
            key={index}
            paths={item}
            options={{
              strokeColor: "#0A1DEE",
              fillColor: "#65548F",
              strokeWeight: 2,
            }}
          />
        ))}
        {polygons.map((item, index) => (
          <PolygonF
            key={index}
            paths={item.getPaths()}
            options={{
              fillColor: "#5D5CB6",
              strokeWeight: 0,
            }}
          />
        ))}

        {enableDraw && position ? (
          <DrawingManagerF
            key={0}
            drawingMode={google.maps.drawing.OverlayType.POLYGON}
            options={{
              polygonOptions: {
                geodesic: true,
                strokeWeight: 2,
                strokeColor: "#353DCB",
              },
              drawingControl: true,
              drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [google.maps.drawing.OverlayType.POLYGON],
              },
            }}
            onPolygonComplete={(e) => {
              setPolygons((prev) => [...prev, e]);
              setArea(google.maps.geometry.spherical.computeArea(e.getPath()));
              setPerimeter(
                google.maps.geometry.spherical.computeLength(e.getPath())
              );
            }}
          />
        ) : null}
      </GoogleMap>
    </div>
  );
};

export default MapContainer;
