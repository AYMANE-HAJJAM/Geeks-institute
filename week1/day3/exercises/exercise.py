#Exercise 1:
class Cat:
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age
cat1 = Cat("Mittens", 3)
cat2 = Cat("Whiskers", 5)
cat3 = Cat("Paws", 2)

def oldest_cat(cats):
    old_cat = max(cats, key=lambda cat: cat.age)
    print(f"The oldest cat is {old_cat.name}, and is {old_cat.age} years old.")

oldest_cat([cat1, cat2, cat3])

#Exercise 2:
class Dog:
    def __init__(self, dog_name, dog_height):
        self.name = dog_name
        self.height = dog_height
    def bark(self):
        print(f"{self.name} goes woof!")
    def jump(self):
        print(f"{self.name} jumps {self.height * 2} cm high!")
davids_dog = Dog("Rex", 50)
print(davids_dog.name, davids_dog.height)
davids_dog.bark()
davids_dog.jump()
sarahs_dog = Dog("Teacup", 20)
print(sarahs_dog.name, sarahs_dog.height)
sarahs_dog.bark()
sarahs_dog.jump()

if davids_dog.height > sarahs_dog.height:
    print(f"The bigger dog is {davids_dog.name}")
elif sarahs_dog.height > davids_dog.height:
    print(f"The bigger dog is {sarahs_dog.name}")

#Exercise 3:
class Song:
    def __init__(self, lyrics):
        self.lyrics = lyrics
    def sing_me_a_song(self):
        for line in self.lyrics:
            print(line)

stairway = Song(["There’s a lady who's sure","all that glitters is gold", "and she’s buying a stairway to heaven"])
stairway.sing_me_a_song()

#Exercise 4:
class Zoo:
    def __init__(self, zoo_name):
        self.name = zoo_name
        self.animals = []
    def add_animal(self, new_animal):
        if not new_animal in self.animals:
            self.animals.append(new_animal)
    def get_animals(self):
        return self.animals
    def sell_animal(self, animal_sold):
        if animal_sold in self.animals:
            self.animals.remove(animal_sold)
    def sort_animals(self):
        sorted_animals = sorted(self.animals)
        grouped = {}
        for animal in sorted_animals:
            first_letter = animal[0]
            if first_letter not in grouped:
                grouped[first_letter] = [animal]
            else:
                grouped[first_letter].append(animal)
        return grouped
    def get_groups(self):
        groups = self.sort_animals()
        for letter, animals in groups.items():
            if len(animals) == 1:
                print(f"{letter}: {animals[0]}")
            else:
                print(f"{letter}: {animals}")

new_york_zoo = Zoo("New York Zoo")

new_york_zoo.add_animal("Ape")
new_york_zoo.add_animal("Baboon")
new_york_zoo.add_animal("Bear")
new_york_zoo.add_animal("Cat")
new_york_zoo.add_animal("Cougar")
new_york_zoo.add_animal("Emu")
print(new_york_zoo.get_animals())
new_york_zoo.sell_animal("Cat")
print(new_york_zoo.sort_animals())
new_york_zoo.get_groups()
