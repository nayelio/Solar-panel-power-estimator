import { RectangleProps } from "@react-google-maps/api";
import React, { createContext, useContext, useMemo, useState } from "react";

export type Position = {
  lat: number;
  lng: number;
};

type PositionContextType = {
  position: Position | null;
  setPosition: React.Dispatch<React.SetStateAction<Position | null>>;
  area: number;
  setArea: React.Dispatch<React.SetStateAction<number>>;
  perimeter: number;
  setPerimeter: React.Dispatch<React.SetStateAction<number>>;
  panels: RectangleProps["bounds"][];
  setPanels: React.Dispatch<React.SetStateAction<RectangleProps["bounds"][]>>;
  polygon: google.maps.Polygon[];
  setPolygon: React.Dispatch<React.SetStateAction<google.maps.Polygon[]>>;
};

const PositionContext = createContext<PositionContextType>({
  position: null,
  setPosition: () => {},
  area: 0,
  setArea: () => {},
  perimeter: 0,
  setPerimeter: () => {},
  panels: [],
  setPanels: () => {},
  polygon: [],
  setPolygon: () => {},
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
  const [panels, setPanels] = useState<RectangleProps["bounds"][]>([]);
  const [polygon, setPolygon] = useState<google.maps.Polygon[]>([]);

  const value = useMemo(
    () => ({
      position,
      setPosition,
      area,
      setArea,
      perimeter,
      setPerimeter,
      panels,
      setPanels,
      polygon,
      setPolygon,
      showInput,
      setShowInput,
    }),
    [area, panels, perimeter, polygon, position, showInput]
  );

  return (
    <PositionContext.Provider value={value}>
      {children}
    </PositionContext.Provider>
  );
};

export const usePosition = () => useContext(PositionContext);
