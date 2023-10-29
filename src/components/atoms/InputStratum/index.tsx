import { usePosition } from "@/contexts/PositionContext";
import { InputAdornment, TextField } from "@mui/material";
import styles from "./styles.module.css";
export default function InputStratum() {
  const { stratum, setStratum } = usePosition();
  return (
    <div className={styles.box}>
      <TextField
        label="Estrato socioeconomico"
        id="filled-start-adornment"
        variant="filled"
        sx={{
          m: 1,
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
