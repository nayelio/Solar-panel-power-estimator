import { Button } from "@mui/material";
import styles from "./styles.module.css";
import { useState } from "react";

const ButtonArrayHome = () => {
  const [inform, setInform] = useState(1);

  return (
    <div className={styles.container}>
      <div className={styles.pContainer}>
        {inform === 1 ? (
          <p className={styles.p}>
            Toda estimación se vale de precisión gracias a las fuentes de datos
            usadas
          </p>
        ) : inform === 2 ? (
          <p className={styles.p}>
            El sistema generado se adapta a tus condiciones reales
          </p>
        ) : inform === 3 ? (
          <p className={styles.p}>
            Puedes consultar cuando quieras y donde quieras
          </p>
        ) : null}
      </div>
      <div className={styles.buttonArray}>
        <Button
          color="primary"
          disabled={false}
          size="small"
          variant="contained"
          sx={{
            width: "30%",
            height: "70%",
            borderRadius: "10px",
            backgroundColor: "#FFF",
            color: "BLACK",
            fontSize: "13px",
            border: "1px solid #FFF",
            "&:hover": { backgroundColor: "#7DAFB0", color: "white" },
          }}
          onClick={() => {
            setInform(() => 1);
          }}
        >
          {" "}
          Precisión
        </Button>
        <Button
          color="primary"
          disabled={false}
          size="small"
          variant="contained"
          sx={{
            width: "30%",
            height: "70%",
            borderRadius: "10px",
            backgroundColor: "#FFF",
            color: "BLACK",
            fontSize: "13px",
            border: "1px solid #FFF",
            "&:hover": { backgroundColor: "#7DAFB0", color: "white" },
          }}
          onClick={() => {
            setInform(() => 2);
          }}
        >
          {" "}
          Adaptabilidad
        </Button>
        <Button
          color="primary"
          disabled={false}
          size="small"
          variant="contained"
          sx={{
            width: "70%",
            height: "70%",
            borderRadius: "10px",
            backgroundColor: "#fff",
            color: "#000",
            fontSize: "13px",
            border: "1px solid #fff",
            "&:hover": { backgroundColor: "#7DAFB0", color: "white" },
            "&:active , &:focus": { backgroundColor: "7DAFB0", color: "white" },
          }}
          onClick={() => {
            setInform(() => 3);
          }}
        >
          {" "}
          Confiabilidad y disponibilidad
        </Button>
      </div>
    </div>
  );
};

export default ButtonArrayHome;
