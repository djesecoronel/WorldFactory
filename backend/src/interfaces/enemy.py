from abc import ABC, abstractmethod

class Enemy(ABC):
    
    def __init__(self):
        pass

    @abstractmethod
    def attack() -> str:
        pass