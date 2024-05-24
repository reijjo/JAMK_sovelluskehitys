export interface Refuel {
  id: string;
  date: string;
  carKm: string;
  refuelLitres: string;
  pricePerLitre: number;
  cost: number;
  consumption: number;
}

export interface RefuelState {
  refuel: Refuel[];
}

export interface Totals {
  totalKm: number;
  totalCost: number;
  avgConsumption: number;
}
