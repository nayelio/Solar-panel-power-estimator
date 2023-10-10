import { Position } from "@/pages";
import {
  DrawingManagerF,
  GoogleMap,
  MarkerF,
  RectangleF,
  RectangleProps,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";

interface Props {
  position: Position | null;
  onChangeLocation: (position: { lat: number; lng: number }) => void;
  setArea: (area: number) => void;
  setPerimeter: (perimeter: number) => void;
  areaButton: boolean;
  setPanels: React.Dispatch<React.SetStateAction<RectangleProps["bounds"][]>>;
  panels: RectangleProps["bounds"][];
  setPolygon: React.Dispatch<React.SetStateAction<google.maps.Polygon[]>>;
  polygon: google.maps.Polygon[];
  enableDraw: boolean;
}
const apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY ?? "";

const defaultPosition = { lat: 10.96854, lng: -74.78132 };

const mapStyles = {
  width: "100%", // Ancho del mapa
  height: "80%", // Altura del mapa
  backgroundColor: "#f0f0f0", // Color de fondo del mapa
  border: "1px solid #ccc", // Borde del mapa
  borderRadius: "30px", // Radio de borde del mapa
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  // Otras propiedades y valores personalizados según tus necesidades
};

export default function MapContainer({
  panels,
  polygon,
  setPolygon,
  setPanels,
  ...props
}: Props) {
  const elevation = async () => {
    if (props.position === null) return;
    const rest = await fetch(
      `https://maps.googleapis.com/maps/api/elevation/json?locations=${props.position.lat}%2C${props.position.lng}&key=${apiKey}`
    );

    console.log(rest);
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (positionFromPermission) {
          const latitude = positionFromPermission.coords.latitude;
          const longitude = positionFromPermission.coords.longitude;
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
    <div
      className="mapcontainer"
      style={{
        width: "95%",
        alignSelf: "center",
        height: "90%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "20px",
        position: "absolute",
        marginBlockStart: "2%",
      }}
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={23}
        center={props.position ?? defaultPosition}
        mapTypeId="satellite" // Establece la vista por defecto como satelital
      >
        {props.position != null && <MarkerF position={props.position} />}

        {panels.map((item, index) => (
          <RectangleF key={index} bounds={item} />
        ))}

        <DrawingManagerF
          drawingMode={google.maps.drawing.OverlayType.POLYGON}
          options={{
            drawingControl: true,
            drawingControlOptions: {
              position: google.maps.ControlPosition.TOP_CENTER,
              drawingModes: props.enableDraw
                ? [google.maps.drawing.OverlayType.POLYGON]
                : [],
            },
            circleOptions: {
              fillColor: props.areaButton ? "F16A6A" : "fffaaa",
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

            const items = fillPolygonWithSquares(e);

            setPanels((prev) => [...prev, ...items]);
          }}
        />
      </GoogleMap>
    </div>
  );
}

var height = 2;
var width = 1;

function fillPolygonWithSquares(polygon: google.maps.Polygon) {
  var polygonBounds = new google.maps.LatLngBounds();
  polygon.getPaths().forEach(function (path) {
    path.forEach(function (latlng) {
      polygonBounds.extend(latlng);
    });
  });

  var polygonArea = google.maps.geometry.spherical.computeArea(
    polygon.getPath()
  );

  var rectWidthInSqMeters = width;
  var rectHeightInSqMeters = height;

  var numRectsWidth = Math.ceil(polygonArea / rectWidthInSqMeters);
  var numRectsHeight = Math.ceil(polygonArea / rectHeightInSqMeters);

  var latIncrement = rectHeightInSqMeters / 111111; // 1 grado de latitud es aproximadamente 111111 metros

  var panels = [];

  for (var i = 0; i < numRectsHeight; i++) {
    for (var j = 0; j < numRectsWidth; j++) {
      var lat = polygonBounds.getSouthWest().lat() + i * latIncrement;
      var lng =
        polygonBounds.getSouthWest().lng() +
        j * (rectWidthInSqMeters / (111111 * Math.cos((lat * Math.PI) / 180)));

      var rectangleBounds = {
        north: lat + latIncrement,
        south: lat,
        east:
          lng +
          rectWidthInSqMeters / (111111 * Math.cos((lat * Math.PI) / 180)),
        west: lng,
      };
      if (
        google.maps.geometry.poly.containsLocation(
          new google.maps.LatLng(lat, lng),
          polygon
        ) &&
        google.maps.geometry.poly.containsLocation(
          new google.maps.LatLng(rectangleBounds.north, rectangleBounds.east),
          polygon
        ) &&
        google.maps.geometry.poly.containsLocation(
          new google.maps.LatLng(rectangleBounds.north, rectangleBounds.west),
          polygon
        ) &&
        google.maps.geometry.poly.containsLocation(
          new google.maps.LatLng(rectangleBounds.south, rectangleBounds.east),
          polygon
        )
      ) {
        panels.push(rectangleBounds);
      }
    }
  }

  return panels;
}
