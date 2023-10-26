import { usePosition } from "@/contexts/PositionContext";

const api = "http://localhost:3003/api/services";

export enum ApiEnum {
  Towns = `${api}/towns`,
  StreetLightings = `${api}/streetLighting`,
  SecurityRates = `${api}/securityRate`,
  PanelsDB = `${api}/phvsPanels`,
  InverterDB = `${api}/inverters`,
}

const request = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export default request;
