export interface Factory {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface GameState {
  clicks: number;
  clickPower: number;
  factories: Factory[];
  allFactoriesMultiplier: number;
} 