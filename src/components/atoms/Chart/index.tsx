import { usePanel } from "@/contexts/PanelsContext";
import { usePosition } from "@/contexts/PositionContext";
import { useRate } from "@/contexts/RateContext";
import { Skeleton } from "@mui/material";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
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
  const { inverterToUse } = usePanel();

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
          label: "Energía promedio generada por mes (kWh)",
          data: Object.keys(mediaByMonth)
            .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
            .map((item) => mediaByMonth[item] * inverterToUse?.Power! * 30),
          backgroundColor: "#7DAFB0",
        },
      ],
    };
  }, [inverterToUse?.Power, sunData]);

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
