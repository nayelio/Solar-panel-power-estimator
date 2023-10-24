import styles from "./styles.module.css";
interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  step: number;
}
export default function ProgressBar(props: Props) {
  return (
    <div className={styles.container}>
      <p className={styles.step}>Paso {props.step + 1} de 4 </p>{" "}
      {props.step === 0 ? (
        <p className={styles.p}> Digite información de consumo</p>
      ) : props.step === 1 ? (
        <p className={styles.p}> Elija la ubicación</p>
      ) : props.step === 2 ? (
        <p className={styles.p}> Dibuje el área</p>
      ) : props.step === 3 ? (
        <p className={styles.p}> Conoce tu sistema</p>
      ) : null}
    </div>
  );
}
