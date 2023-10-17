import styles from "./styles.module.css";
export default function ButtonArray() {
  return (
    <div className={styles.buttonArray}>
      <button className={styles.button1}>Precisión</button>
      <button className={styles.button2}> Adaptabilidad</button>
      <button className={styles.button3}>
        {" "}
        Confiabilidad y disponibilidad
      </button>
    </div>
  );
}
