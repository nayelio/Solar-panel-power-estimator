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
};
export type Inverters = {
  Id: number;
  Power: number;
  Price: number;
};
