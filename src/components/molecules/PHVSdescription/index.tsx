import { usePosition } from "@/contexts/PositionContext";
import { useRate } from "@/contexts/RateContext";
import { RectangleProps } from "@react-google-maps/api";
import styles from "./styles.module.css";

interface props {
  panels: RectangleProps["bounds"][];
}
export default function PHVSdescription(Props: props) {
  const { panels } = usePosition();
  const { panelToUse } = useRate();

  return (
    <div className={styles.container}>
      <p className={styles.system}>Tu sistema se veria asi:</p>
      <div className={styles.pContainer}>
        <p className={styles.pp}>
          Consto de instalación
          <br></br>
          <p className={styles.p}>{}</p>
        </p>
      </div>

      <div className={styles.pContainer}>
        <p className={styles.pp}>
          Ahorro por beneficio tributario
          <br></br>
          <p className={styles.p}>{}</p>
        </p>
      </div>

      <div className={styles.container}>
        <div className={styles.pContainer}>
          <p className={styles.pp}>
            <p className={styles.p}>{panels.length}</p>
            Paneles
          </p>
        </div>
        <div className={styles.pContainer}>
          <p className={styles.pp}>
            <p className={styles.p}>{panelToUse?.Power}</p>
            Potencia del panel
          </p>
        </div>
        <div className={styles.pContainer}>
          <p className={styles.pp}>
            <p className={styles.p}>{panels.length}</p>
            Potencia generada
          </p>
        </div>
      </div>
    </div>
  );
}
