word = input("Enter a word: ")

index_dict = {}

for i, letter in enumerate(word):
    if letter not in index_dict:
        index_dict[letter] = []
    index_dict[letter].append(i)

print(index_dict)
