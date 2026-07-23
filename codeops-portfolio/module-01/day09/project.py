from collections import deque

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


class Branch:
    def __init__(self, name):
        self.name = name
        self.accounts = []
        self.children = []

    def add_account(self, account):
        self.accounts.append(account)

    def add_branch(self, branch):
        self.children.append(branch)


def branch_balance_total(branch):

    total = 0

    for account in branch.accounts:
        total += account.balance

    for child in branch.children:
        total += branch_balance_total(child)

    return total


class TransferGraph:
    def __init__(self):
        self.graph = {}

    def add_account(self, acc_no):
        if acc_no not in self.graph:
            self.graph[acc_no] = []

    def add_transfer(self, from_acc, to_acc):
        self.graph[from_acc].append(to_acc)
        self.graph[to_acc].append(from_acc)

def bfs(graph, start):

    visited = set()
    queue = deque([start])
    visited.add(start)
    while queue:
        current = queue.popleft()
        for neighbor in graph[current]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return visited


a1 = Account("Eyerus", "A1", 5000)
a2 = Account("Hermon", "A2", 7000)
a3 = Account("Ermi", "A3", 3000)
a4 = Account("Haymi", "A4", 9000)


registry = AccountRegistry()

registry.add(a1)
registry.add(a2)
registry.add(a3)
registry.add(a4)



main_branch = Branch("Head Office")

east_branch = Branch("East Branch")
west_branch = Branch("West Branch")


main_branch.add_branch(east_branch)
main_branch.add_branch(west_branch)


east_branch.add_account(a1)
east_branch.add_account(a2)

west_branch.add_account(a3)
west_branch.add_account(a4)


print("Branch Total Balance:")
print(branch_balance_total(main_branch))



transfers = TransferGraph()

for acc in registry.accounts:
    transfers.add_account(acc)


transfers.add_transfer("A1", "A2")
transfers.add_transfer("A2", "A3")
transfers.add_transfer("A3", "A4")


print("\nTransfer Connections:")
print(bfs(transfers.graph, "A1"))