import React, { useMemo } from "react";
import styles from "./styles.module.css";
import { Button } from "@mui/material";
import { TrendingUp, WidthFull } from "@mui/icons-material";
import { useRate } from "@/contexts/RateContext";
import { usePosition } from "@/contexts/PositionContext";
interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  step: number;
}
export default function Buttons(props: Props) {
  const { consume, kwhPrice } = useRate();
  const { position, area } = usePosition();

  const disableNextStep = useMemo(() => {
    if (props.step === 0 && (!consume || !kwhPrice)) return true;
    if (props.step === 1 && !position) return true;
    if (props.step === 2 && !area) return true;
    if (props.step === 3) return true;
  }, [consume, kwhPrice, props.step, position, area]);

  const disablePrevStep = useMemo(() => {
    if (props.step === 0) return true;
  }, [props.step]);
  return (
    <div className={styles.container}>
      <Button
        color="primary"
        size="small"
        variant="outlined"
        disabled={disablePrevStep}
        sx={{
          width: "10%",
          height: "50%",
          borderRadius: "30px",
          backgroundColor: "white",
          color: "black",
          border: "1px solid",
        }}
        onClick={() => {
          props.setStep((prev) => prev - 1);
        }}
      >
        Anterior
      </Button>
      <Button
        color="primary"
        size="small"
        variant="contained"
        disabled={disableNextStep}
        sx={{
          width: "10%",
          height: "50%",
          borderRadius: "30px",
          backgroundColor: "#324E76",
          color: "white",
          border: "1px solid",
        }}
        onClick={() => {
          props.setStep((prev) => prev + 1);
        }}
      >
        {" "}
        Siguiente
      </Button>
    </div>
  );
}
