class Family:
    def __init__(self, last_name, members):
        self.last_name = last_name
        self.members = members

    def family_presentation(self):
        for member in self.members:
            print(member)

    def born(self, member):
        self.members.append(member)

class TheIncredibles(Family):
    def use_power(self, member_name):
        for member in self.members:
            if member['name'] == member_name:
                if member['age'] > 18:
                    print(f"{member['name']} uses their power: {member['power']}")
                else:
                    raise Exception(f"{member['name']} is not over 18 years old!")
                return
        print(f"No member named {member_name} found.")

    def incredible_presentation(self):
        print("*Here is our powerful family*")
        print(f"Family Last Name: {self.last_name}")
        super().family_presentation()


incredible_family = TheIncredibles(
    "Incredibles",
    [
        {'name':'ahmed','age':35,'gender':'Male','is_child':False,'power': 'fly','incredible_name':'MikeFly'},
        {'name':'Sarah','age':32,'gender':'Female','is_child':False,'power': 'read minds','incredible_name':'SuperWoman'}
    ]
)

incredible_family.incredible_presentation()

incredible_family.born({
    'name':'Jack', 'age':0, 'gender':'Male', 'is_child':True, 'power':'Unknown Power', 'incredible_name':'BabyJack'
})

incredible_family.incredible_presentation()

incredible_family.use_power('Michael')
