car = ["Volkswagen", "Toyota", "Ford" ,"Motor", "Honda", "Chevrolet"]

print("Number of car companies: ", len(car))

reversed_car = car[::-1]
print("Reversed list of car companies: ", reversed_car)

companies_with_o = [c for c in car if "o" in c.lower()]
print("Number of companies with 'o' in their name:", len(companies_with_o))

companies_not_with_i = [c for c in car if "i" not in c.lower()]
print("Number of companies without 'i' in their name:", len(companies_not_with_i))
