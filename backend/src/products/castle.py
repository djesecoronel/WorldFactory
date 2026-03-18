from src.interfaces.landscape import Landscape

class Castle(Landscape):

    def to_dict(self) -> dict:
         return { 
              "name": "Castle", 
              "image": "/assets/backgrounds/castle.png" 
            }