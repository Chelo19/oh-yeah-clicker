import type { Factory } from "../../../types/game";

interface SniperFactoryProps {
    factory: Factory;
}

export const SniperFactory = ({ factory }: SniperFactoryProps) => {
    return (
        <div className="factory-item">
            <h4>{factory.name}</h4>
            <p>{factory.description}</p>
            <p>Produces: {factory.beersPerSecond} beers/second</p>
        </div>
    );
};
