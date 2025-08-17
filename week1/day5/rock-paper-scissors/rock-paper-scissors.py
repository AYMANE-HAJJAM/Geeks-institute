from game import Game

def get_user_menu_choice():
    print("Menu:")
    print("(g) Play a new game")
    print("(x) Show scores and Quit")
    choice = input(": ").lower()
    if choice in ["g", "x", "q"]:
        return choice
    else:
        print("Invalid choice. Please try again.")
        return get_user_menu_choice()

def print_results(result):
    print("Game Results:")
    print(f"You won: {result['win']} times")
    print(f"You lost: {result['loss']} times")
    print(f"You drew: {result['draw']} times")
    print("Thanks for playing!")

def main():
    result = {"win": 0, "loss": 0, "draw": 0}
    while True:
        choice = get_user_menu_choice()
        if choice == "g":
            game = Game()
            resul = game.play()
            result[resul] += 1
        elif choice == "x" or choice == "q":
            print_results(result)
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
