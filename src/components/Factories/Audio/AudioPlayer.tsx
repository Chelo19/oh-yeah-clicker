import { useEffect, useRef } from "react";

interface AudioPlayerProps {
    src: string;
    preload?: string;
    loop?: boolean;
    volume?: number;
    autoPlay?: boolean;
}

export const AudioPlayer = ({ 
    src, 
    preload = "auto", 
    loop = true, 
    volume = 0.3, 
    autoPlay = true 
}: AudioPlayerProps) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        // Configurar el audio cuando el componente se monta
        if (audioRef.current) {
            audioRef.current.loop = loop;
            audioRef.current.volume = volume;
            
            // Intentar reproducir automáticamente si está habilitado
            if (autoPlay) {
                audioRef.current.play().catch(error => {
                    console.log('Audio autoplay blocked:', error);
                });
            }
        }

        // Limpiar cuando el componente se desmonta
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, [loop, volume, autoPlay]);

    return (
        <audio
            ref={audioRef}
            src={src}
            preload={preload}
        />
    );
};