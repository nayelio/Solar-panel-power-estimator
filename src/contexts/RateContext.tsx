import { getRate } from "@/helpers";
import request, { ApiEnum } from "@/helpers/request";
import { Panels, SecurityRate, StreetLighting } from "@/helpers/request/types";
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
  panelToUse:
    | {
        value: number;
        Id: number;
        Power: number;
        Price: number;
      }
    | null
    | undefined;

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
  power: 0,
  price: 0,
  panelToUse: null,

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
  const { panels } = usePosition();

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

  const panelsRealValue = listPanels?.map((panel) => ({
    ...panel,
    value: (panel.Power / 1000) * 0.2 * (sunByDay ?? 0) * 30,
  }));

  const panelToUse = useMemo(() => {
    if (consume == null) return null;
    const minPower = consume / panels.length;
    console.log(panelsRealValue);
    return panelsRealValue
      ?.filter((panel) => panel.value > minPower)
      .sort((panel1, panel2) => panel1.Price - panel2.Price)?.[0];
  }, [consume, panels.length, panelsRealValue]);

  const value = useMemo(
    () => ({
      securityRate,
      streetLightingRate,
      kwhPrice,
      panelToUse,
      listPanels,
      price,
      power,
      consume,
      setTown,
      setConsume,
      setKwhPrice,
      setSunByDay,
    }),
    [
      securityRate,
      streetLightingRate,
      kwhPrice,
      panelToUse,
      listPanels,
      price,
      power,
      consume,
    ]
  );

  return <RateContext.Provider value={value}>{children}</RateContext.Provider>;
};

export const useRate = () => useContext(RateContext);

//  const systemPrice = useMemo(() => {
//const priceEstimate = (panelToUse?.Price ?? 0) * panels.length;
//return priceEstimate;
//}, [panelToUse?.Price, panels.length]);
