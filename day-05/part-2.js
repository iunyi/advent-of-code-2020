const fs = require('fs');
const rawInput = fs.readFileSync('input.txt' , 'utf-8');
const seatsCodes = rawInput.split('\n');

const splitSeatCode = (seatCode) => {
    const rowCode = seatCode.slice(0, -3);
    const colCode = seatCode.slice(-3);
    return [rowCode, colCode]
};

const findNumber = (slicedCode) => {
    const isRow = slicedCode.length === 7;
    const isCol = slicedCode.length === 3;
    let min;
    let max;

    if (isRow) {
        [ min, max ] = [ 0, 127 ];
    } else if (isCol) {
        [ min, max ] = [ 0, 7 ];
    }
    
    for (let char of slicedCode) {
        const front = char === 'F';
        const back = char === 'B';
        const left = char === 'L';
        const right = char === 'R';

        if (front || left) {
            max = Math.floor((min / 2) + (max / 2));
        } else if (back || right) {
            min =  Math.ceil((min / 2) + (max / 2));
        }
    }

    let number = min;
    return number
};

const findSeat = (seatCode) => {
    const [ rowCode, colCode ] = splitSeatCode(seatCode);
    const row = findNumber(rowCode);
    const col = findNumber(colCode);
    return [ row, col ]
};

const findID = (seatCode) => {
    const [row, col] = findSeat(seatCode);
    const totalCols = 8;
    const id = row * totalCols + col;
    return id
}; 

const seatsIDs = seatsCodes.map(seatCode => findID(seatCode));

const sortedSeats = seatsIDs.sort((a, b) => a - b);

const findMissingID = (seats) => {
    let firstSeat = sortedSeats[0];

    for (let i = 0; i < seats.length; i++) {
        const idIsMissing = seats[i] !== i + firstSeat;
        const missingID = seats[i] - 1;
    
        if (idIsMissing) {
            return missingID
        }
    }
};

console.log(findMissingID(sortedSeats));
