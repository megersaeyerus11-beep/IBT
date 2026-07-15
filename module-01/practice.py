#Q1 Book class
class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages

    def describe(self):
    print(f"Title: {self.title}, Author: {self.author}, Pages: {self.pages}")

book1 = Book("ermiyas", "haymanot", 208)
book2 = Book("eyerus", "hermon", 300)

book1.describe()
book2.describe()


#Q2
class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity

    def restock(self, n):
        self.quantity += n
        print(f"{n} items added. New quantity: {self.quantity}")

    def sell(self, n):
        if n <= self.quantity:
            self.quantity -= n
            print(f"{n} items sold. Remaining quantity: {self.quantity}")
        else:
            print("Not enough stock available.")


      # Create a product
product1 = Product("Laptop", 50000, 10)

      # Show initial details
print(product1.name, product1.price, "ETB", product1.quantity, "pcs")

       # Restock and sell
product1.restock(5)
product1.sell(3)

#Q3
class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.__quantity = quantity   # private variable

    @property
    def quantity(self):
        return self.__quantity       # getter

    def restock(self, n):
        self.__quantity += n
        print(f"Restocked. New quantity: {self.__quantity} pcs")

    def sell(self, n):
        if n <= self.__quantity:
            self.__quantity -= n
            print(f"Sold {n} pcs. Remaining: {self.__quantity} pcs")
        else:
            print("Not enough stock")


# Create product
product1 = Product("Laptop", 50000, 10)

print("Quantity:", product1.quantity)

product1.restock(5)
product1.sell(3)





#Q4
class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.__quantity = quantity

    @property                #Private variable
    def quantity(self):
        return self.__quantity

    @quantity.setter
    def quantity(self, value):
        if value >= 0:
            self.__quantity = value
        else:
            print("Quantity cannot be below zero.")

    def restock(self, n):
        self.quantity = self.__quantity + n
        print(f"Restocked. New quantity: {self.quantity} pcs")

    def sell(self, n):
        if self.quantity - n >= 0:
            self.quantity = self.quantity - n
            print(f"Sold {n} pcs. Remaining: {self.quantity} pcs")
        else:
            print("Not enough stock available.")


# Create product
product1 = Product("Laptop", 50000, 10)

print("Current quantity:", product1.quantity)

product1.sell(5)
product1.sell(10)   # This will be refused
product1.restock(20)

#Q5
class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity

    def show(self):
        print(f"{self.name}: {self.quantity} pcs")


# Create Product objects
product1 = Product("Laptop", 50000, 10)
product2 = Product("Phone", 20000, 20)
product3 = Product("Tablet", 15000, 15)

# original quantities
print("Before change:")
product1.show()
product2.show()
product3.show()

# Change only product1 quantity
product1.quantity = 5

print("\nAfter changing product1:")
product1.show()
product2.show()
product3.show()