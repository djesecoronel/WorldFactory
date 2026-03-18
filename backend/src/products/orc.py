from src.interfaces.enemy import Enemy

class Orc(Enemy):

    def to_dict(self) -> dict:
        return {
            "name": "Orc",
            "era": "medieval",
            "spriteConfig": { 
                "Idle": 5, 
            },
            "spriteWidths": {
                "Idle": 150,
            }
        }