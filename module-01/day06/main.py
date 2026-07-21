
class SMSAlert:
    def update(self, message):
        print("SMS Alert:", message)

class AlertService:
    def send(self, message):
        print("Alert:", message)

class Account:
    def __init__(self, owner, acc_no, balance):
        self.owner = owner
        self.acc_no = acc_no
        self._balance = balance
        self.subscribers = []

    @property
    def balance(self):
        return self._balance

    def subscribe(self, subscriber):
        self.subscribers.append(subscriber)

    def _notify(self, message):
        for subscriber in self.subscribers:
            subscriber.update(message)

    def deposit(self, amount):
        self._balance += amount
        self._notify(f"{self.owner} deposited {amount} ETB")

    def withdraw(self, amount):
        if amount <= self._balance:
            self._balance -= amount
            self._notify(f"{self.owner} withdrew {amount} ETB")
        else:
            print("Insufficient balance")

    def statement(self):
        print(f"Regular | {self.owner} | {self.balance} ETB")

class SavingsAccount(Account):
    def __init__(self, owner, acc_no, balance, rate):
        super().__init__(owner, acc_no, balance)
        self.rate = rate

    def add_interest(self):
        interest = self.balance * self.rate
        self._balance += interest
        self._notify(f"Interest added: {interest} ETB")

    def statement(self):
        print(f"Savings | {self.owner} | {self.balance} ETB")

class CurrentAccount(Account):
    def __init__(self, owner, acc_no, balance, overdraft):
        super().__init__(owner, acc_no, balance)
        self.overdraft = overdraft

    def withdraw(self, amount):
        if amount <= self.balance + self.overdraft:
            self._balance -= amount
            self._notify(f"{self.owner} withdrew {amount} ETB")
        else:
            print("Overdraft limit exceeded")

    def statement(self):
        print(f"Current | {self.owner} | {self.balance} ETB")

class AccountFactory:
    @staticmethod
    def create(kind, owner, acc_no, balance):
        if kind.lower() == "regular":
            return Account(owner, acc_no, balance)
        elif kind.lower() == "savings":
            return SavingsAccount(owner, acc_no, balance, 0.05)
        elif kind.lower() == "current":
            return CurrentAccount(owner, acc_no, balance, 1000)
        else:
            raise ValueError("Invalid account type")

acc1 = AccountFactory.create("regular", "Eyerus", "A1", 5000)
acc2 = AccountFactory.create("savings", "Hermon", "S1", 4000)
acc3 = AccountFactory.create("current", "Haymi", "C1", 3000)


acc1.deposit(500)
acc2.add_interest()
acc3.withdraw(3500)


accounts = [acc1, acc2, acc3]

print("\nAccount Statements")
for acc in accounts:
    acc.statement()