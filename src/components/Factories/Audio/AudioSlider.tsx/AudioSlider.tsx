import Slider from "rc-slider";
import { useState } from "react";
import './AudioSlider.css';

interface AudioSliderProps {
    defaultVolume: number;
    onVolumeChange?: (volume: number) => void;
}

export const AudioSlider = ({ defaultVolume, onVolumeChange }: AudioSliderProps) => {
    const [volume, setVolume] = useState(defaultVolume);

    const handleVolumeChange = (value: number | number[]) => {
        const newVolume = value as number;
        setVolume(newVolume);
        const normalizedVolume = newVolume / 100;
        onVolumeChange?.(normalizedVolume);
    }

    return (
        <div className='volume-slider-container'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-volume"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 8a5 5 0 0 1 0 8" /><path d="M17.7 5a9 9 0 0 1 0 14" /><path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" /></svg>
            <Slider
                min={0}
                max={100}
                defaultValue={defaultVolume * 100}
                onChange={handleVolumeChange}
            />
        </div>
    );
};
