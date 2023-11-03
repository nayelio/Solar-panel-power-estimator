/* eslint-disable @next/next/no-img-element */
import NavBar from "@/components/molecules/NavBar";
import Background from "@/assets/svgs/background.svg";
import styles from "./styles.module.css";
import InfoConsume from "@/components/molecules/InfoConsume";
import InfoLocation from "@/components/molecules/InfoLocation";
import ButtonArrayHome from "@/components/molecules/ButtonArrayHome";
import { Button } from "@mui/material";
import Link from "next/link";
import InfoForm from "@/components/molecules/infoForm";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <NavBar />
        <h1 className={styles.h1}>
          EL SOL BRILLA, TU FACTURA{" "}
          <span className={styles.span}>DISMINUYE</span>{" "}
        </h1>
        <div className={styles.body2}>
          <img
            src="/image_landing.png"
            alt=""
            width="55%"
            className={styles.image}
          />
          <div className={styles.bttn}>
            <Link href="/aboutUs">
              <Button
                color="primary"
                disabled={false}
                size="small"
                variant="contained"
                sx={{
                  width: "100%",
                  height: "90%",
                  borderRadius: "10px",
                  backgroundColor: "#185aa6",
                  color: "#fff",
                }}
              >
                {" "}
                Sobre nosotros
              </Button>
            </Link>
          </div>
          <ButtonArrayHome />
        </div>
        <InfoConsume />
        <InfoLocation />
        <InfoForm />
      </div>
    </div>
  );
};

export default Home;
