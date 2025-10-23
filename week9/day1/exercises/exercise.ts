//Exercise 1:
var usermessage: string = "Hello, World!";
console.log(usermessage);

//Exercise 2:
var userage: number = 25;
var username: string = "Alice";
console.log("Age:", userage);
console.log("Name:", username);

//Exercise 3:
var id: (string | number) = 12345; // Example of union type
console.log("ID:", id);

//Exercise 4:
function numberToString(number: number): string {
    if (number > 0) {
        return "Positive";
    }
    else if (number === 0) {
        return "Zero";
    }
    else {
        return "Negative";
    }
}

console.log(numberToString(5));   // Positive
console.log(numberToString(0));   // Zero
console.log(numberToString(-3));  // Negative

//Exercise 5:
function getDetails(name: string, age: number): [string, number, string] {
    const message = `Hello, ${name}! You are ${age} years old.`;
    return [name, age, message];
}

// Call the function and log the tuple
const details = getDetails("Alice", 25);
// Expected output
console.log(details); // Output: ['Alice', 25, 'Hello, Alice! You are 25 years old.']


//Exercise 6:
type persone = { name: string, age: number };

function createPerson(name: string, age: number): persone {
    return { name, age };
}

const person1 = createPerson("Bob", 30);;
console.log(person1); // Output: { name: 'Bob', age: 30 }

// //Exercise 7:
// const inputElement = document.getElementById("username") as HTMLInputElement;
// inputElement.value = "Aymane";
// console.log(inputElement.value);

//Exercise 8:
function getAction(role: string): string {
    switch (role) {
        case "admin":
            return "Manage users and settings";
        case "editor":
            return "Edit content";
        case "viewer":
            return "View content";
        case "guest":
            return "Limited access";
        default:
            return "Invalid role";
    }
}

// Test
console.log(getAction("admin"));   // Manage users and settings
console.log(getAction("editor"));  // Edit content
console.log(getAction("viewer"));  // View content
console.log(getAction("guest"));   // Limited access
console.log(getAction("unknown")); // Invalid role


//Exercise 9:
// Step 1: Function overloads
function greet(): string;
function greet(name: string): string;

// Step 2: Implementation
function greet(name?: string): string {
    if (name) {
        return `Hello, ${name}!`;
    }
    return "Hello, stranger!";
}

// Step 3: Test
console.log(greet());          // Hello, stranger!
console.log(greet("Alice"));   // Hello, Alice!

