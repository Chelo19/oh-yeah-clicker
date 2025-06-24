import type { Factory } from "../../../types/game";

interface TankFactoryProps {
    factory: Factory;
}

export const TankFactory = ({ factory }: TankFactoryProps) => {
    return (
        <div className="factory-item">
            <h4>{factory.name}</h4>
            <p>{factory.description}</p>
            <p>Produces: {factory.beersPerSecond} beers/second</p>
        </div>
    );
};
