# #Exercise 1:
# print("Hello world\n" * 4 )

# #Exercise 2:
# result = (99 ** 3) * 8
# print(result)

# #Exercise 3:
# my_name = "aymane"
# user_name = str(input("Enter your name: "))
# if my_name.lower() == user_name.lower():
#     print("😄")
# else:
#     print("😞")

# #Exercise 4:
# height = int(input("Enter your height in centimeters: "))
# if height > 145:
#     print("You are tall enough to ride")
# else:
#     print("You need to grow some more before you can ride")

# #Exercise 5:
# my_fav_numbers = set([1,2,3])

# my_fav_numbers.add(6)
# my_fav_numbers.add(4)
# my_fav_numbers.remove(4)

# friend_fav_numbers = set([7,8,9])

# our_fav_numbers = friend_fav_numbers.union(my_fav_numbers)

# print(our_fav_numbers)


# #Exercise 7:
# basket = ["Banana", "Apples", "Oranges", "Blueberries"]
# basket.remove("Banana")
# basket.remove("Blueberries")
# basket.append("Kiwi")
# basket.append("Apples")
# apple_count = basket.count("Apples")
# print(apple_count)
# basket.clear()
# print(basket)

#Exercise 8:
sandwich_orders = ["Tuna sandwich", "Pastrami sandwich", "Avocado sandwich", "Pastrami sandwich", "Egg sandwich", "Chicken sandwich", "Pastrami sandwich"]
while "Pastrami sandwich" in sandwich_orders:
    sandwich_orders.remove("Pastrami sandwich")
print(sandwich_orders)
finished_sandwiches = []
while len(sandwich_orders) > 0:
    sandwich = sandwich_orders[0]      
    finished_sandwiches.append(sandwich)  
    sandwich_orders.remove(sandwich)  
print(sandwich_orders)
print(finished_sandwiches)
index = 0
while index < len(finished_sandwiches):
    print(f"I made your {finished_sandwiches[index]}")
    index += 1
