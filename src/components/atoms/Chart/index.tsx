import { useMemo, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import React, { useEffect } from "react";
import { Position } from "@/pages/_index";
import { usePosition } from "@/contexts/PositionContext";
import { useRate } from "@/contexts/RateContext";
import { Skeleton } from "@mui/material";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export type Data = {
  labels: string[];
  datasets: [{ label: string; data: number[]; backgroundColor: string }];
};
const labels = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const Chart = () => {
  const { position, sunData } = usePosition();
  const { panelQuantity, panelsRealValue, sunByDay } = useRate();

  const data = useMemo(() => {
    let valuesByMonth: Record<string, number[]> = {};

    for (var name in sunData) {
      const mes = name.substring(4, 6);
      const prevValue = valuesByMonth[mes] ?? [];
      valuesByMonth[mes] = [...prevValue, sunData[name]];
    }

    let mediaByMonth: Record<string, number> = {};
    for (var mes in valuesByMonth) {
      const totalByMonth = valuesByMonth[mes].reduce(
        (acc, curr) => acc + curr,
        0
      );
      mediaByMonth[mes] = totalByMonth / valuesByMonth[mes].length;
    }

    return {
      labels,
      datasets: [
        {
          label: "Potencia promedio generada por mes",
          data: Object.keys(mediaByMonth)
            .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
            .map(
              (item) =>
                mediaByMonth[item] *
                ((panelsRealValue?.[2]?.Power! / 1000) *
                  panelsRealValue?.[2]?.Efficiency! *
                  panelQuantity! *
                  panelsRealValue?.[2]?.area!) *
                30
            ),
          backgroundColor: "#7DAFB0",
        },
      ],
    };
  }, [panelQuantity, panelsRealValue, sunData]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Potencia generada por mes",
      },
    },
  };

  if (!data) return <Skeleton variant="rectangular" width={800} height={400} />;
  return (
    <div
      style={{
        height: "100%",
        width: "40%",
        padding: "2%",
        backgroundColor: "#fff",
        borderRadius: "30px",
      }}
    >
      {data ? <Bar options={options} data={data} /> : <Skeleton />}
    </div>
  );
};

export default Chart;
