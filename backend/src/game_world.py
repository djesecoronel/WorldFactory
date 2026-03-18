from src.interfaces.enemy import Enemy
from src.interfaces.hero import Hero
from src.interfaces.landscape import Landscape

from src.factories.world_factory import WorldFactory

class GameWorld:
    def _init_(self, factory):
        self.factory = factory

    def play(self):
        landscape = self.factory.create_landscape()
        enemy = self.factory.create_enemy()
        hero = self.factory.create_hero()

        return {
            "landscape": landscape.to_dict(),
            "enemy": enemy.to_dict(),
            "hero": hero.to_dict()
        }