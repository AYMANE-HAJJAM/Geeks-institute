#Exercise 1:
#True
#True
#False
#False
#True
#False
#x is True
#y is False
#a: 5
#b: 10

#Exercise 2:
longest_sentence = ""
while True:
    sentence = input("Enter a sentence (or 'q' to stop): ")
    if sentence.lower() == "q":
        break
    if "a" in sentence.lower():
        print("Try again.")
        continue

    if len(sentence) > len(longest_sentence):
        longest_sentence = sentence
        print(f"Congrats! New longest sentence with length {len(sentence)}")
    else:
        print(f"Valid, but not longer than current record ({len(longest_sentence)})")

print(f"The longest sentence: {longest_sentence}")

#Exercise 3:
paragraph = "The ability to learn a new language is a remarkable human capacity. It allows us to connect with others in profound ways, understand different cultures, and even reshape our own thinking. Beyond the practical benefits of communication, learning a language can be a deeply rewarding intellectual and personal journey, fostering empathy, expanding our perspectives, and unlocking new worlds of literature, music, and film."

print(f"How many characters it contains: {len(paragraph)}")
print(f"How many sentences it contains: {paragraph.count('.') + paragraph.count('!') + paragraph.count('?')}")
print(f"How many words it contains: {len(paragraph.split())}")
unique_words = set(paragraph.lower().replace('.', '').replace('!', '').replace('?', '').split())
print(f"How many unique words it contains: {len(unique_words)}")
non_whitespace = len(paragraph) - paragraph.count(' ')
print(f"How many non-whitespace characters it contains: {non_whitespace}")
average_amount_words = len(paragraph.split()) / (paragraph.count('.') + paragraph.count('!') + paragraph.count('?'))
print(f"Average amount of words per sentence: {average_amount_words}")
non_unique = len(paragraph.split()) - len(unique_words)
print(f"How many non-unique words it contains: {non_unique}")
