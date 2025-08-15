import random
class Game:
    def get_user_item(self):
        item = input("Enter rock, paper, or scissors: ")
        while item.lower() not in ["rock", "paper", "scissors"]:
            print("Invalid input.")
            item = input("Enter rock, paper, or scissors: ")
        return item
    def get_computer_item(self):
        return random.choice(["rock", "paper", "scissors"])
    def get_game_result(self, user_item, computer_item):
        if user_item == computer_item:
            return "It's a draw!"
        elif (user_item == "rock" and computer_item == "scissors") or \
             (user_item == "paper" and computer_item == "rock") or \
             (user_item == "scissors" and computer_item == "paper"):
            return "You win!"
        else:
            return "You lose!"

g = Game()
user_item = g.get_user_item()
computer_item = g.get_computer_item()
print(g.get_game_result(user_item, computer_item))