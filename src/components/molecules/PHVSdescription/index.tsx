import { usePosition } from "@/contexts/PositionContext";
import { useRate } from "@/contexts/RateContext";
import { RectangleProps } from "@react-google-maps/api";
import styles from "./styles.module.css";

interface props {
  panels: RectangleProps["bounds"][];
}
export default function PHVSdescription(Props: props) {
  const { systemPrice, panelsRealValue, panelQuantity, sunByDay } = useRate();

  return (
    <div className={styles.container}>
      <p className={styles.system}>Tu sistema se veria asi:</p>

      <div className={styles.pContainer}>
        <p className={styles.pp}>
          Costo estimado del sistema
          <br></br>
          <p className={styles.p}>${systemPrice}</p>
        </p>
      </div>

      <div className={styles.pContainer}>
        <p className={styles.pp}>
          Ahorro por beneficio tributario
          <br></br>
          <p className={styles.p}>${systemPrice! * 0.5}</p>
        </p>
      </div>

      <div className={styles.informationContainer}>
        <div className={styles.pContainer}>
          <p className={styles.pp}>
            <p className={styles.p}>{panelQuantity}</p>
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
              {Math.ceil(
                ((panelQuantity! * panelsRealValue?.[2].Power!) / 1000) *
                  sunByDay! *
                  0.77 *
                  365
              )}
            </p>
            Potencia generada al año
          </p>
        </div>
      </div>
    </div>
  );
}
