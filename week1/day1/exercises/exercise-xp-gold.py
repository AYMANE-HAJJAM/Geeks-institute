#Exercise 1:
month = int(input("Enter month (1-12): "))
if 3 <= month <= 5:
    print("Spring")
elif 6 <= month <= 8:
    print("Summer")
elif 9 <= month <= 11:
    print("Fall")
elif month == 12 or month == 1 or month == 2:
    print("Winter")
else:
    print("Invalid month")

#Exercise 2:
even = []
for i in range(1, 21):
    print(i)
    if i % 2 == 0:
        even.append(i)
print(even)

#Exercise 3:
my_name = "aymane"

while True:
    name = str(input("Enter your name: "))
    if name.lower() == my_name.lower():
        print("stop.")
        break

#Exercise 4:
names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus']
user_name = str(input("Enter your name: "))
for index in range(len(names)):
    if names[index].lower() == user_name.lower():
        print("index:", index)
        break

#Exercise 5:
number1 = int(input("Input the 1st number: "))
number2 = int(input("Input the 2nd number: "))
number3 = int(input("Input the 3rd number: "))
if number1 > number2 and number1 > number3:
    print("The greatest number is :", number1)
elif number2 > number1 and number2 > number3:
    print("The greatest number is :", number2)
elif number3 > number1 and number3 > number2:
    print("The greatest number is :", number3)
else:
    print("All numbers are equal.")

#Exercise 6:
import random
wins = 0
losses = 0
while True:
    user_input = input("Enter a number between 1 and 9 (or 'q' to quit): ")
    if user_input.lower() == 'q':
        break
    if not user_input.isdigit():
        print("Please enter a valid number.")
        continue
    guess = int(user_input)
    if guess < 1 or guess > 9:
        print("Number must be between 1 and 9.")
        continue
    random_number = random.randint(1, 9)

    if guess == random_number:
        print("winner")
        wins += 1
    else:
        print("Better luck next time! The number was:", random_number)
        losses += 1

print("\nGame over! You won", wins, "time(s) and lost", losses, "time(s).")
