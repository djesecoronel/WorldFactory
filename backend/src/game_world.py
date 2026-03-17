from typing import Final

from src.interfaces.enemy import Enemy
from src.interfaces.hero import Hero
from src.interfaces.landscape import Landscape

from src.factory.world_factory import WorldFactory

class GameWorld:
    def __init__(self, factory):
        self.factory = factory

    def play(self):
        landscape = self.factory.create_landscape()
        enemy = self.factory.create_enemy()
        hero = self.factory.create_hero()

        # Retornamos diccionarios con la info que el Front necesita
        return {
            "landscape": {
                "name": landscape.__class__.__name__,
                "image": f"/images/{landscape.__class__.__name__.lower()}.png"
            },
            "enemy": {
                "name": enemy.__class__.__name__,
                "image": f"/images/{enemy.__class__.__name__.lower()}.png"
            },
            "hero": {
                "name": hero.__class__.__name__,
                "image": f"/images/{hero.__class__.__name__.lower()}.png"
            }
        }