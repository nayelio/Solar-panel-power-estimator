import React, { useMemo } from "react";
import styles from "./styles.module.css";
import { Button } from "@mui/material";
import { TrendingUp, WidthFull } from "@mui/icons-material";
import { useRate } from "@/contexts/RateContext";
import { usePosition } from "@/contexts/PositionContext";
import { usePanel } from "@/contexts/PanelsContext";

export default function Buttons() {
  const { consume, kwhPrice } = useRate();
  const { polygons, setPolygons } = usePosition();
  const { panels } = usePanel();

  return (
    <div className={styles.container}>
      <Button
        color="primary"
        size="small"
        variant="outlined"
        sx={{
          width: "50%",
          borderRadius: "10px",

          backgroundColor: "white",
          color: "black",
          "&:hover": {
            backgroundColor: "#000",
          },
        }}
        onClick={() => {
          polygons.forEach((e) => e.getPath().clear());
          setPolygons([]);
          panels;
        }}
      >
        Borrar área
      </Button>
    </div>
  );
}
