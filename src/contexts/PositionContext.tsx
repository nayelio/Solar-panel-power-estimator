import { generatePanels } from "@/helpers/panels";
import React, { createContext, useContext, useMemo, useState } from "react";
import request, { ApiEnum } from "@/helpers/request";
import { useQuery } from "@tanstack/react-query";
import { SunData } from "@/helpers/request/types";

export type Position = {
  lat: number;
  lng: number;
};

const apiMaps = (lat: number, lng: number) =>
  `https://power.larc.nasa.gov/api/temporal/monthly/point?start=2020&end=2022&latitude=${lat}&longitude=${lng}&community=re&parameters=ALLSKY_SFC_SW_DWN&format=json&user=nayeli&header=true`;
type PositionContextType = {
  position: Position | null;
  setPosition: React.Dispatch<React.SetStateAction<Position | null>>;
  area: number;
  setArea: React.Dispatch<React.SetStateAction<number>>;
  perimeter: number;
  setPerimeter: React.Dispatch<React.SetStateAction<number>>;
  sunData: Record<string, number> | null;
  polygons: google.maps.Polygon[];
  setPolygons: React.Dispatch<React.SetStateAction<google.maps.Polygon[]>>;
};

const PositionContext = createContext<PositionContextType>({
  position: null,
  setPosition: () => {},
  area: 0,
  setArea: () => {},
  perimeter: 0,
  setPerimeter: () => {},
  sunData: null,
  polygons: [],
  setPolygons: () => {},
});

export const PositionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [position, setPosition] = useState<Position | null>(null);
  const [area, setArea] = useState(0);
  const [perimeter, setPerimeter] = useState(0);
  const [showInput, setShowInput] = useState(true);
  const [polygons, setPolygons] = useState<google.maps.Polygon[]>([]);
  const [countPanels, setCountPanels] = useState(232);

  const { data: nasaData } = useQuery<SunData>({
    queryFn: () => request(apiMaps(position!.lat, position!.lng)),
    queryKey: ["ApiMaps", position?.lat, position?.lng],
    enabled: Boolean(position),
  });

  const sunData = useMemo(() => {
    return nasaData?.properties.parameter["ALLSKY_SFC_SW_DWN"] ?? null;
  }, [nasaData?.properties.parameter]);
  console.log(sunData);
  const value = useMemo(
    () => ({
      position,
      setPosition,
      area,
      setArea,
      perimeter,
      setPerimeter,
      sunData,

      polygons,
      setPolygons,
      showInput,
      setShowInput,
    }),
    [area, perimeter, polygons, position, showInput, sunData]
  );

  return (
    <PositionContext.Provider value={value}>
      {children}
    </PositionContext.Provider>
  );
};

export const usePosition = () => useContext(PositionContext);
