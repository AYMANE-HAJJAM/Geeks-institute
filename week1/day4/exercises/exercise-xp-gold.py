class BankAccount:
    def __init__(self, balance, username, password, authenticated=False):
        self.balance = balance
        self.username = username
        self.password = password
        self.authenticated = authenticated

    def authenticate(self, username, password):
        if username == self.username and password == self.password:
            self.authenticated = True
            print("Authentication successful.")
        else:
            print("Authentication failed.")

    def deposit(self, amount):
        if not self.authenticated:
            raise Exception("You must be authenticated to perform this action.")
        if amount > 0 and int(amount) == amount:
            self.balance += amount
            print(f"Deposited: {amount}, New Balance: {self.balance}")
        else:
            raise Exception("Invalid deposit amount. Must be a positive integer.")
    def withdraw(self, amount):
        if not self.authenticated:
            raise Exception("You must be authenticated to perform this action.")
        if 0 < amount and int(amount) == amount:
            self.balance -= amount
            print(f"Withdrew: {amount}, New Balance: {self.balance}")
        else:
            raise Exception("Invalid withdrawal amount.")
        
class MinimumBalanceAccount(BankAccount):
    def __init__(self, balance, minimum_balance=0):
        super().__init__(balance)
        self.minimum_balance = minimum_balance

    def withdraw(self, amount):
        if 0 < amount and int(amount) == amount:
            if self.balance - amount < self.minimum_balance:
                raise Exception("Withdrawal would drop balance below minimum.")
            self.balance -= amount
            print(f"Withdrew: {amount}, New Balance: {self.balance}")
        else:
            raise Exception("Invalid withdrawal amount.")
        
class ATM:
    def __init__(self, account_list, try_limit):
        self.account_list = account_list
        self.try_limit = try_limit