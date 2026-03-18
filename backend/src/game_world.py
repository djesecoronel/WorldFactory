from src.interfaces.enemy import Enemy
from src.interfaces.hero import Hero
from src.interfaces.landscape import Landscape

from src.factories.world_factory import WorldFactory

class GameWorld:
    def __init__(self, factory: WorldFactory, level, difficulty):
        self.factory = factory
        self.level= level
        self.difficulty= difficulty

    def play(self):
        landscape = self.factory.create_landscape()
        enemy = self.factory.create_enemy()
        hero = self.factory.create_hero()

        return {
            "level": self.level,
            "difficulty": self.difficulty,
            "landscape": landscape.to_dict(),
            "enemy": enemy.to_dict(),
            "hero": hero.to_dict()
        }