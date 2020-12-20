const fs = require('fs');
const rawInput = fs.readFileSync('input.txt', 'utf-8');
const [ rawTimestamp, rawBuses ] =  rawInput.split('\n');
const timestamp = Number(rawTimestamp);
const buses = rawBuses.split(',');
const runningBuses = buses
    .filter(bus => bus !== 'x')
    .map(bus => Number(bus));

const createObjArr = (runningBuses) => {
    let busesObjArr = [];

    for (let i = 0; i < runningBuses.length; i++) {
        let journeyNumber = Math.ceil(timestamp / runningBuses[i]);
        let nextDepart = runningBuses[i] * journeyNumber;
        let minutesLeft = nextDepart - timestamp;
        let obj = {
            id: runningBuses[i],
            nextDepart: nextDepart,
            minutesLeft: minutesLeft
        };
        busesObjArr.push(obj);
    }
    return busesObjArr;
};

const busesObjArr = createObjArr(runningBuses);

const findEarliest = (busesObjArr) => {
    const earliest = busesObjArr.reduce((earlier, later) => earlier.minutesLeft < later.minutesLeft ? earlier : later);
    return earliest;
};

const earliest = findEarliest(busesObjArr);

const getProduct = (earliest) => {
    let bus = earliest.id;
    let minutesLeft = earliest.minutesLeft;
    let total = bus * minutesLeft;
    return total;
};

console.log(getProduct(earliest));