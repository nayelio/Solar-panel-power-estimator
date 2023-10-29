import { Button } from "@mui/material";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const ButtonArrayHome = () => {
  const messages = [
    "Estimación precisa de la potencia generada por paneles fotovoltaicos",
    "Aproximación del sistema que necesitas de acuerdo a tus necesidades",
    "Disponibilidad de los datos. Puedes consultar cuando quieras",
    "Estimación de cuánto te cuesta no tener un sistema de paneles fotovoltaicos",
    "Información de los beneficios tributarios para usuarios comerciales",
  ];
  const messageCount = messages.length;
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messageCount);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [messageCount]);
  return (
    <div className={styles.container}>
      <div className={styles.pContainer}>
        <p className={styles.pLine}>
          ¡Qué ofrecemos? <div className={styles.line} />
        </p>
        <p className={styles.p}>{messages[messageIndex]}</p>
      </div>
    </div>
  );
};

export default ButtonArrayHome;
