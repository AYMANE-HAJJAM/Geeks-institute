import random
class Game:
    def get_user_item(self):
        mapping = {"r": "rock", "p": "paper", "s": "scissors"}
        while True:
            item = input("Select (r)ock, (p)aper, or (s)cissors: ").lower()
            if item in mapping:
                return mapping[item]
            elif item in ["rock", "paper", "scissors"]:
                return item
            else:
                print("Invalid input. Try again.")
    def get_computer_item(self):
        return random.choice(["rock", "paper", "scissors"])
    def get_game_result(self, user_item, computer_item):
        if user_item == computer_item:
            return "draw"
        elif (user_item == "rock" and computer_item == "scissors") or \
             (user_item == "paper" and computer_item == "rock") or \
             (user_item == "scissors" and computer_item == "paper"):
            return "win"
        else:
            return "loss"

    def play(self):
        user = self.get_user_item()
        computer = self.get_computer_item()
        result = self.get_game_result(user, computer)
        print(f"You chose: {user}. The computer chose {computer}. Result: {result}.")
        return result

