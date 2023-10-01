import Chart from "./components/atoms/Chart";
import InputSearchPlace from "./components/atoms/InputSearchPlace";
import MapContainer from "./components/atoms/Map";
import { SelectChangeEvent } from "@mui/material";
import { Libraries, useJsApiLoader } from "@react-google-maps/api";
import type { AppProps } from "next/app";
import React, { useState } from "react";
import Image from "next/image";
export type Position = {
  lat: number;
  lng: number;
};

const apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY ?? "";

const libraries: Libraries = ["places", "maps", "drawing"];

export default function App({ Component, pageProps }: AppProps) {
  const [position, setPosition] = useState<null | Position>(null);
  const [area, setArea] = useState(0);
  const [perimeter, setPerimeter] = useState(0);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries,
  });

  if (!isLoaded) return null;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontSize: "20px",
        paddingInline: "20px",
        height: "100%",
      }}
    >
      <Image
        src="/SunPower.png"
        width={280}
        height={50}
        alt="Picture of the author"
      />
      <br></br>
      <br></br>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          height: "100%",
        }}
        className="pagessss"
      >
        <InputSearchPlace
          onSelectPlace={(e: React.SetStateAction<Position | null>) => {
            setPosition(e);
          }}
        />
        <MapContainer
          position={position}
          onChangeLocation={(pos: React.SetStateAction<Position | null>) => {
            setPosition(pos);
          }}
          setArea={setArea}
          setPerimeter={setPerimeter}
        />
      </div>
      {position ? (
        <div
          className="chart"
          style={{
            backgroundColor: "white",
            borderColor: "gray",
            borderRadius: "20px",
            height: "200px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginInline: "25px",
          }}
        >
          <div className="information">
            {" "}
            <h3>Información registrada</h3>
            <h5>Area: {area.toFixed(2)} m2</h5>
            <h5>Perimetro: {perimeter.toFixed(2)} m2</h5>
          </div>
          {position != null && <Chart position={position} />}
        </div>
      ) : null}
    </div>
  );
}
