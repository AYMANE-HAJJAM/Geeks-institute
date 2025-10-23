function validateUnionType(value, allowedTypes) {
    var valueType = typeof value;
    for (var _i = 0, allowedTypes_1 = allowedTypes; _i < allowedTypes_1.length; _i++) {
        var type = allowedTypes_1[_i];
        if (valueType === type) {
            return true;
        }
    }
    return false;
}
var age = 25;
var username = "Alice";
var isActive = true;
console.log(validateUnionType(age, ["number", "string"])); // true
console.log(validateUnionType(username, ["number"])); // false
console.log(validateUnionType(isActive, ["boolean", "number"])); // true
console.log(validateUnionType({}, ["string", "number"])); // false
console.log(validateUnionType(undefined, ["undefined"])); // true
