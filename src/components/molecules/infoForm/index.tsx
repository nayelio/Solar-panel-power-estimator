/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "./styles.module.css";
import { Button, useMediaQuery } from "@mui/material";

const InfoForm = () => {
  const isMobile = useMediaQuery("(max-width: 480px)");
  return (
    <div className={styles.container}>
      {isMobile ? (
        <div className={styles.body}>
          <Link href="https://forms.office.com/r/QutHLKvx0b?origin=lprLink">
            <img src="/answer2.png" alt="" width="80%" />
          </Link>
          <div className={styles.textContainer}>
            <h1 className={styles.h1}>Responde la encuesta</h1>
            <p className={styles.p}>
              Dejanos saber qué piensas de la página web y su contenido. Realiza
              la encuentra dando click en el botón
            </p>
            <Link
              href="https://forms.office.com/r/QutHLKvx0b?origin=lprLink"
              target="_blank"
            >
              <Button
                className={styles.bttn}
                sx={{
                  width: "70%",
                  borderRadius: "10px",
                  backgroundColor: "#fff",
                  color: "black",
                  border: "1px solid",
                  marginBlock: "5%",
                  marginInline: "15%",
                  "& .MuiButton-root": { width: "100%" },
                }}
              >
                Realiza la encuesta
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.body}>
          <Link href="https://forms.office.com/r/QutHLKvx0b?origin=lprLink">
            <img src="/answer2.png" alt="" width="100%" />
          </Link>
          <div className={styles.textContainer}>
            <h1 className={styles.h1}>Responde la encuesta</h1>
            <p className={styles.p}>
              Dejanos saber qué piensas de la página web y su contenido. Realiza
              la encuentra dando click en el botón
            </p>
            <Link
              href="https://forms.office.com/r/QutHLKvx0b?origin=lprLink"
              target="_blank"
            >
              <Button
                className={styles.bttn}
                sx={{
                  width: "50%",
                  borderRadius: "10px",
                  backgroundColor: "#fff",
                  color: "black",
                  border: "1px solid",
                  marginBlock: "5%",
                  justifyContent: "center",
                  "& .MuiButton-root": { width: "100%" },
                }}
              >
                Realiza la encuesta
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoForm;
