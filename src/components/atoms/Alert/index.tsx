import { usePosition } from "@/contexts/PositionContext";
import { useRate } from "@/contexts/RateContext";
import { RectangleProps } from "@react-google-maps/api";
import styles from "./styles.module.css";
import { usePanel } from "@/contexts/PanelsContext";

export default function Alert() {
  const { systemPrice, panelsRealValue, panelQuantity, sunByDay } = useRate();
  const { panels } = usePanel();

  return (
    <div className={styles.container}>
      <p className={styles.system}>Tu sistema se veria asi:</p>

      <div className={styles.pContainer}>
        <p className={styles.pp}>
          Para ahorrate el 100% del tu consumo mensual necesitas: <br></br>
          <p className={styles.p}>{panelQuantity} paneles</p>
        </p>
      </div>

      <div className={styles.pContainer}>
        <p className={styles.pp}>
          Con el área seleccionada ahorras;
          <br></br>
          <p className={styles.p}>{(panels.length * 100) / panelQuantity!}%</p>
        </p>
      </div>
    </div>
  );
}
