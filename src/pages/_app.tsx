import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { AxisOptions } from "react-charts";
import React from "react";
import dynamic from "next/dynamic";
import MapContainer from "@/Components/Map";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";

const Chart = dynamic(() => import("react-charts").then((mod) => mod.Chart), {
  ssr: false,
});

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

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setUser(event.target.value as string);
  };
  const [position, setPosition] = useState<null | { lat: number; lng: number }>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Data | null>(null);

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

  useEffect(() => {
    onSearch();
  }, [position]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Tipo de usuario</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={user}
            label="Hola"
            onChange={handleChange}
          >
            <MenuItem value={1}>Usuario Comercial</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <MapContainer
          onChangeLocation={(pos) => {
            setPosition(pos);
          }}
        />
        {data != null && (
          <div style={{ height: 300, width: 500 }}>
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
    </div>
  );
}
