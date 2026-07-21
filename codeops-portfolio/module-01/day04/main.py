
class Account:
    def __init__(self, owner, account_number, balance):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance  # Private balance

    @property
    def balance(self):
        return self.__balance

    # Deposit money
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print(f"{self.owner}: Deposited {amount} ETB")
        else:
            print(f"{self.owner}: Deposit amount must be greater than 0.")

    # Withdraw money
    def withdraw(self, amount):
        if amount <= 0:
            print(f"{self.owner}: Withdrawal amount must be greater than 0.")
        elif amount > self.__balance:
            print(f"{self.owner}: Insufficient balance.")
        else:
            self.__balance -= amount
            print(f"{self.owner}: Withdrawn {amount} ETB")

    # Display account details
    def show_account(self):
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.__balance:.2f} ETB")
        print("-" * 30)


# Create two accounts
account1 = Account("Eyerus", "ACC001", 5000)
account2 = Account("Hermon", "ACC002", 3000)

# Initial account details
print("Initial Account Details")
account1.show_account()
account2.show_account()

# Transactions
account1.deposit(1500)
account1.withdraw(2000)
account1.withdraw(10000)   # Overdraft
account1.deposit(-500)     # Invalid deposit

account2.deposit(500)
account2.withdraw(1000)
account2.withdraw(-100)    # Invalid withdrawal

# Final account details
print("\nFinal Account Details")
account1.show_account()
account2.show_account()