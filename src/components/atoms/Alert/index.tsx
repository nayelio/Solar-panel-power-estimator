import { usePosition } from "@/contexts/PositionContext";
import { useRate } from "@/contexts/RateContext";
import { RectangleProps } from "@react-google-maps/api";
import styles from "./styles.module.css";
import { usePanel } from "@/contexts/PanelsContext";

export default function Alert() {
  const { systemPrice, panelsRealValue, panelQuantity, sunByDay, panelToUse } =
    useRate();
  const { panels } = usePanel();

  return (
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
            {((panels.length * 100) / panelQuantity!).toFixed(2)} %{" "}
          </p>
        </p>
      </div>
    </div>
  );
}
