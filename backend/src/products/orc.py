from src.interfaces.enemy import Enemy

class Orc(Enemy):
    def __init__(self):
        # 1. Inicializamos la interfaz base
        super().__init__()
        
        # --- ATRIBUTOS BASE PARA EL BUILDER ---
        self.base_hp = 100 
        self.base_damage = 12 
        
        # 2. Valores iniciales
        self.hp = self.base_hp
        self.max_hp = self.base_hp
        self.damage = self.base_damage
        self.difficulty = "normal"
        
        # Atributos para el manejo dinámico de sprites
        self._sprite_version = "v1"
        self._spriteConfig = {}
        self._spriteWidths = {}

        # Sincronizamos frames por primera vez
        self._update_sprite_config()

    @property
    def sprite_version(self):
        return self._sprite_version

    @sprite_version.setter
    def sprite_version(self, value):
        """Al cambiar la versión, ajustamos los frames de muerte"""
        self._sprite_version = value
        self._update_sprite_config()

    def _update_sprite_config(self):
        """
        Configuración de frames de MUERTE (Dead):
        v1: 4 frames, v2: 5 frames, v3: 4 frames
        """
        configs = {
            "v1": {
                "Idle": 5, 
                "Attack_1": 4, 
                "Hurt": 2,
                "Dead": 4    
            },
            "v2": {
                "Idle": 5, 
                "Attack_1": 5, 
                "Hurt": 2,
                "Dead": 5   
            },
            "v3": {
                "Idle": 5, 
                "Attack_1": 4, 
                "Hurt": 2,
                "Dead": 4  
            }
        }
        
        self._spriteConfig = configs.get(self._sprite_version, configs["v1"])
        self._spriteWidths = {key: 150 for key in self._spriteConfig.keys()}

    def to_dict(self) -> dict:
        return {
            "name": "Iron Orc",
            "type": "Orc",
            "era": "medieval",
            "level": self.level,
            "hp": self.hp,
            "maxHp": self.max_hp,
            "damage": self.damage,
            "skills": self.skills,
            "difficulty": self.difficulty,
            "spriteVersion": self.sprite_version, 
            "spriteConfig": self._spriteConfig,
            "spriteWidths": self._spriteWidths
        }