class Account:
    def __init__(self, owner, balance):
        self.owner = owner
        self.__balance = balance   # Private balance

    @property
    def balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print(f"Deposited {amount} ETB")
        else:
            print("Invalid deposit amount")

    def withdraw(self, amount):
        if amount <= self.__balance:
            self.__balance -= amount
            print(f"Withdrawn {amount} ETB")
        else:
            print("Insufficient balance")

    def show_account(self):
        print(f"Owner: {self.owner}, Balance: {self.__balance} ETB")


account1 = Account("Eyerus", 5000)

account1.show_account()

account1.deposit(2000)

account1.withdraw(1000)

print("Final balance:", account1.balance, "ETB")