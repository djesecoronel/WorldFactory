// Definimos la URL base de tu API de Flask
// Por defecto, Flask corre en el puerto 5000
const API_URL = "http://127.0.0.1:5000/TipodeJuego";

/**
 * Función para enviar la selección del mundo al backend.
 * @param {string} worldType - Puede ser 'medieval' o 'futuristic'
 */
export async function createWorldOnBackend(worldType) {
    try {
        const response = await fetch(`${API_URL}/world`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // Enviamos el cuerpo tal como lo espera tu modelo world_model en Flask
            body: JSON.stringify({ 
                world: worldType 
            }),
        });

        // Verificamos si la respuesta es correcta (status 200-299)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.Error || "Error al crear el mundo en el servidor");
        }

        // Retornamos el JSON procesado (el diccionario que devuelve tu GameWorld.play())
        return await response.json();
        
    } catch (error) {
        console.error("Hubo un problema con la petición Fetch:", error);
        throw error; // Re-lanzamos el error para que GamePage pueda manejarlo
    }
}