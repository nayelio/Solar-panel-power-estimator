const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Rutas personalizadas (opcional)
  server.get("/sunpowerestimatorx", (req, res) => {
    // Lógica personalizada para esta ruta
    res.send("¡Hola desde una ruta personalizada!");
  });

  // Manejar todas las demás rutas con Next.js
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  // Puerto en el que se ejecutará el servidor
  const port = process.env.PORT || 3005;

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Serverr ready on http://localhost:${port}`);
  });
});
