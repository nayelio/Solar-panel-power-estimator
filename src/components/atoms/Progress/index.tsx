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
        <p className={styles.p}> Ingresa los datos</p>
      ) : props.step === 1 ? (
        <p className={styles.p}> Descripcion de tu sistema</p>
      ) : null}
    </div>
  );
}
