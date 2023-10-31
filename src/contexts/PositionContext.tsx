import request from "@/helpers/request";
import { SunData } from "@/helpers/request/types";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useMemo, useState } from "react";

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
  stratum: number | null;
  setStratum: React.Dispatch<React.SetStateAction<number | null>>;
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
  stratum: null,
  setStratum: () => {},
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
  const [stratum, setStratum] = useState<number | null>(0);

  const { data: nasaData } = useQuery<SunData>({
    queryFn: () => request(apiMaps(position!.lat, position!.lng)),
    queryKey: ["ApiMaps", position?.lat, position?.lng],
    enabled: Boolean(position),
  });

  const sunData = useMemo(() => {
    return nasaData?.properties.parameter["ALLSKY_SFC_SW_DWN"] ?? null;
  }, [nasaData?.properties.parameter]);

  const value = useMemo(
    () => ({
      position,
      setPosition,
      area,
      setArea,
      perimeter,
      setPerimeter,
      sunData,
      stratum,
      setStratum,
      polygons,
      setPolygons,
      showInput,
      setShowInput,
    }),
    [area, perimeter, polygons, position, showInput, stratum, sunData]
  );

  return (
    <PositionContext.Provider value={value}>
      {children}
    </PositionContext.Provider>
  );
};

export const usePosition = () => useContext(PositionContext);
