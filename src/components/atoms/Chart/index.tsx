import { useRef, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { Position } from "@/pages";

type Props = {
  position: Position | null;
};

type Data = {
  labels: string[];
  datasets: [{ label: string; data: number[]; backgroundColor: string }];
};

const Chart = ({ position }: Props) => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(false);
  const barRef = useRef<null>(null);

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
  const onSearch = async () => {
    setLoading(true);
    if (position === null) return;
    const rest = await fetch(
      `https://power.larc.nasa.gov/api/temporal/monthly/point?start=2020&end=2022&latitude=${position.lat}&longitude=${position.lng}&community=ag&parameters=ALLSKY_SFC_SW_DWN&format=json&user=nayeli&header=true`
    );
    const response = await rest.json();
    console.log(response);
    if (!response) return alert("Error");
    const list = response.properties.parameter["ALLSKY_SFC_SW_DWN"];

    let valuesByMonth: Record<string, number[]> = {};

    for (var name in list) {
      const mes = name.substring(4, 6);
      const prevValue = valuesByMonth[mes] ?? [];
      valuesByMonth[mes] = [...prevValue, list[name]];
    }

    let mediaByMonth: Record<string, number> = {};
    for (var mes in valuesByMonth) {
      const totalByMonth = valuesByMonth[mes].reduce(
        (acc, curr) => acc + curr,
        0
      );
      mediaByMonth[mes] = totalByMonth / valuesByMonth[mes].length;
    }
    setData({
      labels,
      datasets: [
        {
          label: "Meses",
          data: Object.values(mediaByMonth),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    });
    setLoading(false);
  };

  useEffect(() => {
    onSearch();
  }, [position]); //if position changed onSearch will be executed
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Power estimator data",
      },
    },
  };

  if (!data) return null;
  return (
    <div style={{ height: "100%", width: "40%", padding: "100px" }}>
      <Bar options={options} data={data} ref={barRef} />
    </div>
  );
};

export default Chart;
