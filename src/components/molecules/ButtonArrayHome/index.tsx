import { Button } from "@mui/material";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";

const ButtonArrayHome = () => {
  const messages = [
    "Toda estimación se vale de precisión gracias a las fuentes de datos usadas",
    "El sistema generado se adapta a tus condiciones reales",
    "Puedes consultar cuando quieras y donde quieras",
  ];
  const messageCount = messages.length;
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messageCount);
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, [messageCount]);
  return (
    <div className={styles.container}>
      <div className={styles.pContainer}>
        <p className={styles.p}>{messages[messageIndex]}</p>
      </div>
    </div>
  );
};

export default ButtonArrayHome;
