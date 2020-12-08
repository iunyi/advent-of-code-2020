const fs = require('fs');
const rawInput = fs.readFileSync('input.txt', 'utf-8');
const passwordsRawArray = rawInput.split('\n')

const createObject = (line) => {
    const [ positions, characterColon, password ] = line.split(' ');
    const indexPositions = (positions.split('-')).map(number => number - 1);
    const [ positionA, positionB ] = indexPositions;
    const character = characterColon[0];

    return {
        positionA, 
        positionB, 
        character, 
        password
    }
};

const characterMatches = (position, character, password ) => {
    return password.charAt(position) === character 
};

const checkPositions = (positionA, positionB, character, password) => {
    if (characterMatches(positionA, character, password) && characterMatches(positionB, character, password)) {
        return false 
        
    } else if (characterMatches(positionA, character, password) || characterMatches(positionB, character, password)) {
        return true 
    }
};

const countValidPasswords = (array) => {
    let validPasswords = 0;

    for (let line of array) {
        const { positionA, positionB, character, password } = createObject(line);
        if (checkPositions(positionA, positionB, character, password) === true) {
            validPasswords++
        } 
    }

    return validPasswords
};

console.log(countValidPasswords(passwordsRawArray));
