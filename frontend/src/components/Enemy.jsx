import SpriteAnimation from "./SpriteAnimation";

export default function Enemy({ data, action = "Idle" }) {
    if (!data) return null;

    const basePath = `/assets/${data.era}/enemy/${action}`;
    
    // Obtenemos los valores reales desde la Factory
    const totalFrames = data.spriteConfig?.[action] || 1;
    const frameWidth = data.spriteWidths?.[action] || 150; 

    return (
        <div className="card enemy-card" style={styles.card}>
            <div style={styles.badge}>ENEMIGO</div>
            
            <SpriteAnimation 
                basePath={basePath} 
                totalFrames={totalFrames} 
                width={frameWidth} // <-- Ahora usamos el ancho real del frame
                height={150} 
                isAnimating={true}
                flipHorizontal={true}
            />
            
            <h3 style={styles.name}>{data.name}</h3>
        </div>
    );
}

const styles = {
    card: {
        border: '4px solid #fff',
        borderRadius: '0',
        padding: '20px',
        backgroundColor: 'rgba(50, 0, 0, 0.9)',
        textAlign: 'center',
        width: '220px',
        boxShadow: '10px 10px 0px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    badge: {
        fontSize: '12px',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#e74c3c',
        padding: '4px 8px',
        border: '2px solid #fff',
        display: 'inline-block',
        marginBottom: '15px',
        fontFamily: 'Courier New, monospace'
    },
    name: {
        margin: '5px 0',
        fontSize: '1.2rem',
        color: '#FF6347',
        fontFamily: 'Courier New, monospace'
    }
};