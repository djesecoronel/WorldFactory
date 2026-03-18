from src.game_world import GameWorld
from src.factories.world_factory import WorldFactory

class GameWorldBuilder:

    def __init__(self, factory: WorldFactory):
        self.factory = factory
        self.level = 1
        self.difficulty = "normal"
    
    def setLevel(self, level):
        if level:
            self.level = int(level)
        return self
    
    def setDifficulty(self, difficulty):
        if difficulty:
            self.difficulty = difficulty.lower()
        return self

    def build(self):
        # 1. Instancia base
        world = GameWorld(self.factory, self.level, self.difficulty)
        
        # 2. Mapa de versiones
        version_map = {
            "easy": "v1",
            "normal": "v2",
            "hard": "v3"
        }
        selected_version = version_map.get(self.difficulty, "v1")

        # 3. Configuración y Escalado
        characters = []
        if hasattr(world, 'hero') and world.hero: characters.append(world.hero)
        if hasattr(world, 'enemy') and world.enemy: characters.append(world.enemy)

        for char in characters:
            char.difficulty = self.difficulty
            char.sprite_version = selected_version
            char.level = self.level

            # --- Lógica de Vida ---
            life_multiplier = self.level
            if self.difficulty == "hard":
                life_multiplier *= 1.5
            
            char.max_hp = int(char.base_hp * life_multiplier)
            char.hp = char.max_hp

            # --- Lógica de Daño ---
            damage_multiplier = 1 + (self.level - 1) * 0.2
            char.damage = int(char.base_damage * damage_multiplier)

            # --- GESTIÓN DE SKILLS (BOTONES REALES) ---
            # Limpiamos la lista de skills de "Idle" y "Hurt" si llegaran a estar.
            # Esto evita que aparezcan botones que no hacen daño.
            
            char.skills = [s for s in char.skills if s not in ["Idle", "Hurt"]]

            # Lógica de desbloqueo por nivel (Solo ataques)
            if self.level >= 5:
                if "Attack_2" not in char.skills:
                    char.skills.append("Attack_2")
            
            if self.level >= 10:
                if "Attack_3" not in char.skills:
                    char.skills.append("Attack_3")
                if "Protect" not in char.skills:
                    char.skills.append("Protect")

        return world