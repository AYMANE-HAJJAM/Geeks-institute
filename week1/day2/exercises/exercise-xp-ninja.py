#Exercise 1:
car = ["Volkswagen", "Toyota", "Ford" ,"Motor", "Honda", "Chevrolet"]

print("Number of car companies: ", len(car))

reversed_car = sorted(car, reverse=True)
print("Reversed list of car companies: ", reversed_car)

companies_with_o = [c for c in car if "o" in c.lower()]
print("Number of companies with 'o' in their name:", len(companies_with_o))

companies_not_with_i = [c for c in car if "i" not in c.lower()]
print("Number of companies without 'i' in their name:", len(companies_not_with_i))



car_list = ["Honda", "Volkswagen", "Toyota", "Ford Motor", "Honda", "Chevrolet", "Toyota"]

unique_cars = list(set(car_list))


cars_string = ", ".join(unique_cars)

print("Companies without duplicates:", cars_string)
print("Number of unique companies:", len(unique_cars))

sorted_cars = sorted(car_list)
reversed_letters = [car[::-1] for car in sorted_cars]
print(reversed_letters)

# Exercise 2:
def get_full_name(first_name, last_name, middle_name=""):
    if middle_name:
        full_name = f"{first_name} {middle_name} {last_name}"
    else:
        full_name = f"{first_name} {last_name}"
    return full_name

print(get_full_name(first_name="john", middle_name="hooker", last_name="lee"))
print(get_full_name(first_name="bruce", last_name="lee"))

# Exercise 3:
MORSE_CODE_DICT = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
    'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
    'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
    'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
    'Z': '--..',
    '0': '-----', '1': '.----', '2': '..---', '3': '...--', 
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', 
    '8': '---..', '9': '----.',
    ' ': '/'
}
def text_to_morse(text):
    text = text.upper()
    morse = [MORSE_CODE_DICT.get(char, '') for char in text]
    return ' '.join(morse)

def morse_to_text(morse_code):
    INVERSE_MORSE_DICT = {value: key for key, value in MORSE_CODE_DICT.items()}
    
    words = morse_code.split(' / ')
    decoded_words = []
    
    for word in words:
        letters = word.split()
        decoded_word = ''.join(INVERSE_MORSE_DICT.get(letter, '') for letter in letters)
        decoded_words.append(decoded_word)
    
    return ' '.join(decoded_words)

text = "Hello World"
morse = text_to_morse(text)
print("Morse code:", morse)
decoded_text = morse_to_text(morse)
print("Decoded text:", decoded_text)

