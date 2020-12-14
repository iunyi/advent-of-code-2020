const { Console } = require('console');
const fs = require('fs');
const rawInput = fs.readFileSync('input.txt', 'utf-8');
const rawOperations = rawInput.split('\n');

const getParsedOperations = () => {
    let operations = [];
    for (let i = 0; i < rawOperations.length; i++) {
        const [ operation, rawAmount ] = rawOperations[i].split(' ');
        const amount = Number(rawAmount);
        operations.push([operation, amount, 'notVisited']);
    }
    return operations;
};

let operations = getParsedOperations();

const findAccBeforeInfiniteLoop = (operations) => {
    let acc = 0;
    let jmp = 1

    for (let i = 0; i < operations.length; i += jmp) {
        const isAcc = operations[i][0] === 'acc';
        const isJump = operations[i][0] === 'jmp';
        const isNoOperation = operations[i][0] === 'nop';

        if (operations[i][2] === 'visited') {
            return acc;
        } else if (isAcc) {
            acc += operations[i][1];
            jmp = 1;
            operations[i][2] = 'visited';
        } else  if (isJump) {
            jmp = operations[i][1];
            operations[i][2] = 'visited';
        } else if (isNoOperation) {
            jmp = 1;
            operations[i][2] = 'visited';
        }
    }
};

console.log(findAccBeforeInfiniteLoop(operations));
