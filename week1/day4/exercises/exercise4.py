class Family():
    def __init__(self, last_name, members):
        self.last_name = last_name
        self.members = members

    def born(self, **children):
        self.members.append(children)
        print("congratulating the family")

    def is_18(self, name):
        for child in self.members:
            if child.get("name") == name and child.get("age") > 18:
                return True
        return False
    def family_presentation(self):
        print(f"{self.last_name} Family Members:")
        for member in self.members:
            print(f"Name: {member.get('name')}, Age: {member.get('age')}, Gender: {member.get('gender')}, Is Child: {not self.is_18(member.get('name'))}")

family = Family("hajjam", [])
family.born(name="Michael", age=35, gender="male")
family.born(name="Sara", age=32, gender="female")
family.family_presentation()