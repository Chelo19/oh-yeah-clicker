import { createContext } from "react";
import type { GameState } from "../types/game";

export const initialState: GameState = {
  beers: 0,
  beerPower: 1,
  factories: [],
  allFactoriesMultiplier: 1,
};

export const GameContext = createContext<GameState>(initialState);