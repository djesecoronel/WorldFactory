from src.interfaces.landscape import Landscape

class SpaceStation(Landscape):

    def _init_(self):
        super()._init_()

    def to_dict(self) -> dict:
        return { 
            "name": "Cyberpunk City", 
            "image": "/assets/backgrounds/city.png" 
        }