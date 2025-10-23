function validateUnionType(value: any, allowedTypes: string[]): boolean {
    const valueType = typeof value;

    for (let type of allowedTypes) {
        if (valueType === type) {
            return true;
        }
    }

    return false;
}


var age = 25;
var username = "Alice";
var isActive = true;

console.log(validateUnionType(age, ["number", "string"]));      // true
console.log(validateUnionType(username, ["number"]));               // false
console.log(validateUnionType(isActive, ["boolean", "number"])); // true
console.log(validateUnionType({}, ["string", "number"]));       // false
console.log(validateUnionType(undefined, ["undefined"]));       // true
