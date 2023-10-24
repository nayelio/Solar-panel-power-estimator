/* eslint-disable @next/next/no-img-element */
import NavBar from "@/components/molecules/NavBar";
import Background from "@/assets/svgs/background.svg";
import styles from "./styles.module.css";
import InfoConsume from "@/components/molecules/InfoConsume";
import InfoLocation from "@/components/molecules/InfoLocation";
import ButtonArrayHome from "@/components/molecules/ButtonArrayHome";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.bgContainer}>
        <Background />
      </div>
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
            width="60%"
            className={styles.image}
          />
          <ButtonArrayHome />
        </div>
        <InfoConsume />
        <InfoLocation />
      </div>
    </div>
  );
};

export default Home;
