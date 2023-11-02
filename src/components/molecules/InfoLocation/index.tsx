import InputConsumeInformation from "@/components/atoms/InputConsumeInformation";
import styles from "./styles.module.css";
import ProgressBar from "@/components/atoms/Progress";
import Background from "@/assets/svgs/background.svg";
import Buttons from "../Buttons";
import { SetStateAction, useState } from "react";
import MapContainer from "@/components/atoms/Map";
import InputSearchPlace from "@/components/atoms/InputSearchPlace";
import { Position, usePosition } from "@/contexts/PositionContext";
import PHVSdescription from "../PHVSdescription";
import Chart from "@/components/atoms/Chart";
import { useRate } from "@/contexts/RateContext";
import Alert from "@/components/atoms/Alert";
import InputStratum from "@/components/atoms/InputStratum";

const InfoLocation = () => {
  const [step, setStep] = useState(0);
  const { position, setPosition } = usePosition();
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <ProgressBar step={step} setStep={setStep} />
      </div>

      <div className={styles.body}>
        <h6 className={styles.h6}>
          1. Ingrese datos de consumo y tarifa de energía{" "}
        </h6>
        <InputConsumeInformation />
        <h6 className={styles.h6}>2. Ingrese la ubicación del sistema </h6>
        <div className={styles.input}>
          <InputSearchPlace
            onSelectPlace={(e: React.SetStateAction<Position | null>) => {
              setPosition(e);
            }}
          />
          <InputStratum />
        </div>
        <div className={styles.mapContainer}>
          <h6 className={styles.h6}>
            3. Dibuje el área disponible para el sistema{" "}
          </h6>
          <div className={styles.mapAlert}>
            <MapContainer enableDraw={true} />
            <PHVSdescription />
          </div>
          <div className={styles.button}>
            <Buttons />
          </div>
        </div>
        <div className={styles.resultContainer}>
          <h6 className={styles.h61}>Esta es la estimación de tu sistema </h6>
          <div className={styles.results}>
            <Alert />
            <Chart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoLocation;
