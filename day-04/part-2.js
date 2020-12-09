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

// Rules for valid passports
const eyeColors = new Set(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']);
const [ minHeightIn, maxHeightIn ] = [ 59, 76 ];
const [ minHeightCm, maxHeightCm ] = [ 150, 193 ];
const [ minBirthYear, maxBirthYear ] = [ 1920, 2002 ];
const [ minIssueYear, maxIssueYear] = [ 2010, 2020 ];
const [ minExpirationYear, maxExpirationYear ] = [ 2020, 2030 ];

// Validations
const isValidNumber = (number, min, max) => {
    if (number) {
        const parsedNumber = Number(number);
        return (
            number.length === 4 && parsedNumber >= min && parsedNumber <= max ? true : false
        )
    }
};

const isValidHeight = (height) => {
    const unit = height && height.slice(-2);
    const value = height && Number(height.slice(0, -2));
    return (
        (unit === 'in' && value >= minHeightIn && value <= maxHeightIn ||
        unit === 'cm' && value >= minHeightCm && value <= maxHeightCm) ?
        true
        :
        false
    )
};

const isValidHair = (hair) => {
    return hair && hair.match(/^#[0-9a-f]{6}$/) 
};

const isValidEye = (eye) => {
    return eye && eyeColors.has(eye)
};

const isValidPassportID = (passportID) => {
    return passportID && passportID.match(/^[0-9]{9}$/) 
};

const validate = (passport) => {
    let isValid;
    const { 
        byr: birth, 
        iyr: issue, 
        eyr: expiration, 
        hgt: height, 
        hcl: hair, 
        ecl: eye, 
        pid: passportID, 
    } = passport;

    if (
        isValidNumber(birth, minBirthYear, maxBirthYear) &&
        isValidNumber(issue, minIssueYear, maxIssueYear) &&
        isValidNumber(expiration, minExpirationYear, maxExpirationYear) && 
        isValidHeight(height) &&
        isValidHair(hair) &&
        isValidEye(eye) &&
        isValidPassportID(passportID)
    ) {
        isValid = true;
    } else {
        isValid = false;
    }
    return isValid
};

const countValidPassports = (passports) => {
    let validPassports = 0;
    
    for (let passport of passports) {
        const isValid = validate(passport);
        if (isValid) {
            validPassports++;
        }
    }
    return validPassports
};

console.log(countValidPassports(passports));