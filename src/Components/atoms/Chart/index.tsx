import { useState } from "react";

import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { AxisOptions } from "react-charts";
import { Position } from "@/pages";

const ChartComponent = dynamic(
  () => import("react-charts").then((mod) => mod.Chart),
  {
    ssr: false,
  }
);

type Props = {
  position: Position;
};

type Data = {
  series: number;
  dataType: string;
  label: string;
  data: Item[];
};

type Item = {
  primary: string;
  secondary: number;
};

const Chart = ({ position }: Props) => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(false);

  const onSearch = async () => {
    setLoading(true);
    if (position === null) return;
    const rest = await fetch(
      `https://power.larc.nasa.gov/api/temporal/monthly/point?start=2020&end=2020&latitude=${position.lat}&longitude=${position.lng}&community=ag&parameters=ALLSKY_SFC_SW_DIFF&format=json&user=nayeli&header=true`
    );
    const response = await rest.json();
    var list = Object.values(response.properties.parameter.ALLSKY_SFC_SW_DIFF);
    console.log(list);
    setData({
      series: 1,
      dataType: "ordinal",
      label: "grafip",
      data: list.map((item, index) => ({
        primary: index.toString(),
        secondary: item as number,
      })),
    });
    setLoading(false);
  };

  useEffect(() => {
    onSearch();
  }, [position]);

  const primaryAxis = React.useMemo(
    (): AxisOptions<Item> => ({
      getValue: (datum) => datum.primary,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<Item>[] => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    []
  );

  if (!data) return null;
  return (
    <div style={{ height: "100%", width: "40%", padding: "100px" }}>
      <ChartComponent
        options={{
          data: [data],
          primaryAxis,
          secondaryAxes,
        }}
      />
    </div>
  );
};

export default Chart;
