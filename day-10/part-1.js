const fs = require('fs');
const rawInput = fs.readFileSync('input.txt', 'utf-8');
const rawAdapters = rawInput.split('\n');
const adapters = rawAdapters.map(item => Number(item));
adapters.sort((a, b) => a - b);
const chargingOutlet = 0;
const deviceAdapter = adapters[adapters.length - 1] + 3;
adapters.unshift(chargingOutlet);
adapters.push(deviceAdapter);

const countJoltDifferences = (adapters) => {
    let oneJoltDifferences = 0;
    let threeJoltDifferences = 0;
    for (let i = 0; i < adapters.length; i++) {
        if (adapters[i + 1] - adapters[i] === 1) {
            oneJoltDifferences++;
        } else if (adapters[i + 1] - adapters[i] === 3) {
            threeJoltDifferences++;
        }
    }
    return [oneJoltDifferences, threeJoltDifferences];
};

const findProduct = () => {
    const [ oneJoltDifferences, threeJoltDifferences ] = countJoltDifferences(adapters);
    let total =  oneJoltDifferences * threeJoltDifferences;
    return total;
}

console.log(findProduct());