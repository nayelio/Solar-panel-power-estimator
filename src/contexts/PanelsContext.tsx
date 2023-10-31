import { generatePanels } from "@/helpers/panels";
import request, { myApis } from "@/helpers/request";
import { Inverters } from "@/helpers/request/types";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useMemo } from "react";
import { usePosition } from "./PositionContext";
import { useRate } from "./RateContext";

type PanelContextType = {
  inverterToUse: Inverters | null;
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
    queryFn: () => request<Inverters[]>(myApis.inverterDB),
    queryKey: [myApis.inverterDB],
  });

  const inverterToUse = useMemo(() => {
    if (!panelToUse) return null;
    const systemSize = panels.length * 0.6 * panelToUse.Power;

    const selectedInverter = listInverter
      ?.sort((a, b) => a.Power - b.Power)
      .find((inverter) => inverter.Power > systemSize);
    return selectedInverter ?? null;
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
