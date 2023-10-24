import { useRate } from "@/contexts/RateContext";
import { InputAdornment, TextField } from "@mui/material";
import styles from "./styles.module.css";
import React, { SetStateAction } from "react";

const InputConsumeInformation = () => {
  const {
    consume,
    setConsume,
    kwhPrice,
    setKwhPrice,
    securityRate,
    streetLightingRate,
  } = useRate();

  const kWhValue = 944.2793;

  return (
    <div className={styles.box}>
      <TextField
        label="Consumo mensual"
        id="outlined-start-adornment"
        sx={{
          m: 1,
          width: "90%",
          borderRadius: "30px",
          backgroundColor: "white",
          "& .MuiInputBase-root": {
            borderRadius: "30px",
            borderColor: "black",
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
          startAdornment: <InputAdornment position="start">kW</InputAdornment>,
        }}
      />

      <TextField
        label="Valor del kW/hr"
        id="outlined-start-adornment"
        sx={{
          m: 1,
          width: "90%",
          borderRadius: "30px",
          backgroundColor: "white",
          "& .MuiInputBase-root": {
            borderRadius: "30px",
            borderColor: "black",
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
            <InputAdornment position="start">kw/hr</InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default InputConsumeInformation;
