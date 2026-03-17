import WorldFactory from "./WorldFactory";

export default class MedievalWorldFactory extends WorldFactory {
    createHero() {
        return {
            name: "Archer",
            era: "medieval",
            // Cantidad de cuadros (frames) que tiene cada imagen horizontal:
            spriteConfig: { 
                Idle: 4, 
                Attack_1: 5, 
                Attack_2: 4, 
                Attack_3: 4,
                Dead: 6, 
                Hurt: 2, 
                Jump: 6, 
                Protect: 1, 
                Run: 7,
                Walk: 6
            },
            spriteWidths: {
                Idle: 150, Attack_1: 200, Attack_2: 200, Attack_3: 200,
                Dead: 200, Hurt: 150, Jump: 150, Protect: 150, Run: 150, Walk: 150
            }
        };
    }

    createEnemy() {
        return {
            name: "Orc",
            era: "medieval",
            spriteConfig: { 
                Idle: 5, // Ajustado a los 5 cuadros que vimos en el archivo
                // ... otras acciones
            },
            spriteWidths: {
                Idle: 150, // Resultado de 750 / 5
                // ... otras acciones
            }
        };
    }

    createLandscape() {
        return { name: "Castle", image: "/assets/backgrounds/castle.png" };
    }
}