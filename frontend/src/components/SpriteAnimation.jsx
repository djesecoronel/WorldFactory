import { useState, useEffect } from "react";

export default function SpriteAnimation({ 
    basePath, totalFrames = 1, width = 120, height = 120, 
    duration = 800, isAnimating = true, flipHorizontal = false 
}) {
    const [currentFrame, setCurrentFrame] = useState(0);

    useEffect(() => {
        let interval;
        // Animamos siempre que haya más de 1 frame, sin importar el nombre del archivo
        if (isAnimating && totalFrames > 1) {
            interval = setInterval(() => {
                setCurrentFrame(prev => (prev >= totalFrames - 1 ? 0 : prev + 1));
            }, duration / totalFrames);
        } else {
            setCurrentFrame(0);
        }
        return () => clearInterval(interval);
    }, [isAnimating, totalFrames, duration]);

    const imagePath = `${basePath}.png`;
    
    // Cálculo para mover el background según el frame actual
    // Si solo hay 1 frame, el offset es 0 y se queda estático en el centro
    const frameOffset = totalFrames > 1 ? (100 / (totalFrames - 1)) * currentFrame : 0;

        return (
            <div style={{
                width: `${width}px`,
                height: `${height}px`,
                backgroundImage: `url("${imagePath}")`,
                
                // CORRECCIÓN: Usamos 'contain' para asegurar que la tira 
                // no se repita y se ajuste al ancho del contenedor
                backgroundSize: `${totalFrames * 100}% 100%`,
                
                // Usamos 'left' para forzar a que el frame 0 sea el primero
                backgroundPosition: `${totalFrames > 1 ? (currentFrame / (totalFrames - 1)) * 100 : 0}% 0%`,
                backgroundRepeat: 'no-repeat',
                
                // ESTO ES LO QUE ARREGLA EL "DESLIZAMIENTO"
                overflow: 'hidden',
                
                transform: flipHorizontal ? "scaleX(-1)" : "scaleX(1)",
                margin: "0 auto",
                imageRendering: 'pixelated'
            }} />
        );
}