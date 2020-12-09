const fs = require('fs');
const rawInput = fs.readFileSync('input.txt', 'utf-8');
const treeArea = rawInput.split('\n');

const countTrees = (area) => {
    const width = area[0].length;
    let numberOfTrees = 0;
    let columnIndex = 0;
    for (let rowIndex = 0; rowIndex < area.length; rowIndex++) {
        if (area[rowIndex][columnIndex % width] === '#') {
            numberOfTrees++;
        }
        columnIndex += 3;
    }
    return numberOfTrees
};

console.log(countTrees(treeArea));