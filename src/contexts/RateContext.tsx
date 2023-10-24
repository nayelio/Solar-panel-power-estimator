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

  systemPrice: number | null;
  panelQuantity: number | null;
  setTown: React.Dispatch<React.SetStateAction<string | null>>;
  setConsume: React.Dispatch<React.SetStateAction<number | null>>;
  setKwhPrice: React.Dispatch<React.SetStateAction<number | null>>;
  setSunByDay: React.Dispatch<React.SetStateAction<number | null>>;
};

const RateContext = createContext<RateContextType>({
  securityRate: null,
  streetLightingRate: null,
  kwhPrice: 944.21,
  consume: null,
  sunByDay: 0,
  power: 0,
  price: 0,
  panelQuantity: null,
  panelsRealValue: undefined,
  systemPrice: 0,
  setTown: () => {},
  setConsume: () => {},
  setKwhPrice: () => {},
  setSunByDay: () => {},
});

export const RateProvider = ({ children }: { children: React.ReactNode }) => {
  const [town, setTown] = useState<string | null>(null);
  const [consume, setConsume] = useState<number | null>(null);
  const [kwhPrice, setKwhPrice] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [power, setPower] = useState<number | null>(null);
  const [sunByDay, setSunByDay] = useState<number | null>(null);

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
  const { data: listInverter } = useQuery({
    queryFn: () => request<Inverters[]>(ApiEnum.InverterDB),
    queryKey: [ApiEnum.InverterDB],
  });

  const securityRate = useMemo(() => {
    return getRate(securityData, consume, town);
  }, [securityData, town, consume]);

  const streetLightingRate = useMemo(() => {
    return getRate(streetLightingData, consume, town);
  }, [streetLightingData, town, consume]);

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

  const panelQuantity = useMemo(() => {
    if (consume == null) return null;
    return Math.ceil(consume / panelsRealValue?.[2]?.value!);
  }, [consume, panelsRealValue]);

  const systemPrice = useMemo(() => {
    const priceEstimate = panelsRealValue?.[0]?.Price! * (panelQuantity ?? 0);
    return priceEstimate;
  }, [panelQuantity, panelsRealValue]);

  const inverterToUse = listInverter?.map((inverter) => ({
    ...inverter,
    value: inverter.Power,
  }));
  const value = useMemo(
    () => ({
      securityRate,
      streetLightingRate,
      kwhPrice,
      listPanels,
      price,
      power,
      sunByDay,
      consume,
      systemPrice,
      panelsRealValue,
      panelQuantity,
      setTown,
      setConsume,
      setKwhPrice,
      setSunByDay,
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
      consume,
    ]
  );

  return <RateContext.Provider value={value}>{children}</RateContext.Provider>;
};

export const useRate = () => useContext(RateContext);
