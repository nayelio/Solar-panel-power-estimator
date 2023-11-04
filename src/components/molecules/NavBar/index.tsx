/* eslint-disable @next/next/no-img-element */
import { Button, useMediaQuery } from "@mui/material";
import styles from "./styles.module.css";
import Link from "next/link";

const NavBar = () => {
  const isMobile = useMediaQuery("(max-width: 480px)");
  return (
    <div className={styles.container}>
      {isMobile ? (
        <div className={styles.body}>
          <div className={styles.img}>
            <img src="/logo.png" alt="" className={styles.img2} />
          </div>
          <div className={styles.bttn}>
            <Link
              href="https://forms.office.com/r/QutHLKvx0b?origin=lprLink"
              target="_blank"
            >
              <Button
                className={styles.bttn}
                sx={{
                  borderRadius: "10px",
                  fontSize: "50%",
                  width: "100%",
                  backgroundColor: "#00F536",
                  color: "black",
                  border: "1px solid",
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
          <div className={styles.img}>
            <img src="/logo.png" alt="" className={styles.img2} />
          </div>
          <div className={styles.bttn}>
            <Link
              href="https://forms.office.com/r/QutHLKvx0b?origin=lprLink"
              target="_blank"
            >
              <Button
                className={styles.bttn}
                sx={{
                  width: "100%",
                  borderRadius: "10px",
                  height: "10%",
                  backgroundColor: "#00F536",
                  color: "black",
                  border: "1px solid",
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

export default NavBar;
