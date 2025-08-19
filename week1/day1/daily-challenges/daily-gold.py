
from datetime import datetime


birthday = input("Enter your birthday (DD-MM-YYYY): ")
birthday_date = datetime.strptime(birthday, "%d-%m-%Y")
today = datetime.now()

your_age = today.year - birthday_date.year - ((today.month, today.day) < (birthday_date.month, birthday_date.day))

last_digit = your_age % 10
num_i = "i" * last_digit if last_digit > 0 else "i"

print("     ____" + num_i + "____  ")
print("    |:H:a:p:p:y:| ")
print("  __|___________|__")
print(" |^^^^^^^^^^^^^^^^^|")
print(" |:B:i:r:t:h:d:a:y:|")
print(" |                 |")
print(" ~~~~~~~~~~~~~~~~~~~ ")