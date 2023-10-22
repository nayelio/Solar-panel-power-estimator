import styles from "./styles.module.css";

const NavBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.button}>
        <span className={styles.text}>Sobre nosotros</span>
      </div>
    </div>
  );
};

export default NavBar;
