export const getAnglePolygon = (polygon: google.maps.Polygon) => {
  var path = polygon.getPath();
  var numPoints = path.getLength();

  if (numPoints < 3) {
    // No se puede calcular el ángulo si el polígono tiene menos de tres puntos.
    return null;
  }

  var longestSideHeading = 0;
  var longestSideLength = 0;

  for (var i = 0; i < numPoints; i++) {
    var point1 = path.getAt(i);
    var point2 = path.getAt((i + 1) % numPoints);

    var lat1 = (point1.lat() * Math.PI) / 180;
    var lon1 = (point1.lng() * Math.PI) / 180;
    var lat2 = (point2.lat() * Math.PI) / 180;
    var lon2 = (point2.lng() * Math.PI) / 180;

    var y = Math.sin(lon2 - lon1) * Math.cos(lat2);
    var x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
    var angle = Math.atan2(y, x);

    var sideLength = google.maps.geometry.spherical.computeDistanceBetween(
      point1,
      point2
    );

    if (sideLength > longestSideLength) {
      longestSideLength = sideLength;
      longestSideHeading = (angle * 180) / Math.PI;
      if (longestSideHeading < 0) {
        longestSideHeading += 360;
      }
    }
  }

  if (longestSideHeading < 0) {
    longestSideHeading += 180;
  }
  if (longestSideHeading > 180) {
    longestSideHeading -= 180;
  }

  return longestSideHeading;
};
