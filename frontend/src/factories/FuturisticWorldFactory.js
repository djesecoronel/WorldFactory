import WorldFactory from "./WorldFactory";

export default class FuturisticWorldFactory extends WorldFactory {

    createHero() {
        return {
            name: "Yedai",
            era: "futuristic",
            spriteConfig: { 
                Idle: 9, 
                Shot_1: 6, // ¡Asegúrate de que este número sea el correcto para el ataque!
            },
            spriteWidths: {
                Idle: 150, 
                Shot_1: 150, // Ajusta si el ataque es más ancho o más estrecho
            }
        };
    }

    createEnemy() {
        return {
            name: "Droide",
            era: "futuristic",
            spriteConfig: { 
                Idle: 5, // Según tu archivo, este tiene 5
            },
            spriteWidths: {
                Idle: 150, // Resultado de tu división (Ancho Total / 5)
            }
        };
    }

    createLandscape() {
        return { name: "Cyberpunk City", image: "/assets/backgrounds/city.png" };
    }
}