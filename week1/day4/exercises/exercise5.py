from exercise4 import Family

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
        print(self.last_name + " Family:")
        
        super().family_presentation()
        for member in self.members:
           
                self.use_power(member['name'])


incredible_family = TheIncredibles(
    "Incredibles",
    [
        {'name':'ahmed','age':35,'gender':'Male','power': 'fly','incredible_name':'MikeFly'},
        {'name':'Sara','age':32,'gender':'Female','power': 'read minds','incredible_name':'SuperWoman'}
    ]
)

incredible_family.incredible_presentation()

incredible_family.born(
    name='Jack',
    age=20,
    gender='Male',
    is_child=True,
    power='Unknown Power',
    incredible_name='BabyJack'
)

incredible_family.incredible_presentation()


