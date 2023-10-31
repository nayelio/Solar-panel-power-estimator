import { getRate } from "@/helpers";
import request, { myApis } from "@/helpers/request";
import { Panels, SecurityRate, StreetLighting } from "@/helpers/request/types";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useMemo, useState } from "react";
import { usePosition } from "./PositionContext";
import { usePanel } from "./PanelsContext";

type RateContextType = {
  securityRate: SecurityRate | null;
  securityRateToUse: number | null;
  streetLightingRate: StreetLighting | null;
  streetLightingRateToUse: number | null;
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
  panelQuantity: number | null;
  setTown: React.Dispatch<React.SetStateAction<string | null>>;
  setConsume: React.Dispatch<React.SetStateAction<number | null>>;
  setKwhPrice: React.Dispatch<React.SetStateAction<number | null>>;
  generatedPowerPerMonth: number | null;
  setGeneratedPowerPerMonth: React.Dispatch<
    React.SetStateAction<null | number>
  >;
};

const RateContext = createContext<RateContextType>({
  securityRate: null,
  securityRateToUse: null,
  streetLightingRate: null,
  streetLightingRateToUse: null,
  kwhPrice: 944.21,
  consume: null,
  sunByDay: 0,
  power: 0,
  price: 0,
  panelToUse: null,
  panelQuantity: null,
  panelsRealValue: undefined,
  setTown: () => {},
  setConsume: () => {},
  setKwhPrice: () => {},
  generatedPowerPerMonth: null,
  setGeneratedPowerPerMonth: () => null,
});

export const RateProvider = ({ children }: { children: React.ReactNode }) => {
  const [town, setTown] = useState<string | null>(null);
  const [consume, setConsume] = useState<number | null>(null);
  const [kwhPrice, setKwhPrice] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [power, setPower] = useState<number | null>(null);
  const [generatedPowerPerMonth, setGeneratedPowerPerMonth] = useState<
    number | null
  >(null);

  const { sunData } = usePosition();
  const { panels } = usePanel();
  const { data: listPanels } = useQuery({
    queryFn: () => request<Panels[]>(myApis.panelsDB),
    queryKey: [myApis.panelsDB],
  });

  const { data: securityData } = useQuery({
    queryFn: () => request<SecurityRate[]>(myApis.securityRates),
    queryKey: [myApis.securityRates],
  });

  const { data: streetLightingData } = useQuery({
    queryFn: () => request<StreetLighting[]>(myApis.streetLightings),
    queryKey: [myApis.streetLightings],
  });

  const securityRate = useMemo(() => {
    return getRate(securityData, consume, town);
  }, [securityData, town, consume]);

  const securityRateToUse = securityRate?.Rate! * 42412;
  const streetLightingRate = useMemo(() => {
    return getRate(streetLightingData, consume, town);
  }, [streetLightingData, town, consume]);

  const streetLightingRateToUse = useMemo(() => {
    if (streetLightingRate?.Town.Name === "Barranquilla") {
      return streetLightingRate.Rate * 42412;
    } else {
      return streetLightingRate?.Rate! * consume! * kwhPrice!;
    }
  }, [
    consume,
    kwhPrice,
    streetLightingRate?.Rate,
    streetLightingRate?.Town.Name,
  ]);

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

  console.log(panels);
  const value = useMemo(
    () => ({
      securityRate,
      securityRateToUse,
      streetLightingRate,
      streetLightingRateToUse,
      kwhPrice,
      listPanels,
      price,
      panelToUse,
      power,
      sunByDay,
      consume,

      panelsRealValue,
      panelQuantity,
      setTown,
      setConsume,
      setKwhPrice,
      generatedPowerPerMonth,
      setGeneratedPowerPerMonth,
    }),
    [
      securityRate,
      securityRateToUse,
      streetLightingRate,
      streetLightingRateToUse,
      kwhPrice,
      listPanels,
      price,
      panelToUse,
      power,
      sunByDay,
      consume,
      panelsRealValue,
      panelQuantity,
      generatedPowerPerMonth,
    ]
  );

  return <RateContext.Provider value={value}>{children}</RateContext.Provider>;
};

export const useRate = () => useContext(RateContext);
