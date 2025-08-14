class Family():
    def __init__(self, last_name):
        self.last_name = last_name
        self.members = []

    def born(self, **children):
        self.members.append(children)
        print("congratulating the family")

    def is_18(self, name):
        for child in self.members:
            if child.get("name") == name and child.get("age") == 18:
                return True
        return False
    def family_presentation(self):
        for member in self.members:
            print(f"Name: {member.get('name')}, Age: {member.get('age')}, Gender: {member.get('gender')}, Is Child: {self.is_18(member.get('name'))}")

family = Family("hajjam")
family.born(name="ahmed", age=0, gender="male")
family.born(name="sara", age=18, gender="female")
family.family_presentation()