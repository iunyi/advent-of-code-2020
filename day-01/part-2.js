const fs = require('fs');
const rawInput = fs.readFileSync('input.txt', 'utf-8');
const expenseReport = rawInput.split('\n');

const multiplyThreeNumbersThatSumTo2020 = (array) => {
    const numberArray = array.map(number => parseInt(number));

    for (let i = 0; i < numberArray.length; i++) {
        
        for (let j = 1; j < numberArray.length; j++) {
            let number1 = numberArray[i];
            let number2 = numberArray[j];
            let number3 = numberArray.find(number => number + number1 + number2 === 2020);
            
            if(number3) {
                console.log({number1, number2, number3});
                return number1 * number2 * number3
            } else {
                j++
            }
        }
    }
};

console.log('Product of three numbers that sum to 2020:', multiplyThreeNumbersThatSumTo2020(expenseReport));