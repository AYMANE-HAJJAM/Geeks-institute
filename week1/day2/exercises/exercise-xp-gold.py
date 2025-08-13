#Exercise 1, 2:
birthdays = {
    "aymane": "2001/10/10",
    "bob": "1988/09/23",
    "charlie": "2000/01/15",
    "diana": "1992/11/30",
    "ethan": "1999/06/08"
}

print("You can look up the birthdays of the people in the list!")
def print_birthday(item):
    name = item
    print(f"person's name : {name}")

list(map(print_birthday, birthdays.keys()))
name = input("Enter a name to look up their birthday: ")
for person in birthdays:
    if name == person:
        print(f"{name}'s birthday is on {birthdays[person]}")
        break
else:
    print(f"Sorry, we don’t have the birthday information for {name}.")

#Exercise 3:
sum_pattern = lambda X: int(str(X)) + int(str(X)*2) + int(str(X)*3) + int(str(X)*4)
print(sum_pattern(10)) 

#Exercise 4:
import random

def throw_dice():
    return random.randint(1, 6)

def throw_until_doubles():
    count = 0
    throws_in_one_attempt = []
    while True:
        throw1 = throw_dice()
        throw2 = throw_dice()
        count += 1
        throws_in_one_attempt.append(f"({throw1}, {throw2})")
        if throw1 == throw2:
            break
    print(", ".join(throws_in_one_attempt))
    return count

def main():
    list_of_throws = [throw_until_doubles() for _ in range(100)]
    total_throws = sum(list_of_throws)
    average_throws = total_throws / len(list_of_throws)

    print(f"\nTotal throws: {total_throws}")
    print(f"Average throws to reach doubles: {average_throws}")

main()
