import { useState, useEffect } from "react";

export default function SpriteAnimation({ 
    basePath, totalFrames = 1, width = 120, height = 120, 
    duration = 800, isAnimating = true, flipHorizontal = false 
}) {
    const [currentFrame, setCurrentFrame] = useState(0);

    useEffect(() => {
        let interval;
        if (isAnimating && totalFrames > 1) {
            interval = setInterval(() => {
                setCurrentFrame(prev => (prev >= totalFrames - 1 ? 0 : prev + 1));
            }, duration / totalFrames);
        } else {
            setCurrentFrame(0);
        }
        return () => clearInterval(interval);
    }, [isAnimating, totalFrames, duration, basePath]); // Añadido basePath para resetear si cambia el archivo

    const imagePath = `${basePath}.png`;
    
    return (
            <div style={{
                width: `${width}px`,
                height: `${height}px`,
                backgroundImage: `url("${imagePath}")`,
                
                // CORRECCIÓN 1: Forzamos a que el fondo se estire 
                // exactamente al número de frames multiplicado por el contenedor.
                backgroundSize: `${totalFrames * 100}% 100%`,
                
                // CORRECCIÓN 2: El cálculo de posición con porcentajes evita 
                // que el espacio en blanco al final de la imagen del robot afecte el centrado.
                backgroundPosition: `${totalFrames > 1 ? (currentFrame / (totalFrames - 1)) * 100 : 0}% 0%`,
                
                backgroundRepeat: 'no-repeat',
                
                // CORRECCIÓN 3: Desactivamos cualquier transición CSS 
                // que pudiera estar causando el efecto "deslizado" o "cinta".
                transition: 'none', 
                
                overflow: 'hidden',
                transform: flipHorizontal ? "scaleX(-1)" : "scaleX(1)",
                margin: "0 auto",
                imageRendering: 'pixelated'
            }} />
        );
}