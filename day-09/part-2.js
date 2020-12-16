const fs = require('fs');
const rawInput = fs.readFileSync('input.txt', 'utf-8');
const rawNumbers = rawInput.split('\n');
const numbers = rawNumbers.map(number => Number(number));

const findInvalidNumber = () => {
    for (let i = 0; i < numbers.length; i++) {

        let preamble = [];
        const preambleStart = i;
        const preambleEnd = i + 25;
        const followingNumber = numbers[i + 25];
    
        if (followingNumber === undefined) return;
    
        for (let j = preambleStart; j < preambleEnd; j++) {
            preamble.push(numbers[j]);
        }
        
        let totalInvalidNumbers = 0;

        for (let number of preamble) {
            const match = preamble.find(anotherNumber => number + anotherNumber === followingNumber);
    
            if (match) {
                break;
            } else {
                totalInvalidNumbers += 1;
            }         
        }
    
        if (totalInvalidNumbers === preamble.length) {
            return followingNumber;
        }
    }
};

const invalidNumber = findInvalidNumber();
const invalidNumberIndex = numbers.findIndex(number => number === invalidNumber);

let contiguousSetLength = 2;

const sumSmallestAndLargest = (contiguousSet) => {
    contiguousSet.sort((a, b) => a - b);
    const smallest = contiguousSet[0];
    const largest = contiguousSet[contiguousSet.length-1];
    const result = smallest + largest;
    return result;
};

const findContiguousNumbersSum = () => {
    for (let i = 0; i < invalidNumberIndex; i++) {
        let contiguousSet = [];
        if (contiguousSetLength > invalidNumberIndex) return;
        
        for (let j = i; j < i + contiguousSetLength; j++) {
            contiguousSet.push(numbers[j]);
        }

        const contiguousSetSum = contiguousSet.reduce((acc, value)=> acc + value);
        if (contiguousSetSum === invalidNumber) {
            console.log(sumSmallestAndLargest(contiguousSet))
            return 
        }
    }
    contiguousSetLength++;
    findContiguousNumbersSum();
};

findContiguousNumbersSum();