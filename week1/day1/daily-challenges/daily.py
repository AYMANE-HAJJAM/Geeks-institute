#Challenge 1:
number = int(input("number :"))
length = int(input("length :"))

list = []
for i in range(1, length + 1):
    list.append(number * i)
print(list)

#Challenge 2:
word = str(input("user's word:"))

result = ""
for char in word:
    if len(result) == 0 or char != result[-1]:
        result += char

print(result)
print(word)
