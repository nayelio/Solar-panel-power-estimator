import Alert from "@/components/atoms/Alert";
import Chart from "@/components/atoms/Chart";
import InputConsumeInformation from "@/components/atoms/InputConsumeInformation";
import InputSearchPlace from "@/components/atoms/InputSearchPlace";
import InputStratum from "@/components/atoms/InputStratum";
import MapContainer from "@/components/atoms/Map";
import { Position, usePosition } from "@/contexts/PositionContext";
import { useMediaQuery } from "@mui/material";
import Buttons from "../Buttons";
import PHVSdescription from "../PHVSdescription";
import styles from "./styles.module.css";

const InfoLocation = () => {
  const { setPosition } = usePosition();
  const isMobile = useMediaQuery("(max-width: 480px)");

  return (
    <div className={styles.container}>
      <div
        className={styles.body}
        style={{
          width: isMobile ? "85%" : undefined,
        }}
      >
        <h6 className={styles.h6}>
          1. Ingrese datos de consumo y tarifa de energía{" "}
        </h6>
        <InputConsumeInformation />
        <h6 className={styles.h6}>2. Ingrese la ubicación del sistema</h6>
        <div
          className={styles.input}
          style={{
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "start" : undefined,
          }}
        >
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
            {isMobile ? <Buttons /> : null}
            <PHVSdescription />
          </div>
          {!isMobile ? (
            <div className={styles.button}>
              <Buttons />
            </div>
          ) : null}
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
