/* eslint-disable @next/next/no-img-element */
import NavBar from "@/components/molecules/NavBar";
import Background from "@/assets/svgs/background.svg";
import styles from "./styles.module.css";
import InfoConsume from "@/components/molecules/InfoConsume";
import InfoLocation from "@/components/molecules/InfoLocation";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.bgContainer}>
        <Background />
      </div>
      <div className={styles.body}>
        <NavBar />
        <img
          src="/image_landing.png"
          alt=""
          width="80%"
          className={styles.image}
        />
        <InfoConsume />
        <InfoLocation />
      </div>
    </div>
  );
};

export default Home;
