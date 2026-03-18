from src.interfaces.hero import Hero

class Archer(Hero):
    def __init__(self):
        # Mantenemos tu lógica de inicialización heredada
        super().__init__()
        
        # --- ESTADÍSTICAS BASE PARA EL BUILDER ---
        self.base_hp = 80 
        self.base_damage = 15  # El daño base que escalará con el nivel
        
        # Valores iniciales
        self.hp = self.base_hp
        self.max_hp = self.base_hp
        self.damage = self.base_damage
        
        self.difficulty = "normal"
        self.sprite_version = "v1"

        # --- IMPORTANTE: HABILIDADES INICIALES ---
        # Definimos "Attack_1" aquí para que el Builder la vea y el Front cree el botón.
        self.skills = ["Attack_1"] 

    def to_dict(self) -> dict:
        # Aseguramos que level exista
        level = getattr(self, 'level', 1)

        return {
            "name": "Archer",
            "era": "medieval",
            "level": level,
            "hp": self.hp,
            "maxHp": self.max_hp,
            "damage": self.damage,
            "skills": self.skills, # Ahora llevará ["Attack_1", "Idle", "Hurt"] después del Builder
            "difficulty": self.difficulty,
            "spriteVersion": self.sprite_version,
            "spriteConfig": { 
                "Idle": 4, 
                "Attack_1": 5, 
                "Attack_2": 4, 
                "Attack_3": 4,
                "Dead": 6, 
                "Hurt": 2, 
                "Jump": 6, 
                "Protect": 1, 
                "Run": 7,
                "Walk": 6
            },
            # Mantenemos tus anchos personalizados para que no se corten las flechas
            "spriteWidths": {
                "Idle": 150, 
                "Attack_1": 200, 
                "Attack_2": 200, 
                "Attack_3": 200,
                "Dead": 200, 
                "Hurt": 150, 
                "Jump": 150, 
                "Protect": 150, 
                "Run": 150, 
                "Walk": 150
            }
        }