#Q1
 class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance


class AccountSaver:
    def save(self, account):
        print("Account saved.")


class AccountPrinter:
    def print_account(self, account):
        print(f"Owner: {account.owner}, Balance: {account.balance}")


account = BankAccount("Hermon", 5000)
AccountPrinter().print_account(account)
AccountSaver().save(account)

#Q2

import math

class Shape:
    def area(self):
        raise NotImplementedError("Subclasses must implement area().")

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return math.pi * self.radius ** 2

def print_area(shape):
    print("Area:", shape.area())

circle = Circle(5)
print_area(circle)

#Q3

class AppSettings:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.currency = "ETB"
            cls._instance.language = "English"
        return cls._instance


billing = AppSettings()
print("Billing Currency:", billing.currency)

sales = AppSettings()
print("Sales Currency:", sales.currency)

billing.currency = "USD"

print("Sales Currency after update:", sales.currency)

print(billing is sales)

#Q4
class Circle:
    def draw(self):
        return "Drawing Circle"


class Square:
    def draw(self):
        return "Drawing Square"


class Triangle:
    def draw(self):
        return "Drawing Triangle"


class ShapeFactory:
    @staticmethod
    def create(shape_type):
        shape_type = shape_type.lower()

        if shape_type == "circle":
            return Circle()
        elif shape_type == "square":
            return Square()
        elif shape_type == "triangle":
            return Triangle()
        else:
            raise ValueError("Invalid shape type")


shape1 = ShapeFactory.create("circle")
shape2 = ShapeFactory.create("square")
shape3 = ShapeFactory.create("triangle")

print(shape1.draw())
print(shape2.draw())
print(shape3.draw())

#Q5 Subject
class NewsAgency:
    def __init__(self):
        self.subscribers = []

    def subscribe(self, subscriber):
        self.subscribers.append(subscriber)

    def notify(self, news):
        for subscriber in self.subscribers:
            subscriber.update(news)


class EmailSubscriber:
    def update(self, news):
        print("Email:", news)


class SMSSubscriber:
    def update(self, news):
        print("SMS:", news)


agency = NewsAgency()

agency.subscribe(EmailSubscriber())
agency.subscribe(SMSSubscriber())

agency.notify("New news available!")