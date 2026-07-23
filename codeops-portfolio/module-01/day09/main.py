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


def total_balance(branch):
    total = 0
    for account in branch.accounts:
        total += account.balance
    for child in branch.children:
        total += total_balance(child)
    return total


transfers = {
    "CBE-1": ["CBE-2", "CBE-3"],
    "CBE-2": ["CBE-1", "CBE-4"],
    "CBE-3": ["CBE-1"],
    "CBE-4": ["CBE-2", "CBE-5"],
    "CBE-5": ["CBE-4"]
}


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


a1 = Account("Eyerus", "CBE-1", 5000)
a2 = Account("Hermon", "CBE-2", 7000)
a3 = Account("Ermi", "CBE-3", 3000)
a4 = Account("Haymi", "CBE-4", 9000)
a5 = Account("Koki", "CBE-5", 4000)


head_office = Branch("Head Office")

addis = Branch("Addis Region")
oromia = Branch("Oromia Region")

head_office.add_branch(addis)
head_office.add_branch(oromia)


addis_branch = Branch("Addis Main Branch")
oromia_branch = Branch("Oromia Main Branch")


addis.add_branch(addis_branch)
oromia.add_branch(oromia_branch)

addis_branch.add_account(a1)
addis_branch.add_account(a2)

oromia_branch.add_account(a3)
oromia_branch.add_account(a4)
oromia_branch.add_account(a5)


print("Bank Total Balance:")
print(total_balance(head_office))


print("\nCBE-1 can reach:")
print(bfs(transfers, "CBE-1"))