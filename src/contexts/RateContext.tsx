import { getRate } from "@/helpers";
import request, { ApiEnum } from "@/helpers/request";
import { SecurityRate, StreetLighting } from "@/helpers/request/types";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useMemo, useState } from "react";

type RateContextType = {
  securityRate: SecurityRate | null;
  streetLightingRate: StreetLighting | null;
  kwhPrice: number | null;
  consume: number | null;
  setTown: React.Dispatch<React.SetStateAction<string | null>>;
  setConsume: React.Dispatch<React.SetStateAction<number | null>>;
  setKwhPrice: React.Dispatch<React.SetStateAction<number | null>>;
};

const RateContext = createContext<RateContextType>({
  securityRate: null,
  streetLightingRate: null,
  kwhPrice: null,
  consume: null,
  setTown: () => {},
  setConsume: () => {},
  setKwhPrice: () => {},
});

export const RateProvider = ({ children }: { children: React.ReactNode }) => {
  const [town, setTown] = useState<string | null>(null);
  const [consume, setConsume] = useState<number | null>(null);
  const [kwhPrice, setKwhPrice] = useState<number | null>(null);

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

  console.log({
    town,
    securityRate,
    streetLightingRate,
  });

  const value = useMemo(
    () => ({
      securityRate,
      streetLightingRate,
      kwhPrice,
      consume,
      setTown,
      setConsume,
      setKwhPrice,
    }),
    [consume, kwhPrice, securityRate, streetLightingRate]
  );

  return <RateContext.Provider value={value}>{children}</RateContext.Provider>;
};

export const useRate = () => useContext(RateContext);
