import request, { ApiEnum } from "@/helpers/request";
import { SecurityRate, StreetLighting } from "@/helpers/request/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

interface Props {
  town: string;
  consume: number;
}

export enum TownEnum {
  Barranquilla = 1,
  Soledad = 2,
  Galapa = 3,
  Malambo = 4,
  PuertoColombia = 5,
}

export default function RateResults({ town, consume }: Props) {
  const { data: securityData } = useQuery({
    queryFn: () => request<SecurityRate[]>(ApiEnum.SecurityRates),
    queryKey: [ApiEnum.SecurityRates],
  });

  const { data: streetLightingData } = useQuery({
    queryFn: () => request<StreetLighting[]>(ApiEnum.StreetLightings),
    queryKey: [ApiEnum.StreetLightings],
  });

  const Securityrate = useMemo(() => {
    return securityData?.find(
      (item) =>
        item.Town.Name == town &&
        (item.MinConsume == null ||
          ((item.MaxConsume >= consume || item.MaxConsume == null) &&
            item.MinConsume <= consume))
    );
  }, [securityData, town, consume]);

  const StreetLightingrate = useMemo(() => {
    return streetLightingData?.find(
      (item) =>
        item.Town.Name == town &&
        (item.MinConsume == null ||
          ((item.MaxConsume >= consume || item.MaxConsume == null) &&
            item.MinConsume <= consume))
    );
  }, [streetLightingData, town, consume]);

  return (
    <>
      {JSON.stringify(StreetLightingrate, null, 2)}
      {JSON.stringify(Securityrate, null, 2)}
    </>
  );
}
