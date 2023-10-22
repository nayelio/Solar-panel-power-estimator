import request, { ApiEnum } from "@/helpers/request";
import { SecurityRate, StreetLighting } from "@/helpers/request/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

interface Props {
  town: string;
  consume: number;
}

export enum TownEnum {
  Barranquilla = "Barranquilla",
  Soledad = "Soledad",
  Galapa = "Galapa",
  Malambo = "Malambo",
  PuertoColombia = "Puerto Colombia",
}

export default function RateResults({ town, consume }: Props) {
  return;
}
