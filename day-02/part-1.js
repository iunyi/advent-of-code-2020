const fs = require('fs');
const rawInput = fs.readFileSync('input.txt', 'utf-8');
const passwordsRawArray = rawInput.split('\n')

const createObject = (line) => {
    const [ frequency, characterColon, password ] = line.split(' ');
    const [ min, max ] = frequency.split('-').map(Number);
    const character = characterColon[0];

    return {
        min,
        max,
        character,
        password,
    }
};

const countCharacter = (character, string) => {
    let acc = 0;

    for (let char of string) {
        if (char === character) {
            acc++;
        }
    }

    return acc
}

const countValidPasswords = (rawArray) => {
    let validPasswordsAmount = 0;

    for (let line of rawArray) {
        const object =  createObject(line);
        const { min, max, character, password } = object;
        const count = countCharacter(character,password);
        if (count >= min && count <= max){
            validPasswordsAmount++;
        }
    }

    return validPasswordsAmount
}

console.log(countValidPasswords(passwordsRawArray));