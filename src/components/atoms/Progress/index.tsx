import styles from "./styles.module.css";
interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  step: number;
}
export default function ProgressBar(props: Props) {
  return (
    <div className={styles.container}>
      <p className={styles.step}>Paso 1 de 1 </p>{" "}
      <p className={styles.p}> Ingresa los datos</p>
    </div>
  );
}
