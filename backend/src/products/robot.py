from src.interfaces.enemy import Enemy

class Robot(Enemy):
    def __init__(self):
        # 1. Inicializamos la interfaz base
        super().__init__()
        
        # 2. Información básica y estadísticas
        self._name = "Robot"
        self._era = "futuristic"
        self.base_hp = 120 
        self.base_damage = 20
        
        # 3. Sincronizamos valores iniciales
        self.hp = self.base_hp
        self.max_hp = self.base_hp
        self.damage = self.base_damage
        self.difficulty = "normal"
        
        # Atributos privados para el manejo dinámico (Patrón Builder compatible)
        self._sprite_version = "v1"
        self._spriteConfig = {}
        self._spriteWidths = {}

        # Inicializamos la configuración de frames por primera vez
        self._update_sprite_config()

    @property
    def sprite_version(self):
        return self._sprite_version

    @sprite_version.setter
    def sprite_version(self, value):
        """
        Cada vez que el Builder asigne una versión, los frames se recalculan.
        Esto evita el 'efecto cinta' automáticamente.
        """
        self._sprite_version = value
        self._update_sprite_config()

    def _update_sprite_config(self):
        """
        Diccionario centralizado con los frames exactos que me pasaste:
        v1: 5, v2: 6, v3: 5
        """
        configs = {
            "v1": {
                "Idle": 5,
                "Attack": 4, # Ajusta a Attack_1 si tus archivos llevan el _1
                "Hurt": 3,
                "Dead": 7
            },
            "v2": {
                "Idle": 6,   # Tus 6 frames para el v2
                "Attack": 5, 
                "Hurt": 4,
                "Dead": 5
            },
            "v3": {
                "Idle": 5,   # Tus 5 frames para el v3
                "Attack": 6, 
                "Hurt": 3,
                "Dead": 4
            }
        }
        
        # Seleccionamos la config según la versión o v1 por defecto
        self._spriteConfig = configs.get(self._sprite_version, configs["v1"])
        
        # Generamos los anchos automáticamente para todos los estados
        self._spriteWidths = {key: 150 for key in self._spriteConfig.keys()}

    def to_dict(self) -> dict:
        return {
            "name": self._name,
            "type": "Robot Unit",
            "era": self._era,
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