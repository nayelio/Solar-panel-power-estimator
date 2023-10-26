export const rotatePolygon = (
  coords: {
    lat: number;
    lng: number;
  }[],
  center: {
    lat: number;
    lng: number;
  },
  angle: number
) => {
  var radians = angle * (Math.PI / 180);
  var cos = Math.cos(radians);
  var sin = Math.sin(radians);

  for (var i = 0; i < coords.length; i++) {
    var x = coords[i].lng - center.lng;
    var y = coords[i].lat - center.lat;

    coords[i].lng = center.lng + (x * cos - y * sin);
    coords[i].lat = center.lat + (x * sin + y * cos);
  }

  return coords;
};
