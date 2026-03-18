import SpriteAnimation from "./SpriteAnimation";

export default function Hero({ data, action = "Idle" }) {
    if (!data) return null;

    // --- LÓGICA DE VERSIÓN Y RUTA ---
    // Usamos la versión que viene del backend (v1, v2, v3)
    const version = data.spriteVersion || 'v1';
    
    // Construimos la ruta dinámica. 
    // Si 'action' es 'Shot_1', la ruta será: /assets/futuristic/hero/v1/Shot_1
    const basePath = `/assets/${data.era}/hero/${version}/${action}`;
    
    // Obtenemos los frames desde el config que enviamos en yedai.py
    // Si no encuentra la acción, ponemos 1 para que al menos no rompa
    const totalFrames = data.spriteConfig?.[action] || 1;
    
    // El ancho también lo sacamos del diccionario que creamos en el back
    const frameWidth = data.spriteWidths?.[action] || 150; 

    return (
        <div style={styles.container}>
            {/* 1. Badge flotante con la versión activa */}
            <div style={styles.badge}>HÉROE - {version.toUpperCase()}</div>
            
            {/* 2. El Personaje con la animación dinámica */}
            <div style={styles.spriteBox}>
                <SpriteAnimation 
                    key={`${version}-${action}`} // <-- TRUCO CRÍTICO: Fuerza a React a recargar si cambia el ataque
                    basePath={basePath} 
                    totalFrames={totalFrames} 
                    width={frameWidth} 
                    height={150} 
                    isAnimating={true}
                    flipHorizontal={false}
                />
            </div>
            
            {/* 3. El Nombre del Personaje */}
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
        backgroundColor: '#3498db',
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
        color: '#FFD700',
        fontFamily: 'Courier New, monospace',
        textShadow: '2px 2px 4px #000'
    }
};