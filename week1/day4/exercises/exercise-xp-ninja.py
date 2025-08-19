import time
import os
import copy

class GameOfLife:
    def __init__(self, rows, cols, initial_state=None):
        self.rows = rows
        self.cols = cols
        if initial_state:
            self.grid = initial_state
        else:
            self.grid = [[0 for _ in range(cols)] for _ in range(rows)]

    def display(self):
        os.system('cls' if os.name == 'nt' else 'clear')
        for row in self.grid:
            print("".join(["█" if cell else " " for cell in row]))
        print("\n")

    def count_neighbors(self, x, y):
        directions = [(-1,-1), (-1,0), (-1,1),
                      (0,-1),          (0,1),
                      (1,-1),  (1,0),  (1,1)]
        count = 0
        for dx, dy in directions:
            nx, ny = x + dx, y + dy
            if 0 <= nx < self.rows and 0 <= ny < self.cols:
                count += self.grid[nx][ny]
        return count

    def step(self):
        new_grid = copy.deepcopy(self.grid)
        for i in range(self.rows):
            for j in range(self.cols):
                neighbors = self.count_neighbors(i, j)
                if self.grid[i][j] == 1:
                    if neighbors < 2 or neighbors > 3:
                        new_grid[i][j] = 0
                else:
                    if neighbors == 3:
                        new_grid[i][j] = 1
        self.grid = new_grid

    def run(self, generations=10, delay=0.5):
        for _ in range(generations):
            self.display()
            self.step()
            time.sleep(delay)

initial_state = [
    [0,0,0,0,0,0],
    [0,1,0,0,0,0],
    [0,0,1,0,0,0],
    [1,1,1,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0]
]

game = GameOfLife(6, 6, initial_state)
game.run(generations=20, delay=0.3)


game = GameOfLife(6, 6, initial_state)
game.run(generations=20, delay=0.3)
