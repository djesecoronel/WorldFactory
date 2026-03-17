from abc import ABC, abstractmethod

class Landscape(ABC):

    def __init__(self):
        pass
    
    @abstractmethod
    def describe() -> str:
        pass