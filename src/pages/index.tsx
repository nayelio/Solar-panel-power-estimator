import Chart from "@/components/atoms/Chart";
import InputConsumeInformation from "@/components/atoms/InputConsume";
import Steper from "@/components/atoms/Stepper";
import { PositionProvider, usePosition } from "@/contexts/PositionContext";
import { Libraries, useJsApiLoader } from "@react-google-maps/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import InputSearchPlace from "../components/atoms/InputSearchPlace";
import MapContainer from "../components/atoms/Map";
import styles from "../styles/home.module.css";
import { RateProvider } from "@/contexts/RateContext";
import Image from "next/image";
import { DialogContent } from "@mui/material";
import ButtonArray from "@/components/molecules/ButtonArray";

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
    setPanels,
    polygon,
    setPolygon,
  } = usePosition();
  const [showInput, setShowInput] = useState(true);
  const [step, setStep] = useState(1);

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
    <div>
      <div className="Box">
        <div className={styles.ImageContainer}>
          <Image src="/LadingPage.png" alt="" fill />
        </div>
      </div>
      <div className={styles.h1Container}>
        <h1 className={styles.h1}>EL SOL BRILLA, TU FACTURA </h1>
      </div>
      <div className={styles.h3Container}>
        <h3 className={styles.h3}>
          Entendemos la energía solar{" "}
          <span className={styles.h3Span}> para ti</span>
        </h3>
        <ButtonArray />
      </div>
      {step !== 4 ? (
        <div className={styles.resultContainer}>
          <Steper step={step} />
          {!area ? (
            <div>
              <InputSearchPlace
                onSelectPlace={(e: React.SetStateAction<Position | null>) => {
                  setPosition(e);
                  setShowInput(true);
                  setStep(2);
                }}
              />
              <MapContainer enableDraw={true} />
            </div>
          ) : (
            <InputSearchPlace
              onSelectPlace={(e: React.SetStateAction<Position | null>) => {
                setPosition(e);
                setShowInput(false);
                setStep(3);
              }}
            />
          )}
        </div>
      ) : (
        <div className={styles.resultContainer}>
          <Steper step={step} />
          <MapContainer enableDraw />
        </div>
      )}
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
