export const getSidesPolygon = (polygon: google.maps.Polygon) => {
  let width = 0;
  let height = 0;

  polygon.getPaths().forEach((path) => {
    for (let i = 0; i < path.getLength(); i++) {
      const point1 = path.getAt(i);
      const point2 = path.getAt((i + 1) % path.getLength()); // El último punto se conecta al primer punto

      // Calcula la distancia entre los dos puntos
      const distancia = google.maps.geometry.spherical.computeDistanceBetween(
        point1,
        point2
      );

      // Si la distancia es mayor que el ancho actual, actualiza el ancho
      if (distancia > width) {
        width = distancia;
      }

      // Si la distancia es menor que el largo actual, actualiza el largo
      if (distancia < height || height === 0) {
        height = distancia;
      }
    }
  });

  return { width, height };
};
