//Exercise 1:
var usermessage = "Hello, World!";
console.log(usermessage);
//Exercise 2:
var userage = 25;
var username = "Alice";
console.log("Age:", userage);
console.log("Name:", username);
//Exercise 3:
var id = 12345; // Example of union type
console.log("ID:", id);
//Exercise 4:
function numberToString(number) {
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
console.log(numberToString(5)); // Positive
console.log(numberToString(0)); // Zero
console.log(numberToString(-3)); // Negative
//Exercise 5:
function getDetails(name, age) {
    var message = "Hello, ".concat(name, "! You are ").concat(age, " years old.");
    return [name, age, message];
}
// Call the function and log the tuple
var details = getDetails("Alice", 25);
// Expected output
console.log(details); // Output: ['Alice', 25, 'Hello, Alice! You are 25 years old.']
