def display_board(board):
    print("Welcome to Tic Tac Toe!")
    print("TIC TAC TOE")
    print("*************")
    for i in range(1, 4):
        print(f"* {board[i][1]} | {board[i][2]} | {board[i][3]} *")
        if i < 3:
            print("*-----------*")
    print("*************")

def player_input(player, board):
    while True:
        print(f"Player {player}'s turn")
        try:
            row = int(input("Enter row : "))
            column = int(input("Enter column : "))
            
            if 1 <= row <= 3 and 1 <= column <= 3:
                if board[row][column] == " ":
                    board[row][column] = player
                    break
                else:
                    print("This is already occupied!")
            else:
                print("Please enter numbers between 1 and 3!")
        except ValueError:
            print("Please enter valid numbers only!")

def check_win(board):
    for row in range(1, 4):
        if board[row][1] == board[row][2] == board[row][3] != " ":
            return board[row][1]
    for col in range(1, 4):
        if board[1][col] == board[2][col] == board[3][col] != " ":
            return board[1][col]
    if board[1][1] == board[2][2] == board[3][3] != " ":
        return board[1][1]
    if board[1][3] == board[2][2] == board[3][1] != " ":
        return board[1][3]
    return None


def play():
    board = [[" " for _ in range(4)] for _ in range(4)]
    current_player = "X"
    moves = 0
    while True:
        display_board(board)
        player_input(current_player, board)
        moves += 1
        winner = check_win(board)
        if winner:
            display_board(board)
            print(f"Player {winner} wins!")
            break
        if moves == 9:
            display_board(board)
            print("It's a draw!")
            break
        current_player = "O" if current_player == "X" else "X"

play()


