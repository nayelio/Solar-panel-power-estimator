import { useRate } from "@/contexts/RateContext";
import { InputAdornment, TextField, useMediaQuery } from "@mui/material";
import styles from "./styles.module.css";

const InputConsumeInformation = () => {
  const isMobile = useMediaQuery("(max-width: 480px)");
  const { consume, setConsume, kwhPrice, setKwhPrice } = useRate();

  return (
    <div
      className={styles.box}
      style={{
        flexDirection: isMobile ? "column" : "row",
        width: isMobile ? "100%" : undefined,
      }}
    >
      <TextField
        label="Consumo mensual"
        id="filled-start-adornment"
        variant="filled"
        className={styles.textField}
        sx={{
          m: 1,
          width: "90%",
          borderRadius: "10px",
          backgroundColor: "white",
          "& .MuiInputBase-root": {
            borderRadius: "10px",
            borderColor: "black",
            backgroundColor: "white",
          },
          "& .MuiInputBase-input": {
            borderRadius: "10px",
            backgroundColor: "white",
          },
          "& .MuiFormLabel-root": {
            color: "#185aa6",
            fontWeight: "bold",
          },
        }}
        value={consume?.toString()}
        type="number"
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          if (isNaN(value)) {
            setConsume(0);
          } else {
            setConsume(value);
          }
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">kWh</InputAdornment>,
        }}
        InputLabelProps={{
          classes: {
            root: styles.mobileLabel, // Asocia la clase de estilo
          },
        }}
        inputProps={{
          min: 0,
          max: 6,
        }}
      />

      <TextField
        label="Valor del la tarifa"
        id="filled-start-adornment"
        variant="filled"
        color="primary"
        className={styles.textField}
        sx={{
          m: 1,
          width: "90%",
          borderRadius: "10px",
          backgroundColor: "white",
          "& .MuiInputBase-root": {
            borderRadius: "10px",
            borderColor: "black",
            backgroundColor: "white",
          },
          "& .MuiInputBase-input": {
            borderRadius: "10px",
            backgroundColor: "white",
          },
          "& .MuiFormLabel-root": {
            color: "#185aa6",
            fontWeight: "bold",
          },
        }}
        InputLabelProps={{
          classes: {
            root: styles.mobileLabel, // Asocia la clase de estilo
          },
        }}
        value={kwhPrice?.toString()}
        type="number"
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          if (isNaN(value)) {
            setKwhPrice(0);
          } else {
            setKwhPrice(value);
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">$/kWh</InputAdornment>
          ),
        }}
        inputProps={{
          min: 0,
          max: 6,
        }}
      />
    </div>
  );
};

export default InputConsumeInformation;
