import { useState, useEffect } from "react";

export default function SpriteAnimation({ 
    basePath, 
    totalFrames = 1, 
    width = 120, 
    height = 120, 
    duration = 800, 
    isAnimating = true, 
    flipHorizontal = false 
}) {
    const [currentFrame, setCurrentFrame] = useState(0);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const safeFrames = totalFrames > 0 ? totalFrames : 1;
    const imagePath = `${basePath}.png`;

    // Detectamos si es una animación de muerte para que se detenga en el último frame
    const isDeadAnimation = basePath.toLowerCase().includes("dead");

    useEffect(() => {
        // Reset de estados al cambiar de animación (ej. de Idle a Shot_1)
        setIsImageLoaded(false);
        setHasError(false);
        setCurrentFrame(0);

        const img = new Image();
        img.src = imagePath;
        img.onload = () => {
            setIsImageLoaded(true);
            console.log(`✅ Sprite cargado: ${imagePath} (${safeFrames} frames)`);
        };
        img.onerror = () => {
            setHasError(true);
            console.error(`❌ Error 404 en: ${imagePath}`);
        };
    }, [imagePath, safeFrames]);

    useEffect(() => {
        let interval;
        
        if (isAnimating && safeFrames > 1 && isImageLoaded && !hasError) {
            interval = setInterval(() => {
                setCurrentFrame(prev => {
                    // Si es "Dead", no loopeamos, nos quedamos en el último frame
                    if (isDeadAnimation && prev >= safeFrames - 1) {
                        clearInterval(interval);
                        return safeFrames - 1;
                    }
                    // Loop normal para Idle, Attack, Shot, etc.
                    return (prev >= safeFrames - 1 ? 0 : prev + 1);
                });
            }, duration / safeFrames);
        } else {
            setCurrentFrame(0);
        }

        return () => clearInterval(interval);
    }, [isAnimating, safeFrames, duration, isImageLoaded, isDeadAnimation, hasError]);

    // --- CÁLCULO DE POSICIÓN ---
    // El background-position se mueve por pasos. 
    // Si hay 4 frames, los pasos son 0%, 33.3%, 66.6% y 100%.
    const step = safeFrames > 1 ? 100 / (safeFrames - 1) : 0;
    const positionX = currentFrame * step;

    return (
        <div style={{
            ...styles.spriteCanvas,
            width: `${width}px`,
            height: `${height}px`,
            backgroundImage: isImageLoaded ? `url("${imagePath}")` : 'none',
            backgroundSize: `${safeFrames * 100}% 100%`,
            backgroundPosition: `${positionX}% 0%`,
            transform: flipHorizontal ? "scaleX(-1)" : "scaleX(1)",
            // Si hay error, ponemos un borde rojo para avisar al dev
            border: hasError ? '2px dashed #ff4757' : 'none',
            opacity: isImageLoaded ? 1 : 0.6,
            filter: isImageLoaded ? 'drop-shadow(0 0 5px rgba(255,255,255,0.2))' : 'grayscale(100%)'
        }}>
            {/* Overlay de carga para feedback visual */}
            {!isImageLoaded && !hasError && (
                <div style={styles.loader}>...</div>
            )}
            {hasError && (
                <div style={styles.errorLabel}>404</div>
            )}
        </div>
    );
}

const styles = {
    spriteCanvas: {
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated', // Mantiene el estilo retro/pixel art nítido
        transition: 'none', // IMPORTANTE: Sin esto, los frames "se deslizan" en lugar de saltar
        display: 'inline-block',
        position: 'relative',
    },
    loader: {
        fontSize: '10px',
        color: '#fff',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    errorLabel: {
        fontSize: '12px',
        color: '#ff4757',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '40%'
    }
};