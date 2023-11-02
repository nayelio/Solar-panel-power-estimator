import { usePosition } from "@/contexts/PositionContext";
import { useRate } from "@/contexts/RateContext";
import { RectangleProps } from "@react-google-maps/api";
import styles from "./styles.module.css";
import { usePanel } from "@/contexts/PanelsContext";

export default function Alert() {
  const { consume, panelToUse, generatedPowerPerMonth, panelsRealValue } =
    useRate();
  const { inverterToUse, systemPrice, panels } = usePanel();
  const { stratum } = usePosition();

  const consumeWithSystem = (consume ?? 0) - (generatedPowerPerMonth ?? 0);
  return (
    <div className={styles.container}>
      <p className={styles.system}>Beneficios económicos</p>
      <div className={styles.pContainer}>
        <p className={styles.pp}>
          <p className={styles.p}>
            {(panels.length * panelToUse?.Power!).toLocaleString("de-DE")}
          </p>
          Costo de la planta
        </p>
      </div>
      <div className={styles.pContainer}>
        <p className={styles.pp}>
          <p className={styles.p}>
            {(panels.length * panelToUse?.Power!).toLocaleString("de-DE")}
          </p>
          Retorno de la inversion
        </p>
      </div>
      <div className={styles.informationContainer}>
        <div className={styles.pContainer}>
          <p className={styles.pp}>
            <p className={styles.pGren}>
              {panelsRealValue?.[2].Power ? panelsRealValue?.[2].Power : 0}
            </p>
            Lo que pagas
          </p>
        </div>
        <div className={styles.pContainer}>
          <p className={styles.pp}>
            <p className={styles.pRed}>
              {(inverterToUse?.Power! * 1).toLocaleString("de-DE")} WAC
            </p>
            Lo que dejas de pagar
          </p>
        </div>
      </div>
    </div>
  );
}
