from abc import ABC, abstractmethod

class Hero(ABC):
    def __init__(self):
        self.level = 1
        self.hp = 100
        self.max_hp = 100
        self.base_hp = 100      # Asegúrate de tener estas bases para que el builder no rompa
        self.base_damage = 10   # Asegúrate de tener estas bases
        self.skills = []        # Se llenará en la clase hija (ej: Yedai pondrá "Shot_1")
        self.difficulty = "normal"
        self.sprite_version = "v1"

    @abstractmethod
    def to_dict(self) -> dict:
        pass