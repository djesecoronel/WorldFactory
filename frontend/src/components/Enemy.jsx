import SpriteAnimation from "./SpriteAnimation";

export default function Enemy({ data, action = "Idle" }) {
    if (!data) return null;

    // --- ÚNICO CAMBIO: LÓGICA DE VERSIÓN ---
    // Usamos la versión que venga del backend, o 'v1' por defecto si no hay nada.
    const version = data.spriteVersion || 'v1'; 
    const folderName = 'enemy'; 
    
    // Ahora la ruta incluye la carpeta de versión (v1, v2 o v3)
    const basePath = `/assets/${data.era}/${folderName}/${version}/${action}`;
    // ---------------------------------------
        
    const totalFrames = data.spriteConfig?.[action] || 1;
    const frameWidth = data.spriteWidths?.[action] || 150; 

    return (
        <div style={styles.container}>
            {/* 1. Badge flotante (Ahora muestra la versión para que sepas cuál carga) */}
            <div style={styles.badge}>ENEMIGO - {version.toUpperCase()}</div>
            
            {/* 2. El Personaje */}
            <div style={styles.spriteBox}>
                <SpriteAnimation 
                    basePath={basePath} 
                    totalFrames={totalFrames} 
                    width={frameWidth} 
                    height={150} 
                    isAnimating={true}
                    flipHorizontal={true}
                />
            </div>
            
            {/* 3. El Nombre */}
            <h3 style={styles.name}>{data.name}</h3>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '300px',
        minHeight: '250px',
        position: 'relative'
    },
    badge: {
        fontSize: '12px',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#e74c3c',
        padding: '4px 10px',
        border: '2px solid #fff',
        fontFamily: 'Courier New, monospace',
        marginBottom: '10px',
        zIndex: 2
    },
    spriteBox: {
        width: '100%',
        height: '150px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        filter: 'drop-shadow(0px 5px 15px rgba(0,0,0,0.5))'
    },
    name: {
        margin: '10px 0 0 0',
        fontSize: '1.8rem',
        color: '#fff',
        fontFamily: 'Courier New, monospace',
        textShadow: '2px 2px 4px #000'
    }
};