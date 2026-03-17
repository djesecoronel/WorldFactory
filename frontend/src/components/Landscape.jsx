export default function Landscape({ data }) {
    if (!data) return null;

    return (
        <div className="landscape-container" style={styles.container}>
            <div style={{
                ...styles.overlay,
                backgroundImage: `url(${data.image})`,
            }}>
                <div style={styles.content}>
                    <h2 style={styles.title}>Ubicación: {data.name}</h2>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        width: '100%',
        height: '200px',
        borderRadius: '15px',
        overflow: 'hidden',
        marginBottom: '20px',
        position: 'relative',
        border: '3px solid #34495e'
    },
    overlay: {
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    content: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        width: '100%',
        padding: '10px',
        textAlign: 'center'
    },
    title: {
        color: 'white',
        margin: 0,
        fontSize: '1.5rem',
        textTransform: 'uppercase',
        letterSpacing: '2px'
    }
};