const fs = require('fs');
const rawInput = fs.readFileSync('input.txt', 'utf-8');
const instructions = rawInput.split('\n');

let [ waypointX, waypointY ] = [ 10, 1 ];
let [ positionX, positionY ] = [ 0, 0 ];

const followInstructions = () => {
    for (let instruction of instructions) {
        let action = instruction[0];
        let value = Number(instruction.slice(1));

        if (action === 'F') {
            positionX += waypointX * value
            positionY += waypointY * value
        } else if (action === 'R'){
            for (let i = 0; i < value; i += 90) {
                [waypointX, waypointY] = [waypointY, -waypointX];
            }
        } else if (action === 'L') {
            for (let i = 0; i < value; i += 90) {
                [waypointX, waypointY] = [-waypointY, waypointX];
            }
        }
         else if (action === 'N') {
            waypointY += value;
        } else if (action === 'S') {
            waypointY -= value;
        } else if (action === 'E') {
            waypointX += value;
        } else if (action === 'W') {
            waypointX -= value;
        } 
    }
    return [positionX, positionY];
};

[positionX, positionY] = followInstructions();

const sumXYPositions = (x, y) => {
    let total = Math.abs(x) + Math.abs(y);
    return total;
};

console.log(sumXYPositions(positionX, positionY));