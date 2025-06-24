import { useState } from "react";
import tankBgGif from '../../../assets/FactoryTank/factory-tank.gif';
import tankSound from '../../../assets/FactoryTank/factory-tank.mp3';
import type { Factory } from "../../../types/game";
import { AudioPlayer } from "../Audio/AudioPlayer";
import { AudioSlider } from "../Audio/AudioSlider.tsx/AudioSlider";
import './TankFactory.css';

interface TankFactoryProps {
    factory: Factory;
}

export const TankFactory = ({ factory }: TankFactoryProps) => {
    const [volume, setVolume] = useState(0.05);

    const handleVolumeChange = (newVolume: number) => {
        setVolume(newVolume);
    };

    return (
        <div className='tank-factory'>
            <img src={tankBgGif} alt={factory.name} className='tank-factory-image' />
            <AudioSlider
                defaultVolume={volume}
                onVolumeChange={handleVolumeChange}
            />
            <AudioPlayer
                src={tankSound}
                loop={true}
                volume={volume}
                autoPlay={true}
            />
        </div>
    );
};
