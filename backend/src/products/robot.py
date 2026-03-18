from src.interfaces.enemy import Enemy

class Robot(Enemy):

    _name: str
    _era: str
    _spriteConfig: dict
    _spriteWidths: dict
    _stats: dict

    def __init__(self):
        self._name= "Robot"
        self._era= "futuristic"
        self._spriteConfig= {
            "Idle": 9,
        }
        self._spriteWidths= {
            "Idle": 150,
        }
        self._stats= {
            "hp": 100,
            "attack": 20,
            "defend": 5
        }

    def to_dict(self) -> dict:
        return {
            "name": self._name,
            "era": self._era,
            "spriteConfig": self._spriteConfig,
            "spriteWidths": self._spriteWidths,
            "stats": self._stats
        }