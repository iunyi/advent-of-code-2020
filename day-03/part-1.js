// Setup
const fs = require('fs');
const rawInput = fs.readFileSync('input.txt', 'utf-8');
const treeArea = rawInput.split('\n');

// Moving forward
const advanceY = 1;
const advanceX = 3;

const findXRepetitions = (smallArea, advanceY, advanceX) => {
    // Y axis
    const totalLines = smallArea.length;
    // X axis
    const totalCharactersPerLine = smallArea[0].length;
    const requiredCharactersPerLine =  (totalLines / advanceY) * advanceX;
    const repetition = requiredCharactersPerLine / totalCharactersPerLine;

    return repetition
}

const repeatPattern = (smallArea, advanceY, advanceX, line) => {
    const repetition = findXRepetitions(smallArea, advanceY, advanceX);
    let wideLine = '';

    for (let i = 0; i < repetition; i++) {
        wideLine += line
    }

    return wideLine
};

const getWideArea = (smallArea) => {
    let wideArea = [];

    for (let line of smallArea) {
        const wideLine = repeatPattern(smallArea, advanceY, advanceX, line);
        wideArea.push(wideLine);
    }

    return wideArea
};

const countTrees = (wideArea) => {
    let totalTrees = 0;

    for (let i = 1; i < wideArea.length; i++) {
        let currentLine = wideArea[i];
        let currentXPosition = currentLine.charAt(i * advanceX);
        if (currentXPosition === '#') {
            totalTrees++
        }
    }
    
    return totalTrees
};

const wideTreeArea = getWideArea(treeArea);
console.log(countTrees(wideTreeArea));