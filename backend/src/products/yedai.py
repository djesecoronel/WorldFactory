from src.interfaces.hero import Hero

class Yedai(Hero):
    def __init__(self):
        super().__init__()
        
        # --- ESTADÍSTICAS BASE ---
        self.base_hp = 120 
        self.base_damage = 25 
        
        # Valores iniciales
        self.hp = self.base_hp
        self.max_hp = self.base_hp
        self.damage = self.base_damage
        self.difficulty = "normal"
        
        # IMPORTANTE: Solo ponemos las skills de ataque que queremos como botones.
        # Quitamos "Hurt" y "Idle" de aquí para que no salgan como botones de ataque,
        # pero las dejamos en el sprite_config para que la animación funcione.
        self.skills = ["Shot_1"] 
        
        self._sprite_version = "v1"
        self.sprite_config = {}
        
        self._update_sprite_config()

    @property
    def sprite_version(self):
        return self._sprite_version

    @sprite_version.setter
    def sprite_version(self, value):
        self._sprite_version = value
        self._update_sprite_config()

    def _update_sprite_config(self):
        # Aquí definimos cuántos frames tiene cada archivo .png
        configs = {
            "v1": {
                "Idle": 7,
                "Shot_1": 4,  
                "Hurt": 3,
                "Dead": 5
            },
            "v2": {
                "Idle": 9,   
                "Shot_1": 4,  
                "Hurt": 4,
                "Dead": 7
            },
            "v3": {
                "Idle": 7,
                "Shot_1": 4,
                "Hurt": 3,
                "Dead": 6
            }
        }
        self.sprite_config = configs.get(self._sprite_version, configs["v1"])

    def defend(self):
        return "Este Yedai defiende contra robots"
    
    def to_dict(self):
        level = getattr(self, 'level', 1) 
        
        return {
            "name": "Yedai",
            "era": "futuristic",
            "level": level,
            "hp": self.hp,
            "maxHp": self.max_hp,
            "damage": self.damage,
            "skills": self.skills, # Devolverá ["Shot_1"]
            "difficulty": self.difficulty,
            "spriteVersion": self.sprite_version,
            "spriteConfig": self.sprite_config,
            # Aseguramos 150px para que el sprite no se corte
            "spriteWidth": 150, 
            "spriteHeight": 150
        }