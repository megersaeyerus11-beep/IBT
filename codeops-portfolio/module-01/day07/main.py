class Account:
    def __init__(self, owner, acc_no, balance):
        self.owner = owner
        self.acc_no = acc_no
        self.balance = balance
        self.history = []

    def deposit(self, amount):
        self.balance += amount
        self.history.append(("deposit", amount))

    def withdraw(self, amount):
        self.balance -= amount
        self.history.append(("withdraw", amount))

    def undo_last(self):
        if self.history:
            action, amount = self.history.pop()
            self.balance -= amount if action == "deposit" else -amount

    def statement(self):
        print(self.owner, self.acc_no, self.balance)


class AccountRegistry:
    def __init__(self):
        self.accounts = {}

    def add(self, account):
        self.accounts[account.acc_no] = account

    def find(self, acc_no):
        return self.accounts.get(acc_no)

    def list_all(self):
        return list(self.accounts.values())

        from bank import Account, AccountRegistry

registry = AccountRegistry()

a1 = Account("Eyerus", "A1", 5000)
a2 = Account("Hermon", "S1", 4000)

registry.add(a1)
registry.add(a2)

a1.deposit(500)
a1.withdraw(200)

a1.undo_last()

for acc in registry.list_all():
    acc.statement()