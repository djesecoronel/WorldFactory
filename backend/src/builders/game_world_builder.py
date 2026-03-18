from src.game_world import GameWorld

from src.factories.world_factory import WorldFactory

class GameWorldBuilder:

    def __init__(self, factory: WorldFactory):
        self.factory= factory
        self.level= 1
        self.difficulty= "normal"
    
    def setLevel(self, level):
        if level:
            self.level= int(level)
        return self
    
    def setDifficulty(self, difficulty):
        if difficulty:
            self.difficulty= difficulty
        return self

    def build(self):
        return GameWorld(self.factory, self.level, self.difficulty)
        