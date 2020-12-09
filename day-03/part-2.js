const fs = require('fs');
const rawInput = fs.readFileSync('input.txt', 'utf-8');
const treeArea = rawInput.split('\n');
const slopes = [
    [1, 1], 
    [3, 1], 
    [5, 1], 
    [7, 1], 
    [1, 2]
];

const countTrees = (area, rightMove, downMove) => {
    const width = area[0].length;
    let numberOfTrees = 0;
    let columnIndex = 0;
    for (let rowIndex = 0; rowIndex < area.length; rowIndex += downMove) {
        if (area[rowIndex][columnIndex % width] === '#') {
            numberOfTrees++;
        }
        columnIndex += rightMove;
    }
    return numberOfTrees
};

const multiplyTrees = (area, slopes) => {
    let treesProduct = 0;
    for (let option of slopes) {
        const [ rightMove, downMove ] = option;
        const totalTrees = countTrees(area, rightMove, downMove);
        treesProduct === 0 ? 
            treesProduct = totalTrees 
            : 
            treesProduct = treesProduct * totalTrees
    }
    return treesProduct
}

console.log(multiplyTrees(treeArea, slopes));