import { useState } from 'react';
import sniperBgGif from '../../../assets/FactorySniper/factory-sniper.gif';
import sniperSound from '../../../assets/FactorySniper/factory-sniper.mp3';
import type { Factory } from "../../../types/game";
import { AudioPlayer } from "../Audio/AudioPlayer";
import { AudioSlider } from '../Audio/AudioSlider.tsx/AudioSlider';
import './SniperFactory.css';

interface SniperFactoryProps {
    factory: Factory;
}

export const SniperFactory = ({ factory }: SniperFactoryProps) => {
    const [volume, setVolume] = useState(0.03);

    const handleVolumeChange = (newVolume: number) => {
        setVolume(newVolume);
    };

    return (
        <div className='sniper-factory'>
            <img src={sniperBgGif} alt={factory.name} className='sniper-factory-image' />
            <AudioSlider 
                defaultVolume={volume} 
                onVolumeChange={handleVolumeChange}
            />
            <AudioPlayer
                src={sniperSound}
                loop={true}
                volume={volume}
                autoPlay={true}
            />
        </div>
    );
};
