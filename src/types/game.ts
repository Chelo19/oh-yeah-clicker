export interface Factory {
  id: string;
  name: string;
  image: string;
  description: string;
  beersPerSecond: number;
}

export interface GameState {
  beers: number;
  beerPower: number;
  factories: Factory[];
  allFactoriesMultiplier: number;
} 