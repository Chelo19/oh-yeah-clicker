import type { Factory } from "../../../types/game";

interface DinosaurFactoryProps {
    factory: Factory;
}

export const DinosaurFactory = ({ factory }: DinosaurFactoryProps) => {
    return (
        <div className="factory-item">
            <h4>{factory.name}</h4>
            <p>{factory.description}</p>
            <p>Produces: {factory.beersPerSecond} beers/second</p>
        </div>
    );
};
