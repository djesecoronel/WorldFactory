from src.factory.world_factory import WorldFactory

from src.products.castle import Castle
from src.products.orc import Orc
from src.products.archer import Archer

class MedievalWorld(WorldFactory):

    def create_landscape(self):
        return Castle()

    def create_enemy(self):
        return Orc()
    
    def create_hero(self):
        return Archer()

