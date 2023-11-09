import { usePosition } from "@/contexts/PositionContext";
import { InputAdornment, TextField, useMediaQuery } from "@mui/material";
import styles from "./styles.module.css";
export default function InputStratum() {
  const { stratum, setStratum } = usePosition();
  const isMobile = useMediaQuery("(max-width: 480px)");

  return (
    <div
      className={styles.box}
      style={
        isMobile
          ? {
              width: "100%",
            }
          : undefined
      }
    >
      <TextField
        label="Estrato socioeconomico"
        id="filled-start-adornment"
        variant="filled"
        sx={{
          m: isMobile ? undefined : 1,
          marginTop: isMobile ? 1 : undefined,
          width: "100%",
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
          borderBotton: 0,
        }}
        value={stratum?.toString()}
        type="number"
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          if (isNaN(value)) {
            setStratum(0);
          } else {
            setStratum(value);
          }
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start"></InputAdornment>,
        }}
      />
    </div>
  );
}
