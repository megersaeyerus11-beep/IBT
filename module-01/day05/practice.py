from abc import ABC, abstractmethod

# Base class (Abstract)
class Vehicle(ABC):
    def __init__(self, make, model):
        self.make = make
        self.model = model

    def describe(self):
        print(f"{self.make} {self.model}")

    @abstractmethod
    def wheels(self):
        pass


# Car subclass
class Car(Vehicle):
    def wheels(self):
        return 4


# Truck subclass
class Truck(Vehicle):
    def __init__(self, make, model, capacity):
        super().__init__(make, model)
        self.capacity = capacity

    def describe(self):
        print(f"{self.make} {self.model}, Capacity: {self.capacity} tons")

    def wheels(self):
        return 6


# Create vehicles
vehicles = [
    Car("Toyota", "Corolla"),
    Car("Honda", "Civic"),
    Truck("Volvo", "FH16", 20)
]
 
 # Polymorphism  
for vehicle in vehicles:
    vehicle.describe()
    print("Wheels:", vehicle.wheels())