from src.factories.world_factory import WorldFactory

from src.products.space_station import SpaceStation
from src.products.robot import Robot
from src.products.yedai import Yedai


class FuturisticWorld(WorldFactory):

    def create_landscape(self):
        return SpaceStation()

    def create_enemy(self):
        return Robot()
    
    def create_hero(self):
        return Yedai()