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
    def __init__(self, account_list, try_limit=2):
        if not all(isinstance(acc, BankAccount) for acc in account_list):
            raise Exception("All accounts must be instances of BankAccount or MinimumBalanceAccount.")
        self.account_list = account_list
        self.try_limit = try_limit if isinstance(try_limit, int) and try_limit > 0 else 2
        self.current_tries = 0
        self.show_main_menu()

    def show_main_menu(self):
        while True:
            print("\n=== ATM Main Menu ===")
            print("1. Log in")
            print("2. Exit")
            choice = input("Select option: ")

            if choice == "1":
                username = input("Enter username: ")
                password = input("Enter password: ")
                self.log_in(username, password)
            elif choice == "2":
                print("Thank you for using our ATM.")
                break
            else:
                print("Invalid choice, try again.")

    def log_in(self, username, password):
        for account in self.account_list:
            if username == account.username and password == account.password:
                account.authenticate(username, password)
                if account.authenticated:
                    self.show_account_menu(account)
                    return
        self.current_tries += 1
        print(f"Invalid credentials. Attempt {self.current_tries}/{self.try_limit}")
        if self.current_tries >= self.try_limit:
            print("Maximum login attempts reached.")
            exit()

    def show_account_menu(self, account):
        while True:
            print("\n=== Account Menu ===")
            print("1. Deposit")
            print("2. Withdraw")
            print("3. Exit to main menu")
            choice = input("Select option: ")

            if choice == "1":
                try:
                    amount = int(input("Enter amount to deposit: "))
                    account.deposit(amount)
                except Exception as e:
                    print(e)
            elif choice == "2":
                try:
                    amount = int(input("Enter amount to withdraw: "))
                    account.withdraw(amount)
                except Exception as e:
                    print(e)
            elif choice == "3":
                print("Returning to main menu...")
                break
            else:
                print("Invalid choice, try again.")
