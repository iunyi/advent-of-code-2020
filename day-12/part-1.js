const fs = require('fs');
const rawInput = fs.readFileSync('input.txt', 'utf-8');
const instructions = rawInput.split('\n');
const directions = ['W', 'N', 'E', 'S'];
let direction = 'E';

const rotate = (action, value) => {
    if (action === 'F') {
        action = direction;
        
    } else if (action === 'R') {
        let directionIndex = directions.findIndex(item => item === direction);
        let rotation = value / 90; 
        let newDirectionIndex = (directionIndex + rotation) % directions.length;
        direction = directions[newDirectionIndex];

    } else if (action === 'L') {
        let rotation = value / 90; 
        let directionIndex = directions.findIndex(item => item === direction);
        let index = (directionIndex - rotation);

        if (index >= 0) {
            direction = directions[index];
        } else {
            let newDirectionIndex = directions.length + index ;
            direction = directions[newDirectionIndex];
        }
    }
    return direction;
};

const followInstructions = () => {
    let x = 0;
    let y = 0;

    for (let instruction of instructions) {
        let action = instruction[0];
        let value = Number(instruction.slice(1));

        if (action ===  'F') {
            action = rotate(action, value);
        } else if (action ===  'R' || action ===  'L') {
            action = rotate(action, value);
            value = 0;
        }

        if (action === 'N') {
            y += value;
        } else if (action === 'S') {
            y -= value;
        } else if (action === 'E') {
            x += value;
        } else if (action === 'W') {
            x -= value;
        } 
    }
    return [x, y];
};

const [x, y] = followInstructions();

const sumXYPositions = (x, y) => {
    let total = Math.abs(x) + Math.abs(y);
    return total;
};

console.log(sumXYPositions(x, y));