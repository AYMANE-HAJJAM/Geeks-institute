class Farm:
    def __init__(self, farm_name):
        self.name = farm_name
        self.animals = {}

    def add_animal(self, animal_type, count=1):
        if animal_type in self.animals:
            self.animals[animal_type] += count
        else:
            self.animals[animal_type] = count 

    def get_info(self):
        info = f"{self.name}'s farm\n"
        for animal, count in self.animals.items():
            info += f"{animal} : {count}\n"
        info += "E-I-E-I-0!"
        return info

    def get_animal_types(self):
        return sorted(self.animals.keys())

    def get_short_info(self):
        animals_list = self.get_animal_types()
        animals_with_plural = []
        for animal in animals_list:
            if self.animals[animal] > 1:
                animals_with_plural.append(animal + "s")
            else:
                animals_with_plural.append(animal)

        if len(animals_with_plural) > 1:
            animals_str = ", ".join(animals_with_plural[:-1]) + " and " + animals_with_plural[-1]
        else:
            animals_str = animals_with_plural[0]

        return f"{self.name}'s farm has {animals_str}."
    
macdonald = Farm("McDonald")
macdonald.add_animal('cow', 5)
macdonald.add_animal('sheep')
macdonald.add_animal('sheep')
macdonald.add_animal('goat', 12)

print(macdonald.get_info())
print(macdonald.get_animal_types())
print(macdonald.get_short_info())
