import { usePosition } from "@/contexts/PositionContext";
import { useRate } from "@/contexts/RateContext";
import { RectangleProps } from "@react-google-maps/api";
import styles from "./styles.module.css";
import { usePanel } from "@/contexts/PanelsContext";

export default function Alert() {
  const {
    consume,
    kwhPrice,
    panelQuantity,
    sunByDay,
    panelToUse,
    streetLightingRateToUse,
    securityRateToUse,
    generatedPowerPerMonth,
  } = useRate();
  const { panels } = usePanel();
  const { stratum } = usePosition();

  const consumeWithSystem = consume! - generatedPowerPerMonth!;
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.pContainer}>
          <p className={styles.pp}>
            Con el área disponible tienes:
            <p className={styles.p}>{panels.length} paneles</p>
          </p>
        </div>
        <div className={styles.pContainer}>
          <p className={styles.pp}>
            Disminuyes consumo facturado un
            <p className={styles.p}>
              {((panels.length * 100) / panelQuantity!).toFixed(0)} %{" "}
            </p>
          </p>
        </div>
      </div>
      <div className={styles.aContainer}>
        <div className={styles.pContainer}>
          <p className={styles.ppp}>¿Cuánto pagas al año?</p>
          <p className={styles.pp}>
            Sin un sistema solar fotovoltaico
            <p className={styles.pRed}>
              {(
                (consume! * kwhPrice! +
                  securityRateToUse! +
                  streetLightingRateToUse!) *
                12
              ).toLocaleString("de-DE", {
                style: "currency",
                currency: "COP",
              })}
            </p>
          </p>
        </div>
        <div className={styles.pContainer}>
          <p className={styles.pp}>
            Con el sistema solar fotovoltaico
            <p className={styles.pGreen}>
              {(
                (consumeWithSystem * kwhPrice! +
                  securityRateToUse! +
                  streetLightingRateToUse!) *
                12
              ).toLocaleString("de-DE", {
                style: "currency",
                currency: "COP",
              })}
            </p>
          </p>
          x
        </div>
      </div>
    </div>
  );
}
