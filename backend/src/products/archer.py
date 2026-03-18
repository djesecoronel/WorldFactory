from src.interfaces.hero import Hero

class Archer(Hero):

    def to_dict(self) -> dict:
        return {
            "name": "Archer",
            "era": "medieval",
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