#Exercise 1:
keys = ['Ten', 'Twenty', 'Thirty']
values = [10, 20, 30]
my_dict = dict(zip(keys, values))
print(my_dict)

#Exercise 2:
family = {}
total_cost = 0

while True:
    name = input("Enter family name (or 'q' to quit): ")
    if name.lower() == 'q':
        break
    
    age = int(input(f"Enter {name} age: "))
    family[name] = age

for name, age in family.items():
    if age < 3:
        price = 0
    elif 3 <= age <= 12:
        price = 10
    else:
        price = 15
    print(f"\n{name} has to pay {price}")
    total_cost += price

print(f"\nTotal cost for the family: {total_cost}")


#Exercise 3:
#1:
brand = {
    "name": "Zara",
    "creation_date": 1975,
    "creator_name": "Amancio Ortega Gaona",
    "type_of_clothes": ["men", "women", "children", "home"],
    "international_competitors": ["Gap", "H&M", "Benetton"],
    "number_stores": 7000,
    "major_color": {
        "France": "blue",
        "Spain": "red",
        "US": ["pink", "green"]
    }
}
#2:
brand["number_stores"] = 2
#3:
print("Zaras clients are :")
for shirt in brand["type_of_clothes"]:
  print(shirt)
#4:
brand["country_creation"] = "Spain"
#5:
if "international_competitors" in brand:
    brand["international_competitors"].append("Desigual")
#6:
del brand["creation_date"]
#7:
print(brand["international_competitors"])
#8:
print(brand["major_color"]["US"])
#9:
print(len(brand))
#10:
print(brand.keys())
#11:
more_on_zara = {
    "creation_date": 1975,
    "number_stores": 10000
}
#12:
brand.update(more_on_zara)
print(brand)
#13:
print(brand["number_stores"])
#The value of number_stores in brand was replaced from 2 to 10000 because more_on_zara had the same key name, 
#replacing the existing values with the new ones.

#Exercise 4:
def describe_city(city, country="Iceland"):
    print(f"{city} is in {country}.")
describe_city("Reykjavik", "Iceland")
describe_city("Akureyri")

#Exercise 5:
import random

def guess_number(user_number):
    if not (1 <= user_number <= 100):
        print("Please enter a number between 1 and 100.")
        return
    
    random_number = random.randint(1, 100)
    
    if user_number == random_number:
        print("Winner")
    else:
        print(f"Better luck next time! Your number was {user_number}, but the random number was {random_number}.")

input_number = input("Enter a number between 1 and 100:")
guess_number(int(input_number))

#Exercise 6:
def make_shirt(size="Large", text="I love Python"):
    print(f"The size of the shirt is {size} and the text is '{text}'.")
make_shirt()
make_shirt(size="medium")
make_shirt(text="Hello", size="small")

#Exercise 7:
import random
def get_random_temp(month):
    if month in [12, 1, 2]:
        return random.randint(-10, 16)
    elif month in [3, 4, 5]:
        return random.randint(5, 23)
    elif month in [6, 7, 8]:
        return random.randint(20, 40)
    elif month in [9, 10, 11]:
        return random.randint(0, 23)

def main():
        month = int(input("Enter the month number (1-12): "))
        if month < 1 or month > 12:
            print("Invalid month number! Please enter a number between 1 and 12.")
            return
        
        celsius = get_random_temp(month)
        
        print(f"\nThe temperature right now is: {celsius}°C")

        if celsius < 0:
            print("Brrr, that’s freezing! Wear some extra layers today")
        elif 0 <= celsius <= 16:
            print("Quite chilly! Don’t forget your coat")
        elif 17 <= celsius <= 23:
            print("The weather is nice.")
        elif 24 <= celsius <= 32:
            print("It's getting warm.")
        elif 33 <= celsius <= 40:
            print("It's hot!")

main()

#Exercise 8:
from functools import reduce

data = [
    {"question": "What is Baby Yoda's real name?", "answer": "Grogu"},
    {"question": "Where did Obi-Wan take Luke after his birth?", "answer": "Tatooine"},
    {"question": "What year did the first Star Wars movie come out?", "answer": "1977"},
    {"question": "Who built C-3PO?", "answer": "Anakin Skywalker"},
    {"question": "Anakin Skywalker grew up to be who?", "answer": "Darth Vader"},
    {"question": "What species is Chewbacca?", "answer": "Wookiee"}
]

def ask_questions(questions):
    answers = []
    for q in questions:
        user_ans = input(q["question"] + " ").strip()
        answers.append({
            "question": q["question"],
            "correct_answer": q["answer"],
            "user_answer": user_ans,
            "is_correct": user_ans.lower() == q["answer"].lower()
        })
    return answers

def show_results(answers):
    correct = reduce(lambda acc, ans: acc + (1 if ans["is_correct"] else 0), answers, 0)
    incorrect = len(answers) - correct

    print("\nQuiz Results:")
    print(f"Correct answers: {correct}")
    print(f"Incorrect answers: {incorrect}")

    wrong_answers = list(filter(lambda ans: not ans["is_correct"], answers))

    if wrong_answers:
        display_wrongs = list(map(lambda w: f"- Q: {w['question']}\n  Your answer: {w['user_answer']}\n  Correct answer: {w['correct_answer']}", wrong_answers))
        print("\n".join(display_wrongs))
    
    if incorrect >= 3:
        print("\nYou had more than 3 wrong answers. Let's play again!")
        return True
    return False

while True:
    answers = ask_questions(data)
    play_again = show_results(answers)
    if not play_again:
        break