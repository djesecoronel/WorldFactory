from src.interfaces.hero import Hero

class Yedai(Hero):

    def __init__(self):
        super()._init_()

    def defend():
        return "Este Yedai defiende contra robots"
    
    def to_dict(self):
        return {
            "name": "Yedai",
            "era": "futuristic",
            "spriteConfig": { 
                "Idle": 9, 
                "Shot_1": 6
            },
            "spriteWidths": {
                "Idle": 150, 
                "Shot_1": 150
            }
        }