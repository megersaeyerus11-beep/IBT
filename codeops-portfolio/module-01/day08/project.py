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
            if action == "deposit":
                self.balance -= amount
            else:
                self.balance += amount

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

    def leaderboard(self):      # Balance Leaderboard

        return sorted(
            self.accounts.values(),
            key=lambda account: account.balance,
            reverse=True
        )

    def binary_search(self, acc_no):       # Binary Search by Account Number
        accounts = sorted(
            self.accounts.values(),
            key=lambda account: account.acc_no
        )

        left = 0
        right = len(accounts) - 1

        while left <= right:
            mid = (left + right) // 2

            if accounts[mid].acc_no == acc_no:
                return accounts[mid]
            elif accounts[mid].acc_no < acc_no:
                left = mid + 1
            else:
                right = mid - 1

        return None


def transaction_total(history):       # Recursive Transaction Total

    if len(history) == 0:
        return 0

    return history[0][1] + transaction_total(history[1:])



registry = AccountRegistry()

a1 = Account("Eyerus", "A1", 5000)
a2 = Account("Hermon", "S1", 4000)
a3 = Account("Ermi", "B1", 7000)

registry.add(a1)
registry.add(a2)
registry.add(a3)

a1.deposit(1000)
a1.withdraw(500)

print("Leaderboard")
for account in registry.leaderboard():
    print(account.owner, account.balance)

print()

result = registry.binary_search("B1")
if result:
    print("Found:", result.owner, result.balance)

print()

print("Transaction Total:", transaction_total(a1.history))