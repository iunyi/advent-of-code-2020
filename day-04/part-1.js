// Setup
const fs = require('fs');
const rawInput = fs.readFileSync('input.txt' , 'utf-8');
const passportStringArray = rawInput.split('\n\n');

createObject = (line) => {
    const object = {};

    const fields = line.split(/[ \n]+/);
    for (field of fields) {
        const [ key, value ] = field.split(':');
        object[key] = value;
    }
    
    return object
};

const getObjectArray = (stringArray) => {
    const objectArray = [];
    for (let line of stringArray) {
        const object = createObject(line);
        objectArray.push(object);
    }
    return objectArray
};

const passports = getObjectArray(passportStringArray);

// Solution
/* 
    Mandatory fields: byr, iyr, eyr, hgt, hcl, ecl, pid
    Optional field: cid 
*/
const totalFields = 8;
const totalMandatoryFields = 7;

const countValidPassports = (passports) => {
    let validPassports = 0;
    
    for (let passport of passports) {
        const optionalField = passport.cid;

        if (Object.keys(passport).length === totalFields) {
            validPassports++;
        } else if (
            Object.keys(passport).length === totalMandatoryFields && !optionalField) {
            validPassports++;
        }
    }
    return validPassports
};

console.log(countValidPassports(passports));
console.log(passports)