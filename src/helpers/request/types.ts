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
