export type SecurityRate = {
  Id: number;
  Town: Town;
  MinConsume: number;
  MaxConsume: number;
  Rate: number;
  Units: string;
};

export type StreetLighting = {
  Id: number;
  Town: Town;
  MinConsume: number;
  MaxConsume: number;
  Rate: number;
  Units: string;
};

export type Town = {
  Id: number;
  Name: string;
};

export type Panels = {
  Id: number;
  Power: number;
  Price: number;
  Efficiency: number;
  Width: number;
  Height: number;
  area: number;
  value: number;
};
export type Inverters = {
  Id: number;
  Power: number;
  Price: number;
  Efficiency: number;
};
export type SunData = {
  type: string;
  geometry: Geometry;
  properties: Properties;
  header: Header;
  messages: any[];
  parameters: Parameters;
  times: Times;
};

export type Geometry = {
  type: string;
  coordinates: number[];
};

export type Header = {
  title: string;
  api: API;
  sources: string[];
  fill_value: number;
  start: string;
  end: string;
};

export type API = {
  version: string;
  name: string;
};

export type Parameters = {
  ALLSKY_SFC_SW_DWN: AllskySfcSwDwn;
};

export type AllskySfcSwDwn = {
  units: string;
  longname: string;
};

export type Properties = {
  parameter: Parameter;
};

export type Parameter = {
  ALLSKY_SFC_SW_DWN: { [key: string]: number };
};

export type Times = {
  data: number;
  process: number;
};
