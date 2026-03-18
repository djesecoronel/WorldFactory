from abc import ABC, abstractmethod

class Hero(ABC):

    def _init_(self):
        pass

    @abstractmethod
    def to_dict() -> str:
        pass