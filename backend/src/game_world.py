from src.interfaces.enemy import Enemy
from src.interfaces.hero import Hero
from src.interfaces.landscape import Landscape
from src.factories.world_factory import WorldFactory

class GameWorld:
    def __init__(self, factory: WorldFactory, level, difficulty):
        self.factory = factory
        self.level = level
        self.difficulty = difficulty
        
        # Creamos las instancias como atributos de la clase usando la Factory
        self.landscape = self.factory.create_landscape()
        self.enemy = self.factory.create_enemy()
        self.hero = self.factory.create_hero()

    def play(self):
        # Ahora usamos los atributos almacenados en self
        # Gracias al Builder, hero.to_dict() y enemy.to_dict() ya traen 
        # el HP y el Damage calculados según el nivel y dificultad.
        return {
            "level": self.level,
            "difficulty": self.difficulty,
            "landscape": self.landscape.to_dict(),
            "enemy": self.enemy.to_dict(),
            "hero": self.hero.to_dict()
        }