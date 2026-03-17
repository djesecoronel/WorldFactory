from abc import ABC, abstractmethod

from src.interfaces.landscape import Landscape
from src.interfaces.enemy import Enemy
from src.interfaces.hero import Hero

class WorldFactory(ABC):

    @abstractmethod
    def create_landscape(self) -> Landscape:
        pass
    
    @abstractmethod
    def create_enemy(self) -> Enemy:
        pass

    @abstractmethod
    def create_hero(self) -> Hero:
        pass