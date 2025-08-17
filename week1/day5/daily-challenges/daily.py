import turtle

class Circle:
    def __init__(self, radius=None, diameter=None):
        if radius is not None:
            self.radius = radius
            self.diameter = 2 * radius
        elif diameter is not None:
            self.diameter = diameter
            self.radius = diameter / 2
        else:
            raise ValueError("Must provide either radius or diameter")

    def area(self):
        return 3.14 * self.radius**2
    
    def __str__(self):
        print(f"Circle(radius={self.radius}, diameter={self.diameter})")

    def __add__(self, other):
        return Circle(radius=self.radius + other.radius)

    def __lt__(self, other):
        return self.radius < other.radius
    
    def __eq__(self, other):
        return self.radius == other.radius

c1 = Circle(radius=3)
c2 = Circle(diameter=10)

c1.__str__()  
c2.__str__()   

c3 = c1 + c2
c3.__str__()

print(c1 < c2)
print(c1 == c2)  

circles = [Circle(7), Circle(2), Circle(5)]
sorted_list = sorted(circles)

t = turtle.Turtle()

for idx, circle in enumerate(sorted_list):
    circle.__str__()
    t.penup()
    t.goto(0, -circle.radius)
    t.pendown()
    t.circle(circle.radius)

turtle.done()
