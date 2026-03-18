import { useState, useEffect } from "react";
import { createWorldOnBackend, attackOnBackend } from "../services/api";
import Hero from "../components/Hero";
import Enemy from "../components/Enemy";

function GamePage() {
    const [world, setWorld] = useState(null);
    const [loading, setLoading] = useState(false);
    const [era, setEra] = useState("");
    const [difficulty, setDifficulty] = useState("normal");
    const [hoveredButton, setHoveredButton] = useState(null);
    
    // ESTADOS DE COMBATE
    const [enemyHp, setEnemyHp] = useState(0); 
    const [isDisabled, setIsDisabled] = useState(false); 
    const [heroAction, setHeroAction] = useState("Idle");
    const [enemyAction, setEnemyAction] = useState("Idle");

    // 1. Precarga de imágenes dinámica por versión (v1, v2, v3)
    useEffect(() => {
        if (world && era) {
            const version = world.hero.spriteVersion || 'v1'; 
            const actions = ["Idle", "Attack_1", "Attack_2", "Shot_1", "Hurt", "Dead"];
            
            actions.forEach(action => {
                const img = new Image();
                img.src = `/assets/${era}/hero/${version}/${action}.png`;
                const imgEnemy = new Image();
                imgEnemy.src = `/assets/${era}/enemy/${version}/${action}.png`;
            });
        }
    }, [world, era]);

    // 2. Selección de mundo enviando dificultad al Backend
    const handleSelectWorld = async (type) => {
        setLoading(true);
        setEra(type);
        try {
            const response = await createWorldOnBackend(type, difficulty);
            if (response.status === "success") {
                setWorld(response.data);
                setEnemyHp(response.data.enemy.hp); // Inicializamos vida desde el Builder
                setIsDisabled(false);
            }
        } catch (error) {
            console.error("Error:", error);
            setEra("");
        } finally {
            setLoading(false);
        }
    };

    // 3. Lógica de ataque real conectada al endpoint /attack
    const handleAttack = async (skillName) => {
        if (isDisabled || !world) return;

        // ELIMINAMOS EL TERNARIO QUE FUERZA "Attack_1"
        // Usamos directamente el nombre que viene de la skill
        setHeroAction(skillName); 

        try {
            const result = await attackOnBackend(enemyHp, world.hero.damage);

            setTimeout(() => {
                setEnemyHp(result.hp);
                setEnemyAction(result.animation); 
                if (result.isDisabled) setIsDisabled(true);
            }, 500);

            setTimeout(() => {
                setHeroAction("Idle");
                if (!result.isDisabled) setEnemyAction("Idle");
            }, 1200);

        } catch (error) {
            alert("Error en el combate");
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

    const getDiffButtonStyle = (mode) => ({
        ...styles.diffButton,
        backgroundColor: difficulty === mode ? '#f1c40f' : '#2c3e50',
        color: difficulty === mode ? '#000' : '#fff',
    });

    return (
        <div style={{ ...styles.container, backgroundImage: getBackground() }}>
            <style>{`
                @keyframes panBackground {
                    0% { background-position: 40% 50%; }
                    50% { background-position: 60% 50%; }
                    100% { background-position: 40% 50%; }
                }
            `}</style>
            
            {!world && (
                <div style={styles.header}>
                    <h1 style={styles.title}>WORLD FACTORY</h1>
                    <div style={{ marginBottom: '40px' }}>
                        <p style={styles.label}>DIFICULTAD:</p>
                        <button onClick={() => setDifficulty("easy")} style={getDiffButtonStyle("easy")}>FÁCIL</button>
                        <button onClick={() => setDifficulty("normal")} style={getDiffButtonStyle("normal")}>NORMAL</button>
                        <button onClick={() => setDifficulty("hard")} style={getDiffButtonStyle("hard")}>DIFÍCIL</button>
                    </div>
                    <div style={styles.buttonContainer}>
                        <button 
                            onClick={() => handleSelectWorld("medieval")} 
                            style={styles.button}
                            disabled={loading}
                        >Mundo Medieval</button>
                        <button 
                            onClick={() => handleSelectWorld("futuristic")} 
                            style={styles.button}
                            disabled={loading}
                        >Mundo Futurista</button>
                    </div>
                </div>
            )}

            {world && (
                <>
                    <button onClick={handleReset} style={styles.backButton}>← VOLVER</button>

                    {/* BOTONES DE HABILIDADES DINÁMICOS */}
                    <div style={styles.skillBar}>
                        {world.hero.skills.map((skill) => (
                            <button 
                                key={skill}
                                onClick={() => handleAttack(skill)}
                                disabled={isDisabled || skill === "Idle" || skill === "Hurt"}
                                style={styles.skillButton}
                            >
                                {skill.replace("_", " ")}
                            </button>
                        ))}
                    </div>

                    <div style={styles.gameArea}>
                        <div style={styles.heroPosition}>
                            <Hero data={world.hero} action={heroAction} />
                        </div>
                        
                        <div style={styles.vsBadge}>VS</div>
                        
                        <div style={styles.enemyPosition}>
                            {/* BARRA DE VIDA VISUAL */}
                            <div style={styles.hpContainer}>
                                <div style={{ 
                                    ...styles.hpBar, 
                                    width: `${(enemyHp / world.enemy.maxHp) * 100}%`,
                                    backgroundColor: enemyHp < world.enemy.maxHp * 0.3 ? '#ff0000' : '#2ecc71'
                                }} />
                                <span style={styles.hpLabel}>{enemyHp} / {world.enemy.maxHp} HP</span>
                            </div>
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
        margin: 0, padding: 0, backgroundColor: '#000'
    },
    header: { 
        textAlign: 'center', backgroundColor: 'rgba(0,0,0,0.85)', padding: '50px', 
        border: '4px solid #fff', boxShadow: '10px 10px 0px rgba(0,0,0,0.5)'
    },
    title: { 
        margin: '0 0 20px 0', color: '#FFD700', fontSize: '4rem',
        textShadow: '4px 4px 0px #8B4513, 6px 6px 0px #000', fontFamily: 'Courier New, monospace'
    },
    label: { color: '#fff', marginBottom: '15px', fontWeight: 'bold' },
    diffButton: {
        padding: '10px 20px', cursor: 'pointer', border: '4px solid #fff', 
        fontFamily: 'Courier New, monospace', fontWeight: 'bold', margin: '0 5px'
    },
    buttonContainer: { display: 'flex', justifyContent: 'center', gap: '20px' },
    button: { 
        padding: '20px 40px', cursor: 'pointer', border: '4px solid #fff', 
        color: 'white', fontWeight: 'bold', fontSize: '1.2rem', backgroundColor: '#c0392b',
        fontFamily: 'Courier New, monospace'
    },
    backButton: {
        position: 'absolute', top: '20px', left: '20px', padding: '10px 20px',
        backgroundColor: '#000', color: 'white', border: '4px solid #fff',
        cursor: 'pointer', fontWeight: 'bold', zIndex: 10
    },
    skillBar: {
        position: 'absolute', bottom: '50px', display: 'flex', gap: '15px', zIndex: 30
    },
    skillButton: {
        padding: '15px 25px', backgroundColor: '#e67e22', border: '4px solid #fff',
        color: '#fff', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase'
    },
    gameArea: { 
        display: 'flex', width: '100%', justifyContent: 'space-around', alignItems: 'center' 
    },
    heroPosition: { transform: 'scale(2.5)', marginTop: '50px' },
    enemyPosition: { transform: 'scale(2.5)', marginTop: '50px', textAlign: 'center' },
    vsBadge: { fontSize: '4rem', fontWeight: 'bold', color: 'white', textShadow: '3px 3px 0px #000' },
    hpContainer: {
        width: '150px', height: '20px', border: '2px solid #fff', 
        backgroundColor: '#000', position: 'relative', marginBottom: '20px', margin: '0 auto'
    },
    hpBar: { height: '100%', transition: 'width 0.3s ease-in-out' },
    hpLabel: {
        position: 'absolute', width: '100%', top: '-25px', left: 0,
        fontSize: '10px', color: '#fff', fontWeight: 'bold'
    }
};

export default GamePage;