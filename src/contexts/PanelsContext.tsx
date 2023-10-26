import { generatePanels } from "@/helpers/panels";
import React, { createContext, useContext, useMemo, useState } from "react";
import request, { ApiEnum } from "@/helpers/request";
import { useQuery } from "@tanstack/react-query";
import { Inverters, SunData } from "@/helpers/request/types";
import { useRate } from "./RateContext";
import { usePosition } from "./PositionContext";

type PanelContextType = {
  inverterToUse: Inverters | null | undefined;
  panels: {
    lat: number;
    lng: number;
  }[][];
};

const PanelContext = createContext<PanelContextType>({
  inverterToUse: null,
  panels: [],
});

export const PanelProvider = ({ children }: { children: React.ReactNode }) => {
  const { panelToUse, panelQuantity } = useRate();
  const { polygons } = usePosition();
  const panels = useMemo(
    () =>
      polygons
        .flatMap((item) => generatePanels(item) ?? [])
        .filter((item, index) => index < (panelQuantity ?? 0)) ?? [],
    [panelQuantity, polygons]
  );
  const { data: listInverter } = useQuery({
    queryFn: () => request<Inverters[]>(ApiEnum.InverterDB),
    queryKey: [ApiEnum.InverterDB],
  });

  const inverterToUse = useMemo(() => {
    if (!panelToUse) return null;
    const systemSize = panels.length * 0.8 * panelToUse.Power;
    console.log(systemSize);
    const selectedInverter = listInverter!
      .sort((a, b) => a.Power - b.Power)
      .find((inverter) => inverter.Power > systemSize);
    return selectedInverter;
  }, [listInverter, panelToUse, panels.length]);

  const value = useMemo(
    () => ({
      inverterToUse,
      panels,
    }),
    [inverterToUse, panels]
  );

  return (
    <PanelContext.Provider value={value}>{children}</PanelContext.Provider>
  );
};

export const usePanel = () => useContext(PanelContext);
