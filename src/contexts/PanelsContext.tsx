import { generatePanels } from "@/helpers/panels";
import request, { myApis } from "@/helpers/request";
import { Inverters } from "@/helpers/request/types";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useMemo } from "react";
import { usePosition } from "./PositionContext";
import { useRate } from "./RateContext";

type PanelContextType = {
  panels: {
    lat: number;
    lng: number;
  }[][];
  systemPrice: number | null;
};

const PanelContext = createContext<PanelContextType>({
  panels: [],
  systemPrice: null,
});

export const PanelProvider = ({ children }: { children: React.ReactNode }) => {
  const { panelToUse, panelQuantity, consume, sunByDay } = useRate();
  const { polygons } = usePosition();
  const panels = useMemo(
    () =>
      polygons
        .flatMap((item) => generatePanels(item) ?? [])
        .filter((item, index) => index < (panelQuantity ?? 0)) ?? [],
    [panelQuantity, polygons]
  );

  const systemPrice = useMemo(() => {
    const priceEstimate = panelToUse?.Price! * (panels.length ?? 0);
    return priceEstimate;
  }, [panelToUse?.Price, panels.length]);
  const value = useMemo(
    () => ({
      panels,
      systemPrice,
    }),
    [panels, systemPrice]
  );

  return (
    <PanelContext.Provider value={value}>{children}</PanelContext.Provider>
  );
};

export const usePanel = () => useContext(PanelContext);
