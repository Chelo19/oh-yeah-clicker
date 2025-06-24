import 'rc-slider/assets/index.css';
import { useEffect, useRef, useState } from 'react';
import hitMarkerSound from '../../../assets/FactoryHitMarker/factory-hit-marker.mp3';
import hitMarkerImage from '../../../assets/FactoryHitMarker/factory-hit-marker.png';
import type { Factory } from "../../../types/game";
import { AudioSlider } from '../Audio/AudioSlider.tsx/AudioSlider';
import './HitMarkerFactory.css';

interface HitMarkerFactoryProps {
    factory: Factory;
}

export const HitMarkerFactory = ({ factory }: HitMarkerFactoryProps) => {
    const [volume, setVolume] = useState(0.5);
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const audioRef = useRef<HTMLAudioElement>(null);

    const handleVolumeChange = (newVolume: number) => {
        setVolume(newVolume);
    };

    const getRandomPosition = () => {
        const maxX = window.innerWidth - 70; // Ancho del componente
        const maxY = window.innerHeight - 70; // Alto del componente
        return {
            x: Math.random() * maxX,
            y: Math.random() * maxY
        };
    };

    const playHitMarkerSound = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0; // Reiniciar al inicio
            audioRef.current.volume = volume;
            audioRef.current.play().catch(error => {
                console.log('Audio play failed:', error);
            });
        }
    };

    const showHitMarker = () => {
        const newPosition = getRandomPosition();
        setPosition(newPosition);
        setIsVisible(true);

        // Reproducir sonido cuando aparece
        playHitMarkerSound();

        // Ocultar después de 1 segundo
        setTimeout(() => {
            setIsVisible(false);
        }, 500);
    };

    useEffect(() => {
        // Mostrar inmediatamente al montar
        showHitMarker();

        // Configurar el intervalo para mostrar cada 5 segundos
        const interval = setInterval(() => {
            showHitMarker();
        }, 5000);

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, []);

    // Actualizar volumen del audio cuando cambie
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const hitMarkerStyle = {
        position: 'fixed' as const,
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.1s ease',
        pointerEvents: isVisible ? 'auto' : 'none' as 'auto' | 'none',
    };

    return (
        <div className='hit-marker-factory' style={hitMarkerStyle}>
            <img src={hitMarkerImage} alt={factory.name} className='hit-marker-factory-image' />

            <audio
                ref={audioRef}
                src={hitMarkerSound}
                preload="auto"
            />

            <AudioSlider
                defaultVolume={volume}
                onVolumeChange={handleVolumeChange}
            />
        </div>
    );
};
