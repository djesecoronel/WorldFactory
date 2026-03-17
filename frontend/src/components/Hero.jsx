import SpriteAnimation from "./SpriteAnimation";

export default function Hero({ data, action = "Idle" }) {
    if (!data) return null;

    // 1. Ruta base: /assets/era/hero/nombre_de_archivo
    const basePath = `/assets/${data.era}/hero/${action}`;

    // 2. Extraemos la configuración de la Factory
    // Ya no buscamos números, simplemente usamos lo que define la Factory
    const totalFrames = data.spriteConfig?.[action] || 1;
    const frameWidth = data.spriteWidths?.[action] || 150;

    return (
        <div className="card hero-card" style={styles.card}>
            <div style={styles.badge}>HÉROE</div>
            
            <SpriteAnimation 
                basePath={basePath} 
                totalFrames={totalFrames} 
                width={frameWidth} 
                height={150} // Ajustado a la altura de tus imágenes
                isAnimating={true} // Siempre animamos, ya que todos son sprite sheets
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
        backgroundColor: 'rgba(0,0,0,0.85)',
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
        backgroundColor: '#3498db',
        padding: '4px 8px',
        border: '2px solid #fff',
        display: 'inline-block',
        marginBottom: '15px',
        fontFamily: 'Courier New, monospace'
    },
    name: {
        margin: '5px 0',
        fontSize: '1.2rem',
        color: '#FFD700',
        fontFamily: 'Courier New, monospace'
    }
};