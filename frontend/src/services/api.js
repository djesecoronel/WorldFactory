const API_URL = "http://127.0.0.1:5000/TipodeJuego";

/**
 * Función para crear el mundo (Ya la tenías, la mantenemos igual)
 */
export async function createWorldOnBackend(worldType, difficulty) {
    try {
        const response = await fetch(`${API_URL}/world`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                world: worldType,
                difficulty: difficulty
            }),
        });
        if (!response.ok) throw new Error("Error al crear el mundo");
        return await response.json();
    } catch (error) {
        console.error("Error en createWorld:", error);
        throw error;
    }
}

/**
 * NUEVA: Función para procesar un ataque
 * @param {number} currentEnemyHp - Vida que tiene el enemigo en el Front
 * @param {number} heroDamage - Daño calculado por el Builder
 */
export async function attackOnBackend(currentEnemyHp, heroDamage) {
    try {
        const response = await fetch(`${API_URL}/attack`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                enemy_hp: currentEnemyHp,
                damage: heroDamage
            }),
        });

        if (!response.ok) throw new Error("Error en el combate");
        
        // Esto devuelve: { status, hp, animation, isDisabled, message }
        return await response.json();
        
    } catch (error) {
        console.error("Hubo un problema con el ataque:", error);
        throw error;
    }
}