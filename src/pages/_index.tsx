import Chart from "@/components/atoms/Chart";
import InputConsumeInformation from "@/components/atoms/InputConsumeInformation";
import Steper from "@/components/atoms/Stepper";
import { PositionProvider, usePosition } from "@/contexts/PositionContext";
import { Libraries, useJsApiLoader } from "@react-google-maps/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import InputSearchPlace from "../components/atoms/InputSearchPlace";
import MapContainer from "../components/atoms/Map";
import styles from "../styles/Home.module.css";
import { RateProvider, useRate } from "@/contexts/RateContext";
import Image from "next/image";
import PHVSdescription from "@/components/molecules/PHVSdescription";

export type Position = {
  lat: number;
  lng: number;
};
const queryClient = new QueryClient();

const apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY ?? "";

const libraries: Libraries = ["places", "maps", "drawing"];

function Index() {
  const {
    position,
    setPosition,
    area,
    setArea,
    panels,
    setPanels,
    polygon,
    setPolygon,
  } = usePosition();

  const [showInput, setShowInput] = useState(true);
  const [step, setStep] = useState(0);

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
  }, [setPosition]);

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
            <MapContainer enableDraw={step === 1} />
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "10%",
            width: "100%",
            gap: "10%",
          }}
        >
          <Steper step={step} />
          <br />
          <br />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              height: "100%",
              width: "100%",
              gap: "10%",
            }}
          >
            <div className={styles.input}></div>

            <div className={styles.Map}>
              <MapContainer enableDraw={false} />
            </div>
          </div>
          <PHVSdescription panels={panels} />
        </div>
      )}
      <Chart />
    </div>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PositionProvider>
        <RateProvider>
          <Index />
        </RateProvider>
      </PositionProvider>
    </QueryClientProvider>
  );
};

export default App;
