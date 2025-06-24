import 'rc-slider/assets/index.css';
import { useState } from 'react';
import dinosaurBgGif from '../../../assets/FactoryDinosaur/factory-dinosaur.gif';
import dinosaurSound from '../../../assets/FactoryDinosaur/factory-dinosaur.mp3';
import type { Factory } from "../../../types/game";
import { AudioPlayer } from "../Audio/AudioPlayer";
import { AudioSlider } from '../Audio/AudioSlider.tsx/AudioSlider';
import './DinosaurFactory.css';

interface DinosaurFactoryProps {
    factory: Factory;
}

export const DinosaurFactory = ({ factory }: DinosaurFactoryProps) => {
    const [volume, setVolume] = useState(0.05);

    const handleVolumeChange = (newVolume: number) => {
        setVolume(newVolume);
    };

    return (
        <div className='dinosaur-factory'>
            <img src={dinosaurBgGif} alt={factory.name} className='dinosaur-factory-image' />
            <AudioPlayer
                src={dinosaurSound}
                loop={true}
                volume={volume}
                autoPlay={true}
            />
            <AudioSlider 
                defaultVolume={volume} 
                onVolumeChange={handleVolumeChange}
            />
        </div>
    );
};
