import type { AppProps } from "next/app";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { AxisOptions } from "react-charts";
import React from "react";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-charts").then((mod) => mod.Chart), {
  ssr: false,
});

type Data = {
  label: string;
  data: Item[];
};

type Item = {
  index: number;
  data: number;
};

export default function App({ Component, pageProps }: AppProps) {
  const [longitude, setLongitude] = useState("1");
  const [latitude, setLatitude] = useState("1");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Data | null>(null);

  const onSearch = async () => {
    setLoading(true);
    const rest = await fetch(
      `https://power.larc.nasa.gov/api/temporal/monthly/point?start=2020&end=2020&latitude=${latitude}&longitude=${longitude}&community=ag&parameters=ALLSKY_SFC_SW_DIFF&format=json&user=nayeli&header=true`
    );
    const response = await rest.json();
    var list = Object.values(response.properties.parameter.ALLSKY_SFC_SW_DIFF);
    console.log(list);
    setData({
      label: "grafip",
      data: list.map((item, index) => ({
        index,
        data: item as number,
      })),
    });
    setLoading(false);
  };

  const primaryAxis = React.useMemo(
    (): AxisOptions<Item> => ({
      getValue: (datum) => datum.index,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<Item>[] => [
      {
        getValue: (datum) => datum.data,
      },
    ],
    []
  );

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Latitude"
        variant="outlined"
        value={latitude}
        onChange={(e) => {
          setLatitude(e.target.value);
        }}
      />
      <TextField
        id="outlined-basic"
        label="Longitude"
        variant="outlined"
        value={longitude}
        onChange={(e) => {
          setLongitude(e.target.value);
        }}
      />
      <Button variant="contained" disabled={loading} onClick={onSearch}>
        Search
      </Button>
      {data != null && (
        <div style={{ height: 300 }}>
          <Chart
            options={{
              data: [data],
              primaryAxis,
              secondaryAxes,
            }}
          />
        </div>
      )}
    </div>
  );
}
