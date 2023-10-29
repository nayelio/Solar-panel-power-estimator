/* eslint-disable @next/next/no-img-element */
import { Button } from "@mui/material";
import styles from "./styles.module.css";

const NavBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.img}>
        <img src="/logo.png" alt="" width="30%" />
      </div>
      <div className={styles.bttn}>
        <a href="#">
          <Button
            className={styles.bttn}
            sx={{
              width: "100%",
              borderRadius: "10px",
              backgroundColor: "#185aa6",
              color: "white",
              border: "1px solid",
              height: "40%",
            }}
          >
            {" "}
            Realiza la encuesta
          </Button>
        </a>
      </div>
    </div>
  );
};

export default NavBar;
