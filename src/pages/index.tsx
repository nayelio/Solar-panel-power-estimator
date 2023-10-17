import Steper from "@/components/atoms/Stepper";
import {
  Libraries,
  RectangleProps,
  useJsApiLoader,
} from "@react-google-maps/api";
import type { AppProps } from "next/app";
import Image from "next/image";
import React, {
  Component,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import InputSearchPlace from "../components/atoms/InputSearchPlace";
import MapContainer from "../components/atoms/Map";
import Chart from "@/components/atoms/Chart";
import styles from "../styles/home.module.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import InputConsumeInformation from "@/components/atoms/InputConsume";
import { serialize } from "v8";
import RateResults from "@/components/atoms/RateResults";

export type Position = {
  lat: number;
  lng: number;
};
const queryClient = new QueryClient();

const apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY ?? "";

const libraries: Libraries = ["places", "maps", "drawing"];

export default function App({ Component, pageProps }: AppProps) {
  const [position, setPosition] = useState<null | Position>(null);
  const [area, setArea] = useState(0);
  const [perimeter, setPerimeter] = useState(0);
  const [showInput, setShowInput] = useState(true);
  const [step, setStep] = useState(0);
  const [panels, setPanels] = useState<RectangleProps["bounds"][]>([]);
  const [polygon, setPolygon] = useState<google.maps.Polygon[]>([]);
  const [inputConsume, setInputConsume] = useState<string | undefined>();
  const [inputkWhValues, setInputkWhValues] = useState<string | undefined>();
  const [placeDetails, setPlaceDetails] =
    useState<google.maps.places.PlaceResult | null>();
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
    <QueryClientProvider client={queryClient}>
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
        {step !== 2 ? (
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
                <div className={styles.informationBox}>
                  <h5
                    style={{
                      position: "absolute",
                      left: "10%",
                      color: "black",
                    }}
                  >
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

                  <div className={styles.buttonContainer}>
                    <button
                      className={styles.deleteButton}
                      onClick={() => {
                        polygon.forEach((e) => e.getPath().clear());
                        setPolygon([]);
                        setPanels([]);
                        setArea(0);
                      }}
                    >
                      Borrar área
                    </button>

                    <button
                      className={
                        !area
                          ? styles.areaReadyButtonDisabled
                          : styles.areaReadyButton
                      }
                      onClick={() => {
                        setStep(2);
                      }}
                      disabled={!area}
                    >
                      Listo
                    </button>
                  </div>
                </div>
              )}

              <MapContainer
                position={position}
                panels={panels}
                polygon={polygon}
                enableDraw={step === 1}
                setPanels={setPanels}
                setPolygon={setPolygon}
                onChangeLocation={(
                  pos: React.SetStateAction<Position | null>
                ) => {
                  setPosition(pos);
                  setShowInput(false);
                  setStep(1);
                }}
                setArea={(e) => {
                  setArea(e);
                }}
                setPerimeter={setPerimeter}
                areaButton={false}
              />
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "100%",
            }}
          >
            <p
              style={{
                color: "#ED411A",
                fontFamily: "Andada Pro",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: "800",
                lineHeight: "normal",
                padding: "1%",
                gap: "3%",
              }}
            >
              <Steper step={step} />
              Tu sistema ideal es
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                height: "800%",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "70%",
                  width: "30%",
                  marginBlockStart: "2%",
                  alignItems: "start",
                  gap: "10%",
                  borderRadius: "30px",
                  background: "#FFF",
                  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                  padding: "2%",
                }}
              >
                <p
                  style={{
                    color: "#000",
                    fontFamily: "Andada Pro",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "800",
                    lineHeight: "normal",
                  }}
                >
                  Paneles solares
                </p>
                <p
                  style={{
                    color: "#000",
                    fontFamily: "Andada Pro",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "800",
                    lineHeight: "normal",
                  }}
                >
                  Cantidad: {}
                </p>
                <p
                  style={{
                    color: "#000",
                    fontFamily: "Andada Pro",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "800",
                    lineHeight: "normal",
                  }}
                >
                  Potencia: {}
                </p>
                <p
                  style={{
                    color: "#000",
                    fontFamily: "Andada Pro",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "800",
                    lineHeight: "normal",
                  }}
                >
                  Inversor
                </p>
                <p
                  style={{
                    color: "#000",
                    fontFamily: "Andada Pro",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "800",
                    lineHeight: "normal",
                  }}
                >
                  Cantidad: {}
                </p>
                <p
                  style={{
                    color: "#000",
                    fontFamily: "Andada Pro",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "800",
                    lineHeight: "normal",
                  }}
                >
                  Potencia: {}
                </p>
              </div>
            </div>
            <div
              style={{
                width: "55%",
                alignSelf: "end",
                height: "77%",
                display: "flex",
                flexDirection: "column",
                borderRadius: "20px",
                position: "absolute",
                marginBlockStart: "9%",
              }}
            >
              <MapContainer
                position={position}
                panels={panels}
                polygon={polygon}
                enableDraw={false}
                setPanels={setPanels}
                setPolygon={setPolygon}
                onChangeLocation={(
                  pos: React.SetStateAction<Position | null>
                ) => {
                  setPosition(pos);
                  setShowInput(false);
                  setStep(3);
                }}
                setArea={(e) => {
                  setArea(e);
                  setStep(3);
                }}
                setPerimeter={setPerimeter}
                areaButton={false}
              />
            </div>

            <p>Tus beneficios son</p>
            <div
              style={{
                width: "89%",
                justifyContent: "center",
                justifySelf: "center",
                alignSelf: "center",
                height: "100%",
                display: "flex",
                flexDirection: "row",

                marginBlockStart: "2%",
                alignItems: "center",
                gap: "10%",
                borderRadius: "30px",
                background: "#FFF",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div>
                <h6>$29.000.000</h6>
                <p>Son los ahorros por año</p>
              </div>
              <div>
                <h6>$29.000.000</h6>
                <p>Son los ahorros por año</p>
              </div>
              <div>
                <h6>$29.000.000</h6>
                <p>Son los ahorros por año</p>
              </div>
              <div>
                <h6>$29.000.000</h6>
                <p>Son los ahorros por año</p>
              </div>
            </div>
            <Chart position={position} />
            <InputConsumeInformation
              setInputConsume={setInputConsume}
              inputConsume={inputConsume}
              inputkWhValues={inputkWhValues}
              setInputkWhValues={setInputkWhValues}
            />
          </div>
        )}
      </div>
    </QueryClientProvider>
  );
}
