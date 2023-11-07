import { getRate } from "@/helpers";
import request, { myApis } from "@/helpers/request";
import {
  Inverters,
  Panels,
  SecurityRate,
  StreetLighting,
} from "@/helpers/request/types";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useMemo, useState } from "react";
import { usePosition } from "./PositionContext";
import { generatePanels } from "@/helpers/panels";

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
  inverterToUseRef: Inverters | null;
  inverterToUse: Inverters | null;
  panels: {
    lat: number;
    lng: number;
  }[][];
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
  panelQuantityRef: number | null;
  setTown: React.Dispatch<React.SetStateAction<string | null>>;
  setConsume: React.Dispatch<React.SetStateAction<number | null>>;
  setKwhPrice: React.Dispatch<React.SetStateAction<number | null>>;
  generatedPowerPerMonth: number | null;
  setGeneratedPowerPerMonth: React.Dispatch<
    React.SetStateAction<null | number>
  >;
};

const RateContext = createContext<RateContextType>({
  inverterToUseRef: null,
  inverterToUse: null,
  securityRate: null,
  panels: [],
  systemPrice: null,
  securityRateToUse: null,
  streetLightingRate: null,
  streetLightingRateToUse: null,
  kwhPrice: 944.21,
  consume: null,
  sunByDay: 0,
  power: 0,
  price: 0,
  panelToUse: null,
  panelQuantityRef: null,
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

  const { sunData, polygons } = usePosition();

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
  const { data: listInverter } = useQuery({
    queryFn: () => request<Inverters[]>(myApis.inverterDB),
    queryKey: [myApis.inverterDB],
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
    console.log(valuesByMonth);

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
    value: panel.Power,
    area: panel.Width * panel.Height,
  }));

  const panelToUse =
    !consume || !polygons.length ? null : panelsRealValue?.[2] ?? null;

  const inverterToUseRef = useMemo(() => {
    if (!consume) return null;
    const consumeInWatts = (consume * (1000 / 30)) / (sunByDay ?? 0);
    const selectedInverter = listInverter
      ?.sort((a, b) => a.Power - b.Power)
      .find((inverter) => inverter.Power >= consumeInWatts);
    return selectedInverter ?? null;
  }, [consume, listInverter, sunByDay]);

  const panelQuantityRef = useMemo(() => {
    if (!inverterToUseRef || consume == null) return null;
    return Math.ceil(
      (((inverterToUseRef.Power ?? 0) / (panelToUse?.value ?? 0)) * 1) / 0.82
    );
  }, [consume, inverterToUseRef, panelToUse?.value]);

  const panels = useMemo(
    () =>
      polygons
        .flatMap((item) => generatePanels(item) ?? [])
        .filter((item, index) => index < (panelQuantityRef ?? 0)) ?? [],
    [panelQuantityRef, polygons]
  );
  const systemPrice = useMemo(() => {
    const priceEstimate = panelToUse?.Price! * (panels.length ?? 0);
    return priceEstimate;
  }, [panelToUse?.Price, panels.length]);

  const inverterToUse = useMemo(() => {
    if (!consume || panels.length == null) return null;
    const systemSize = panels.length * (panelToUse?.Power ?? 0);
    console.log(systemSize);
    const selectedInverter2 = listInverter
      ?.sort((a, b) => b.Power - a.Power)
      .find((inverter) => inverter.Power <= systemSize);
    return selectedInverter2 ?? null;
  }, [consume, listInverter, panelToUse?.Power, panels.length]);

  const value = useMemo(
    () => ({
      securityRate,
      securityRateToUse,
      streetLightingRate,
      streetLightingRateToUse,
      kwhPrice,
      systemPrice,
      panels,
      listPanels,
      price,
      panelToUse,
      power,
      sunByDay,
      consume,
      inverterToUseRef,
      inverterToUse,
      panelsRealValue,
      panelQuantityRef,
      setTown,
      setConsume,
      setKwhPrice,
      generatedPowerPerMonth,
      setGeneratedPowerPerMonth,
    }),
    [
      securityRate,
      panels,
      systemPrice,
      securityRateToUse,
      streetLightingRate,
      streetLightingRateToUse,
      kwhPrice,
      listPanels,
      price,
      panelToUse,
      power,
      sunByDay,
      inverterToUseRef,
      inverterToUse,
      consume,
      panelsRealValue,
      panelQuantityRef,
      generatedPowerPerMonth,
    ]
  );

  return <RateContext.Provider value={value}>{children}</RateContext.Provider>;
};

export const useRate = () => useContext(RateContext);
