import { getAnglePolygon } from "./getAnglePolygon";
import { getSidesPolygon } from "./getSidesPolygon";
import { rotatePolygon } from "./rotatePolygon";

type PanelSize = {
  width: number;
  height: number;
};

const angleToRadians = (angle: number) => (angle * Math.PI) / 180;
const metersToDegrees = (meters: number) => (meters / 40075000) * 360;

const PERCENTAGE_HEIGHT_MANTAINEMENT = 0.3;

export const generatePanels = (
  polygon: google.maps.Polygon,
  panelSize: PanelSize = { width: 1.8, height: 1.0 },
  inclination?: number
) => {
  var polygonBounds = new google.maps.LatLngBounds();
  polygon.getPath().forEach(function (latlng) {
    polygonBounds.extend(latlng);
  });

  inclination ??= Math.round(polygonBounds.getCenter().lat());

  if (inclination < 0) {
    inclination = 0;
  } else if (inclination > 90) {
    inclination = 89;
  }

  // se modifica el panelSize para que tome en cuenta la inclinacion
  panelSize.width = panelSize.width * Math.cos(angleToRadians(inclination));

  if (panelSize.width < 0.001) {
    panelSize.width = 0.01;
  }

  var panels = [];

  const angle = getAnglePolygon(polygon) ?? 180;

  var { width, height } = getSidesPolygon(polygon);

  width = Math.max(width, height);
  height = width;

  const numPanelsWidth = Math.ceil(width / panelSize.width);
  const numPanelsHeight = Math.ceil(height / panelSize.height);

  for (var i = 0; i < numPanelsWidth; i++) {
    for (var j = 0; j < numPanelsHeight; j++) {
      var x = i * panelSize.width;
      var y = j * panelSize.height;

      if ((i + 1) % 2 === 0) {
        x += panelSize.width * PERCENTAGE_HEIGHT_MANTAINEMENT * i;
      } else {
        x += panelSize.width * PERCENTAGE_HEIGHT_MANTAINEMENT * (i - 1);
      }

      const coords = [
        {
          lat: x,
          lng: y,
        },
        {
          lat: x + panelSize.width,
          lng: y,
        },
        {
          lat: x + panelSize.width,
          lng: y + panelSize.height,
        },
        {
          lat: x,
          lng: y + panelSize.height,
        },
      ];

      panels.push(coords);
    }
  }

  var panelsInPolygon = panels.map((panel) =>
    rotatePolygon(
      panel.map(({ lat, lng }) => ({
        lat: polygonBounds.getSouthWest().lat() + metersToDegrees(lat),
        lng: polygonBounds.getSouthWest().lng() + metersToDegrees(lng),
      })),
      {
        lat: polygonBounds.getSouthWest().lat(),
        lng: polygonBounds.getSouthWest().lng(),
      },
      angle * -1
    )
  );

  // mover el conjunto de poligonos (panelsInPolygon) para que el centro de panelsInPolygon sea el centro de polygonBounds
  const panelBounds = new google.maps.LatLngBounds();
  panelsInPolygon.forEach((panel) => {
    panel.forEach(function (latlng) {
      panelBounds.extend(latlng);
    });
  });
  const latDiff =
    polygonBounds.getCenter().lat() -
    panelBounds.getCenter().lat() +
    metersToDegrees(panelSize.width * PERCENTAGE_HEIGHT_MANTAINEMENT);
  const lngDiff =
    polygonBounds.getCenter().lng() -
    panelBounds.getCenter().lng() +
    metersToDegrees(panelSize.width * PERCENTAGE_HEIGHT_MANTAINEMENT);

  panelsInPolygon = panelsInPolygon.map((panel) => {
    return panel.map(({ lat, lng }) => ({
      lat:
        lat +
        latDiff +
        metersToDegrees(panelSize.width * PERCENTAGE_HEIGHT_MANTAINEMENT),
      lng:
        lng +
        lngDiff +
        metersToDegrees(panelSize.width * PERCENTAGE_HEIGHT_MANTAINEMENT),
    }));
  });

  var padding = metersToDegrees(
    panelSize.width * PERCENTAGE_HEIGHT_MANTAINEMENT * -1
  );
  panelsInPolygon = panelsInPolygon.filter((panel) =>
    panel.every((point) =>
      google.maps.geometry.poly.containsLocation(
        new google.maps.LatLng(point.lat, point.lng),
        new google.maps.Polygon({
          paths: addPaddingToPolygon(polygon, padding),
        })
      )
    )
  );

  return panelsInPolygon;
};

function addPaddingToPolygon(polygon: google.maps.Polygon, padding: number) {
  let centroid = getCentroid(polygon);
  let paddedPolygon = polygon
    .getPath()
    .getArray()
    .map((point) => {
      let dx = point.lng() - centroid.lng;
      let dy = point.lat() - centroid.lat;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let paddingFactor = (distance + padding) / distance;
      return {
        lat: centroid.lat + dy * paddingFactor,
        lng: centroid.lng + dx * paddingFactor,
      };
    });
  return paddedPolygon;
}

function getCentroid(polygon: google.maps.Polygon) {
  let lng = 0,
    lat = 0;
  polygon.getPath().forEach((point) => {
    lng += point.lng();
    lat += point.lat();
  });
  return {
    lng: lng / polygon.getPath().getArray().length,
    lat: lat / polygon.getPath().getArray().length,
  };
}
