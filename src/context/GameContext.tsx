import { createContext } from "react";
import type { GameState } from "../types/game";

const initialState: GameState = {
  clicks: 0,
  clickPower: 1,
  factories: [],
  allFactoriesMultiplier: 1,
};

export const GameContext = createContext<GameState>(initialState);
