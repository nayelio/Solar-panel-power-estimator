import Steper from "@/components/atoms/Stepper";
import { Libraries, useJsApiLoader } from "@react-google-maps/api";
import type { AppProps } from "next/app";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import InputSearchPlace from "../components/atoms/InputSearchPlace";
import MapContainer from "../components/atoms/Map";
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
  const [showInput, setShowInput] = useState(true);
  const [step, setStep] = useState(0);
  const [areaButton, setAreaButton] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries,
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Actualiza el estado con la ubicación actual
          setPosition({ lat: latitude, lng: longitude });
        },
        function (error) {
          console.error("Error al obtener la ubicación: " + error.message);
        }
      );
    } else {
      console.error("La geolocalización no es compatible en este navegador.");
    }
  }, []);

  if (!isLoaded) return null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontSize: "20px",
        paddingInline: "20px",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <br></br>
      <br></br>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "10%",
        }}
        className="StepperContainer"
      >
        <Steper step={step} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            height: "100%",
          }}
          className="pagessss"
        >
          {showInput ? (
            <InputSearchPlace
              onSelectPlace={(e: React.SetStateAction<Position | null>) => {
                setPosition(e);
                setShowInput(false);
                setStep(1);
              }}
            />
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "30%",
                height: "25%",
                position: "absolute",
                zIndex: "2",
                backgroundColor: "white",
                left: "60%",
                borderRadius: "30px",
                color: "#ED411A",
                top: "25%",
              }}
            >
              <h5 style={{ position: "absolute", left: "10%", color: "black" }}>
                Dibuja el área
              </h5>
              <p
                style={{
                  position: "absolute",
                  left: "10%",
                  top: "20%",
                  fontSize: "15px",
                  color: "black",
                }}
              >
                Dibuja el área donde quieres tu sistema
              </p>
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  position: "absolute",
                  zIndex: "2",
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "20%",
                  position: "absolute",
                  zIndex: "2",
                  top: "90%",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <button
                  style={{
                    borderRadius: "80px",
                    backgroundColor: "#ED411A",
                    color: "white",
                    fontSize: "13px",
                    fontWeight: "500",
                    height: "100%",
                    width: "40%",
                    boxShadow: "0px 10px 4px 0px rgbg(0,0,0,0.25)",
                  }}
                  onClick={(e) => setAreaButton(true)}
                >
                  Nuevo sistema
                </button>
                <button
                  style={{
                    borderRadius: "80px",
                    backgroundColor: "#d9d9d9",
                    color: "black",
                    fontSize: "13px",
                    fontWeight: "500",
                    height: "100%",
                    width: "40%",
                    boxShadow: "0px 10px 4px 0px rgbg(0,0,0,0.25)",
                  }}
                >
                  Ya tengo un sistema
                </button>
              </div>
            </div>
          )}

          <MapContainer
            position={position}
            onChangeLocation={(pos: React.SetStateAction<Position | null>) => {
              setPosition(pos);
              setShowInput(false);
              setStep(1);
            }}
            setArea={(e) => {
              setArea(e);
              setStep(2);
            }}
            setPerimeter={setPerimeter}
            areaButton={false}
          />
        </div>
      </div>
      {position ? <div></div> : null}
    </div>
  );
}
