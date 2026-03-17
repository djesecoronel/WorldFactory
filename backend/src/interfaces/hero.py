from abc import ABC, abstractmethod

class Hero(ABC):

    def __init__(self):
        pass

    @abstractmethod
    def defend() -> str:
        pass