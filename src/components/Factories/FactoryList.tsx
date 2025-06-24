import { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import { DinosaurFactory } from "./DinosaurFactory/DinosaurFactory";
import { SniperFactory } from "./SniperFactory/SniperFactory";
import { TankFactory } from "./TankFactory/TankFactory";

export const FactoryList = () => {
    const state = useContext(GameContext);

    const renderFactory = (factory: any) => {
        switch (factory.id) {
            case 'tank':
                return <TankFactory key={factory.id} factory={factory} />;
            case 'sniper':
                return <SniperFactory key={factory.id} factory={factory} />;
            case 'dinosaur':
                return <DinosaurFactory key={factory.id} factory={factory} />;
            default:
                return null;
        }
    };

    if (state.factories.length === 0) {
        return null;
    }

    return (
        <div className="factories-container" style={{ color: '#000000' }}>
            <h3>Your Factories:</h3>
            {state.factories.map(renderFactory)}
        </div>
    );
}; 