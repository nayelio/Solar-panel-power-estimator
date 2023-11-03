/* eslint-disable @next/next/no-img-element */
import { Button } from "@mui/material";
import styles from "./styles.module.css";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.img}>
        <img src="/logo.png" alt="" width="30%" />
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
  );
};

export default NavBar;
