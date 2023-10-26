import { getRate } from "@/helpers";
import request, { ApiEnum } from "@/helpers/request";
import {
  Inverters,
  Panels,
  SecurityRate,
  StreetLighting,
} from "@/helpers/request/types";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useMemo, useState } from "react";
import { usePosition } from "./PositionContext";

type RateContextType = {
  securityRate: SecurityRate | null;
  streetLightingRate: StreetLighting | null;
  kwhPrice: number | null;
  consume: number | null;
  price: number | null;
  power: number | null;
  sunByDay: number | null;
  panelsRealValue:
    | {
        area: number;
        Efficiency: number;
        value: number;
        Id: number;
        Power: number;
        Price: number;
      }[]
    | undefined;
  panelToUse: Panels | null;
  systemPrice: number | null;
  panelQuantity: number | null;
  setTown: React.Dispatch<React.SetStateAction<string | null>>;
  setConsume: React.Dispatch<React.SetStateAction<number | null>>;
  setKwhPrice: React.Dispatch<React.SetStateAction<number | null>>;
};

const RateContext = createContext<RateContextType>({
  securityRate: null,
  streetLightingRate: null,
  kwhPrice: 944.21,
  consume: null,
  sunByDay: 0,
  power: 0,
  price: 0,
  panelToUse: null,
  panelQuantity: null,
  panelsRealValue: undefined,
  systemPrice: 0,
  setTown: () => {},
  setConsume: () => {},
  setKwhPrice: () => {},
});

export const RateProvider = ({ children }: { children: React.ReactNode }) => {
  const [town, setTown] = useState<string | null>(null);
  const [consume, setConsume] = useState<number | null>(null);
  const [kwhPrice, setKwhPrice] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [power, setPower] = useState<number | null>(null);
  const { sunData } = usePosition();
  const { data: listPanels } = useQuery({
    queryFn: () => request<Panels[]>(ApiEnum.PanelsDB),
    queryKey: [ApiEnum.PanelsDB],
  });

  const { data: securityData } = useQuery({
    queryFn: () => request<SecurityRate[]>(ApiEnum.SecurityRates),
    queryKey: [ApiEnum.SecurityRates],
  });

  const { data: streetLightingData } = useQuery({
    queryFn: () => request<StreetLighting[]>(ApiEnum.StreetLightings),
    queryKey: [ApiEnum.StreetLightings],
  });

  const securityRate = useMemo(() => {
    return getRate(securityData, consume, town);
  }, [securityData, town, consume]);

  const streetLightingRate = useMemo(() => {
    return getRate(streetLightingData, consume, town);
  }, [streetLightingData, town, consume]);

  const sunByDay = useMemo(() => {
    let valuesByMonth: Record<string, number[]> = {};

    for (var name in sunData) {
      const mes = name.substring(4, 6);
      const prevValue = valuesByMonth[mes] ?? [];
      valuesByMonth[mes] = [...prevValue, sunData[name]];
    }

    let mediaByMonth: Record<string, number> = {};
    for (var mes in valuesByMonth) {
      const totalByMonth = valuesByMonth[mes].reduce(
        (acc, curr) => acc + curr,
        0
      );
      mediaByMonth[mes] = totalByMonth / valuesByMonth[mes].length;
    }
    const wattsPerDay =
      Object.values(mediaByMonth).reduce((acc, curr) => acc + curr, 0) / 12;
    return wattsPerDay;
  }, [sunData]);

  const panelsRealValue = listPanels?.map((panel) => ({
    ...panel,
    value:
      (panel.Power / 1000) *
      panel.Efficiency *
      (sunByDay ?? 0) *
      30 *
      (panel.Width * panel.Height),
    area: panel.Width * panel.Height,
  }));

  const panelToUse = panelsRealValue?.[2] ?? null;
  const panelQuantity = useMemo(() => {
    if (consume == null) return null;
    return Math.ceil(consume / panelToUse?.value!);
  }, [consume, panelToUse]);

  const systemPrice = useMemo(() => {
    const priceEstimate = panelToUse?.Price! * (panelQuantity ?? 0);
    return priceEstimate;
  }, [panelQuantity, panelToUse]);

  const value = useMemo(
    () => ({
      securityRate,
      streetLightingRate,
      kwhPrice,
      listPanels,
      price,
      panelToUse,
      power,
      sunByDay,
      consume,
      systemPrice,
      panelsRealValue,
      panelQuantity,
      setTown,
      setConsume,
      setKwhPrice,
    }),
    [
      securityRate,
      streetLightingRate,
      kwhPrice,
      sunByDay,
      systemPrice,
      panelQuantity,
      panelsRealValue,
      listPanels,
      price,
      power,
      panelToUse,
      consume,
    ]
  );

  return <RateContext.Provider value={value}>{children}</RateContext.Provider>;
};

export const useRate = () => useContext(RateContext);
