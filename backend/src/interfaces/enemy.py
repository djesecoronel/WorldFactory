from abc import ABC, abstractmethod

class Enemy(ABC):
    
    def _init_(self):
        pass

    @abstractmethod
    def to_dict() -> dict:
        pass