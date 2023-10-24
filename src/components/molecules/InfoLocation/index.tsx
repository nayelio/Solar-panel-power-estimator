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

const InfoLocation = () => {
  const [step, setStep] = useState(0);
  const [showInput, setShowInput] = useState(true);

  const { setPosition, panels, setArea } = usePosition();
  const { consume, setConsume, setKwhPrice } = useRate();
  return (
    <div className={styles.container}>
      <div className={styles.bgContainer}>
        <Background />
        <div className={styles.box}>
          <ProgressBar step={step} setStep={setStep} />
        </div>
        {step === 0 ? (
          <div className={styles.body}>
            <div className={styles.input}>
              <InputConsumeInformation />
            </div>
          </div>
        ) : step === 1 ? (
          <div className={styles.step1Container}>
            <div className={styles.mapContainer}>
              <MapContainer enableDraw={false} />
              <div className={styles.inputSearchPlace}>
                <InputSearchPlace
                  onSelectPlace={(e: React.SetStateAction<Position | null>) => {
                    setPosition(e);
                    setShowInput(false);
                  }}
                />
              </div>
            </div>
          </div>
        ) : step === 2 ? (
          <div className={styles.step1Container}>
            <div className={styles.mapContainer}>
              <MapContainer enableDraw={true} />
            </div>
          </div>
        ) : (
          <div className={styles.step3Container}>
            <div className={styles.step3rowContainer}>
              <PHVSdescription panels={panels} />
              <Chart />
            </div>
          </div>
        )}
        <Buttons setStep={setStep} step={step} />
      </div>
    </div>
  );
};

export default InfoLocation;
