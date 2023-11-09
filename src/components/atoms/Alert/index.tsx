import { usePosition } from "@/contexts/PositionContext";
import { useRate } from "@/contexts/RateContext";
import { RectangleProps } from "@react-google-maps/api";
import styles from "./styles.module.css";

export default function Alert() {
  const { consume, panelToUse, kwhPrice, sunByDay, inverterToUse, panels } =
    useRate();

  const inverterGenerator =
    ((inverterToUse?.Power ?? 0) / 1000) * (sunByDay ?? 0) * 30;

  let savingConsume;
  if (inverterGenerator >= (consume ?? 0)) {
    savingConsume = 100;
  } else {
    savingConsume = ((inverterGenerator / (consume ?? 0)) * 100).toFixed(0);
  }
  return (
    <div className={styles.container}>
      <p className={styles.system}>Beneficios económicos</p>
      <div className={styles.pContainer}>
        <p className={styles.pp}>
          <p className={styles.p}>
            {(
              panels.length * (panelToUse?.Price ?? 0) +
              (inverterToUse?.Price ?? 0)
            ).toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0, // Esto evita que se muestren decimales
              maximumFractionDigits: 0, // Esto asegura que no haya decimales
            })}{" "}
            COP
          </p>
          Costo de la planta
        </p>
      </div>
      <div className={styles.pContainer}>
        <p className={styles.pp}>
          <p className={styles.p}>
            {(
              (panels.length * (panelToUse?.Price ?? 0) +
                (inverterToUse?.Price ?? 0)) /
              2
            ).toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0, // Esto evita que se muestren decimales
              maximumFractionDigits: 0, // Esto asegura que no haya decimales
            })}{" "}
            COP
          </p>
          Beneficio tributario en usuarios comerciales
        </p>
      </div>
      <div className={styles.informationContainer}>
        <div className={styles.pContainer}>
          <p className={styles.pp}>
            <p className={styles.pGren}>{!consume ? 0 : savingConsume} %</p>
            Consumo ahorrado al mes
          </p>
        </div>
        <div className={styles.pContainer}>
          <p className={styles.pp}>
            <p className={styles.pGren}>
              {(
                ((inverterToUse?.Power ?? 0) / 1000) *
                (sunByDay ?? 0) *
                30 *
                (kwhPrice ?? 0)
              ).toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0, // Esto evita que se muestren decimales
                maximumFractionDigits: 0, // Esto asegura que no haya decimales
              })}{" "}
              COP
            </p>
            Lo que dejas de pagar al mes
          </p>
        </div>
      </div>
    </div>
  );
}
