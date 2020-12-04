const fs = require('fs');
const rawInput = fs.readFileSync('input.txt', 'utf8');
const expenseReport = rawInput.split('\n');

const productOfTwoNumbersThatSum2020 = (array) => {
    const numberArray = array.map(number => parseInt(number));

    for (let i = 0; i < numberArray.length; i++) {
        let number1 = numberArray[i];
        let number2= numberArray.find(number => number + numberArray[i] === 2020);
        
        if(number2) {
            console.log({number1});
            console.log({number2});
            return number1 * number2

        } else {
            i++
        }
    }
}

console.log('Product of two numbers that sum to 2020:', productOfTwoNumbersThatSum2020(expenseReport));