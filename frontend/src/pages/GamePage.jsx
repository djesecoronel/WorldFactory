import { useState, useEffect } from "react";
import { createWorldOnBackend } from "../services/api";
import Hero from "../components/Hero";
import Enemy from "../components/Enemy";

function GamePage() {
    const [world, setWorld] = useState(null);
    const [loading, setLoading] = useState(false);
    const [era, setEra] = useState("");
    const [hoveredButton, setHoveredButton] = useState(null);
    
    const [heroAction, setHeroAction] = useState("Idle");
    const [enemyAction, setEnemyAction] = useState("Idle");

    // Precarga de imágenes para evitar parpadeos al atacar
    useEffect(() => {
        if (world && era) {
            const actions = ["Idle", "Attack_1", "Attack_2", "Run", "Walk"];
            actions.forEach(action => {
                const img = new Image();
                img.src = `/assets/${era}/hero/${action}.png`;
                const imgEnemy = new Image();
                imgEnemy.src = `/assets/${era}/enemy/${action}.png`;
            });
        }
    }, [world, era]);

    const animationStyle = `
        @keyframes panBackground {
            0% { background-position: 40% 50%; }
            50% { background-position: 60% 50%; }
            100% { background-position: 40% 50%; }
        }
    `;

    const handleSelectWorld = async (type) => {
        setLoading(true);
        setEra(type);
        try {
            const response = await createWorldOnBackend(type);
            if (response.status === "success") {
                setWorld(
                  response.data
                );
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error al conectar con Flask.");
            setEra("");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setWorld(null);
        setEra("");
        setHeroAction("Idle");
        setEnemyAction("Idle");
    };

    const getBackground = () => {
        if (era === "medieval") return 'url("/medieval-bg.jpg")';
        if (era === "futuristic") return 'url("/futuristic-bg.jpg")';
        return 'url("/home-bg.jpg")';
    };

    const getButtonStyle = (buttonId) => ({
        ...styles.button,
        transform: hoveredButton === buttonId ? 'translateY(-8px)' : 'translateY(0)',
        backgroundColor: hoveredButton === buttonId ? '#e74c3c' : '#c0392b',
        boxShadow: hoveredButton === buttonId ? '6px 10px 0px rgba(0,0,0,0.5)' : '6px 6px 0px rgba(0,0,0,0.5)'
    });

    return (
        <div style={{ ...styles.container, backgroundImage: getBackground() }}>
            <style>{animationStyle}</style>
            
            {!world && (
                <div style={styles.header}>
                    <h1 style={styles.title}>WORLD FACTORY</h1>
                    <div style={styles.buttonContainer}>
                        <button 
                            onClick={() => handleSelectWorld("medieval")} 
                            style={getButtonStyle("medieval")} 
                            onMouseEnter={() => setHoveredButton("medieval")}
                            onMouseLeave={() => setHoveredButton(null)}
                            disabled={loading}
                        >
                            {loading ? "GENERANDO..." : "Mundo Medieval"}
                        </button>
                        <button 
                            onClick={() => handleSelectWorld("futuristic")} 
                            style={getButtonStyle("futuristic")} 
                            onMouseEnter={() => setHoveredButton("futuristic")}
                            onMouseLeave={() => setHoveredButton(null)}
                            disabled={loading}
                        >
                            {loading ? "GENERANDO..." : "Mundo Futurista"}
                        </button>
                    </div>
                </div>
            )}

            {world && (
                <>
                    <button onClick={handleReset} style={styles.backButton}>
                        ← Volver a selección
                    </button>
                    
                    <button 
                        onClick={() => {
                            const attackAction = era === "medieval" ? "Attack_1" : "Shot_1";
                            setHeroAction(attackAction);
                            setTimeout(() => setHeroAction("Idle"), 800);
                        }}
                        style={{ 
                            position: 'absolute', top: '80px', left: '20px',
                            padding: '10px', zIndex: 20, cursor: 'pointer'
                        }}
                    >TEST ATK</button>

                    <div style={styles.gameArea}>
                        <div style={styles.heroPosition}>
                            <Hero data={world.hero} action={heroAction} />
                        </div>
                        
                        <div style={styles.vsBadge}>VS</div>
                        
                        <div style={styles.enemyPosition}>
                            <Enemy data={world.enemy} action={enemyAction} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

const styles = {
    container: {
        width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
        animation: 'panBackground 25s linear infinite alternate',
        transition: 'background-image 0.8s ease-in-out',
        margin: 0, padding: 0, boxSizing: 'border-box', backgroundColor: '#000'
    },
    backButton: {
        position: 'absolute', top: '20px', left: '20px', padding: '10px 20px',
        backgroundColor: '#000', color: 'white', border: '4px solid #fff',
        borderRadius: '0', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold',
        fontFamily: 'Courier New, monospace', zIndex: 10
    },
    header: { 
        textAlign: 'center', backgroundColor: 'rgba(0,0,0,0.85)', padding: '50px', 
        border: '4px solid #fff', borderRadius: '0', boxShadow: '10px 10px 0px rgba(0,0,0,0.5)'
    },
    title: { 
        margin: '0 0 20px 0', color: '#FFD700', fontSize: '4rem',
        textShadow: '4px 4px 0px #8B4513, 6px 6px 0px #000', fontFamily: 'Courier New, monospace'
    },
    buttonContainer: { display: 'flex', justifyContent: 'center', gap: '20px' },
    button: { 
        padding: '20px 40px', cursor: 'pointer', border: '4px solid #fff', borderRadius: '0', 
        color: 'white', fontWeight: 'bold', fontSize: '1.2rem', textShadow: '2px 2px 0px #000', 
        fontFamily: 'Courier New, monospace', transition: 'all 0.2s'
    },
    gameArea: { 
        display: 'flex', width: '100%', justifyContent: 'space-around', alignItems: 'center', padding: '0 5%' 
    },
    heroPosition: { transform: 'scale(1.2)' },
    enemyPosition: { transform: 'scale(1.2)' },
    vsBadge: { 
        fontSize: '4rem', fontWeight: 'bold', color: 'white', 
        textShadow: '3px 3px 0px #000', fontFamily: 'Courier New, monospace' 
    }
};

export default GamePage;