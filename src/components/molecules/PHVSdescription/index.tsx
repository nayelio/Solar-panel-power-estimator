import { usePosition } from "@/contexts/PositionContext";
import { useRate } from "@/contexts/RateContext";
import { RectangleProps } from "@react-google-maps/api";
import styles from "./styles.module.css";
import { usePanel } from "@/contexts/PanelsContext";

export default function PHVSdescription() {
  const { panelsRealValue, panelQuantity, sunByDay, panelToUse } = useRate();
  const { inverterToUse, panels, systemPrice } = usePanel();

  return (
    <div className={styles.container}>
      <p className={styles.system}>Caracteristicas del sistema</p>
      <div className={styles.pContainer}>
        <p className={styles.pp}>
          Tamaño de la planta
          <p className={styles.p}>
            {(panels.length * panelToUse?.Power!).toLocaleString("de-DE")} Wp
          </p>
        </p>
      </div>
      <div className={styles.pContainer}>
        <p className={styles.pp}>
          Costo estimado del sistema
          <p className={styles.p}>
            $
            {((systemPrice ?? 0) + (inverterToUse?.Price ?? 0)).toLocaleString(
              "de-DE",
              {
                style: "currency",
                currency: "COP",
              }
            )}
          </p>
        </p>
      </div>

      <div className={styles.pContainer}>
        <p className={styles.pp}>
          Ahorro por beneficio tributario
          <p className={styles.p}>
            $
            {((systemPrice ?? 0) * 0.5).toLocaleString("de-DE", {
              style: "currency",
              currency: "COP",
            })}
          </p>
        </p>
      </div>

      <div className={styles.informationContainer}>
        <div className={styles.pContainer}>
          <p className={styles.pp}>
            <p className={styles.p}>{panels.length}</p>
            Paneles
          </p>
        </div>
        <div className={styles.pContainer}>
          <p className={styles.pp}>
            <p className={styles.p}>
              {panelsRealValue?.[2].Power ? panelsRealValue?.[2].Power : 0}
            </p>
            Potencia del panel
          </p>
        </div>
        <div className={styles.pContainer}>
          <p className={styles.pp}>
            <p className={styles.p}>
              {inverterToUse?.Power!.toLocaleString("de-DE")} WAC
            </p>
            Potencia del inversor
          </p>
        </div>
      </div>
    </div>
  );
}
