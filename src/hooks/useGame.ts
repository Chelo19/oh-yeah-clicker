import { useEffect, useReducer } from "react";
import type { GameState } from "../types/game";
import { factories } from "../components/Factories/FactoryData";

const initialState: GameState = {
    beers: 0,
    beerPower: 1,
    factories: [],
    allFactoriesMultiplier: 1,
};

// Función para cargar el estado desde localStorage
const loadStateFromStorage = (): GameState => {
    try {
        const savedState = localStorage.getItem('gameState');
        if (savedState) {
            return JSON.parse(savedState);
        }
    } catch (error) {
        console.error('Error loading state from localStorage:', error);
    }
    return initialState;
};

type GameAction =
    | { type: 'CLICK_BEER' }
    | { type: 'UPGRADE_BEER_POWER'; cost: number; increase: number }
    | { type: 'BUY_FACTORY'; factoryType: string }
    | { type: 'UPDATE_FACTORIES_EARNINGS'; earnings: number }
    | { type: 'RESET_GAME' };

const gameReducer = (state: GameState, action: GameAction): GameState => {
    switch (action.type) {
        case 'CLICK_BEER':
            return {
                ...state,
                beers: state.beers + state.beerPower
            };
        case 'UPGRADE_BEER_POWER':
            return {
                ...state,
                beers: state.beers - action.cost,
                beerPower: state.beerPower + action.increase
            };
        case 'BUY_FACTORY':
            const factoryData = getFactoryData(action.factoryType);
            // Verificar si ya tienes esta factory
            const existingFactory = state.factories.find(f => f.id === action.factoryType);
            if (existingFactory) {
                // Ya tienes esta factory, no puedes comprar otra
                return state;
            }

            if (state.beers >= factoryData.cost) {
                // Agregar nueva factory (solo una vez)
                const newFactory = {
                    id: action.factoryType,
                    name: factoryData.name,
                    image: factoryData.image,
                    description: factoryData.description,
                    beersPerSecond: factoryData.beersPerSecond
                };
                return {
                    ...state,
                    beers: state.beers - factoryData.cost,
                    factories: [...state.factories, newFactory]
                };
            }
            return state;
        case 'UPDATE_FACTORIES_EARNINGS':
            return {
                ...state,
                beers: state.beers + action.earnings
            };
        case 'RESET_GAME':
            return initialState;
        default:
            return state;
    }
};

// Función para obtener datos de las factories
const getFactoryData = (factoryType: string) => {
    return factories[factoryType as keyof typeof factories] || factories.tank;
};

export const useGame = () => {
    const [state, dispatch] = useReducer(gameReducer, loadStateFromStorage());

    const handleClick = () => {
        dispatch({ type: 'CLICK_BEER' });
    }

    const handleBuyFactory = (factoryType: string) => {
        dispatch({ type: 'BUY_FACTORY', factoryType });
    }

    const resetGame = () => {
        dispatch({ type: 'RESET_GAME' });
    }

    // Efecto para calcular ganancias de las factories
    useEffect(() => {
        const interval = setInterval(() => {
            const totalEarnings = state.factories.reduce((total, factory) => {
                return total + (factory.beersPerSecond * state.allFactoriesMultiplier);
            }, 0);

            if (totalEarnings > 0) {
                dispatch({ type: 'UPDATE_FACTORIES_EARNINGS', earnings: totalEarnings });
            }
        }, 1000); // Actualizar cada segundo

        return () => clearInterval(interval);
    }, [state.factories, state.allFactoriesMultiplier]);

    useEffect(() => {
        localStorage.setItem('gameState', JSON.stringify(state));
    }, [state]);

    return { state, dispatch, handleClick, handleBuyFactory, getFactoryData, resetGame };
}