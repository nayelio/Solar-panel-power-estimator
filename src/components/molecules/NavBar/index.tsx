import { Button } from "@mui/material";
import styles from "./styles.module.css";

const NavBar = () => {
  return (
    <div className={styles.container}>
      <Button
        color="primary"
        disabled={false}
        size="small"
        variant="contained"
        sx={{
          width: "12%",
          height: "100%",
          borderRadius: "10px",
          backgroundColor: "#fff",
          color: "#000",
        }}
        onClick={() => {}}
      >
        {" "}
        Sobre nosotros
      </Button>
    </div>
  );
};

export default NavBar;
