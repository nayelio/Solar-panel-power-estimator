import { usePosition } from "@/contexts/PositionContext";
import { useRate } from "@/contexts/RateContext";
import { RectangleProps } from "@react-google-maps/api";
import styles from "./styles.module.css";
import { usePanel } from "@/contexts/PanelsContext";

export default function PHVSdescription() {
  const { panelToUse, inverterToUse } = useRate();
  const { panels, systemPrice } = usePanel();

  return (
    <div className={styles.container}>
      <p className={styles.system}>Caracteristicas del sistema</p>
      <div className={styles.pContainer}>
        <p className={styles.pp}>
          <p className={styles.p}>
            {(panels.length * (panelToUse?.Power ?? 0)).toLocaleString("de-DE")}{" "}
            Wp
          </p>
          Tamaño de la planta
        </p>
      </div>

      <div className={styles.informationContainer}>
        <div className={styles.pContainer}>
          <p className={styles.pp}>
            <p className={styles.p}>{panels.length ?? 0}</p>
            n° Paneles
          </p>
        </div>
        <div className={styles.pContainer}>
          <p className={styles.pp}>
            <p className={styles.p}>{panelToUse?.Power ?? 0}</p>
            Potencia del panel
          </p>
        </div>
        <div className={styles.pContainer}>
          <p className={styles.pp}>
            <p className={styles.p}>
              {inverterToUse?.Power.toLocaleString("de-DE") ?? 0} WAC
            </p>
            Potencia del inversor
          </p>
        </div>
      </div>
    </div>
  );
}
