import { useContext } from "react";
import { Tooltip } from "react-tooltip";
import { GameContext } from "../../context/GameContext";
import './BuyButtons.css';

// Importar todas las imágenes de factories
import dinosaurImage from '../../assets/FactoryDinosaur/factory-dinosaur.png';
import hitMarkerImage from '../../assets/FactoryHitMarker/factory-hit-marker.png';
import sniperImage from '../../assets/FactorySniper/factory-sniper.png';
import tankImage from '../../assets/FactoryTank/factory-tank.png';

// Objeto para mapear tipos de factory con sus imágenes
const factoryImages: { [key: string]: string } = {
    tank: tankImage,
    sniper: sniperImage,
    dinosaur: dinosaurImage,
    hitMarker: hitMarkerImage,
};

// Función para obtener la imagen de una factory
const getFactoryImage = (factoryType: string): string => {
    return factoryImages[factoryType] || tankImage; // Fallback a tank image
};

interface BuyButtonsProps {
    handleBuyFactory: (factoryType: string) => void;
    getFactoryData: (factoryType: string) => any;
}

interface FactoryButtonProps {
    factoryType: string;
    factoryData: any;
    hasFactory: boolean;
    canAfford: boolean;
    onBuy: (factoryType: string) => void;
}

const FactoryButton = ({ factoryType, factoryData, hasFactory, canAfford, onBuy }: FactoryButtonProps) => {
    if (hasFactory || !canAfford) return null;

    return (
        <button
            data-tooltip-id="my-tooltip"
            data-tooltip-html={tooltipContent(factoryData)}
            className="buy-button"
            onClick={() => onBuy(factoryType)}
        >
            <img
                src={getFactoryImage(factoryType)}
                alt={factoryData.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
        </button>
    );
};

export const BuyButtons = ({ handleBuyFactory, getFactoryData }: BuyButtonsProps) => {
    const state = useContext(GameContext);

    // Array de tipos de factories disponibles
    const factoryTypes = ['tank', 'sniper', 'dinosaur', 'hitMarker'];

    return (
        <div className="buy-buttons">
            <div className="buy-buttons-container">
                {factoryTypes.map(factoryType => {
                    const factoryData = getFactoryData(factoryType);
                    const hasFactory = state.factories.some(f => f.id === factoryType);
                    const canAfford = state.beers >= factoryData.cost;

                    return (
                        <FactoryButton
                            key={factoryType}
                            factoryType={factoryType}
                            factoryData={factoryData}
                            hasFactory={hasFactory}
                            canAfford={canAfford}
                            onBuy={handleBuyFactory}
                        />
                    );
                })}
            </div>
            <Tooltip id="my-tooltip" place="bottom" />
        </div>
    )
}

const tooltipContent = (factoryData: any) => {
    return `
        <div style="text-align: center; padding: 8px;">
            <div style="font-weight: bold; font-size: 16px; margin-bottom: 8px; color: #ffffff;">
                ${factoryData.name}
            </div>
            <div style="margin-bottom: 6px; color: #cccccc;">
                ${factoryData.description}
            </div>
            <div style="color: #ffd700; font-weight: bold; margin-bottom: 4px;">
                Cost: ${factoryData.cost} beers
            </div>
            <div style="color: #90ee90; font-weight: bold;">
                Produces: ${factoryData.beersPerSecond} beers/sec
            </div>
        </div>
    `;
}