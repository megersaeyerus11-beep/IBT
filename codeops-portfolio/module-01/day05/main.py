class Account:
    def __init__(self, owner, acc_no, balance):
        self.owner = owner
        self.acc_no = acc_no
        self._balance = balance

    @property
    def balance(self):
        return self._balance

    def deposit(self, amount):
        self._balance += amount

    def withdraw(self, amount):
        if amount <= self._balance:
            self._balance -= amount
        else:
            print("Insufficient balance")

    def statement(self):
        print(f"Regular | {self.owner} | {self.balance} ETB")

class SavingsAccount(Account):
    def __init__(self, owner, acc_no, balance, rate):
        super().__init__(owner, acc_no, balance)
        self.rate = rate

    def add_interest(self):
        self._balance += self.balance * self.rate

    def statement(self):
        print(f"Savings | {self.owner} | {self.balance} ETB")


class CurrentAccount(Account):
    def __init__(self, owner, acc_no, balance, overdraft):
        super().__init__(owner, acc_no, balance)
        self.overdraft = overdraft

    def withdraw(self, amount):
        if amount <= self.balance + self.overdraft:
            self._balance -= amount
        else:
            print("Overdraft limit exceeded")

    def statement(self):
        print(f"Current | {self.owner} | {self.balance} ETB")



accounts = [
    Account("Eyerus", "A1", 5000),
    SavingsAccount("Hermon", "S1", 4000, 0.05),
    CurrentAccount("Haymi", "C1", 3000, 1000)
]

accounts[1].add_interest()
accounts[2].withdraw(3500)

for acc in accounts:
    acc.statement()