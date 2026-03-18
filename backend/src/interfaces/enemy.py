from abc import ABC, abstractmethod

class Enemy(ABC):
    def __init__(self):
        self.level = 1
        self.hp = 100
        self.max_hp = 100
        self.is_alive = True  # <--- Nuevo: Control de estado
        self.current_animation = "Idle" # <--- Nuevo: Para avisar al frontend qué hacer
        self.skills = ["Idle", "Hurt"] # Habilidades básicas por defecto
        self.difficulty = "normal"
        self.sprite_version = "v1"

    @abstractmethod
    def to_dict(self) -> dict:
        pass