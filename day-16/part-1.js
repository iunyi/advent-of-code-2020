// SETUP
const fs = require('fs');
const rawInput = fs.readFileSync('input.txt', 'utf-8');
const [rawRules, rawMyTicket, rawNearbyTickets] = rawInput.split('\n\n');

// 1. Rules
const rawRules2 = rawRules.split('\n');

const separateRuleSegments = () => {
    let rawRule3 =[];
    for (let rule of rawRules2) {
        let newRule = rule.split(': ')
        rawRule3.push(newRule);
    }
    return rawRule3;
};

const rawRules3 = separateRuleSegments();

const createObj = (rule) => {
    let obj = {};
    const { 0: name, 1: rawValues } = rule;
    let ranges = rawValues.split(' or ');
    let [ rangeA, rangeB ] = ranges;
    const  [ aMin, aMax ] = rangeA.split('-');
    const  [ bMin, bMax ] = rangeB.split('-');
    const minMax = [aMin, aMax, bMin, bMax]; 
    minMax.forEach(value => Number(value));
    
    obj = {
        name: name,
        rangeA: {
            min: aMin,
            max: aMax
        },
        rangeB: {
            min: bMin,
            max: bMax
        }
    };
    return obj;
};

const getObjects = () => {
    let objArray = [];
    for (let i = 0; i < rawRules3.length; i++) {
        objArray.push(createObj(rawRules3[i]));
    }
    return objArray;
};

const rules = getObjects();

// 2. Nearby tickets
const rawNearbyTickets2 = rawNearbyTickets.split('\n');

const getTicketNumbers = (ticket) => {
    const separatedItems = ticket.split(',')
    const separatedNumbers = separatedItems.map(num => Number(num));
    return separatedNumbers;
};

const getTicketsArrays = () => {
    let nearbyTickets =[];

    for (let ticket of rawNearbyTickets2) {
        let newTicket = [];
        let ticketNumbers = getTicketNumbers(ticket)
        newTicket.push(ticketNumbers);
        nearbyTickets.push(...newTicket);
    }
    nearbyTickets.shift();
    return nearbyTickets;
};

let nearbyTickets = getTicketsArrays();

// SOLUTION
const iterateTicketNumbers = () => {
    let invalidNumbers = [];

    for (let i = 0; i < nearbyTickets.length; i++) {

        for (let j = 0; j < nearbyTickets[i].length; j++) {
            const numberOnTicket = nearbyTickets[i][j]
            let acc = 0;

            for (let k = 0; k < rules.length; k++) {
                const minA = rules[k].rangeA.min;
                const maxA = rules[k].rangeA.max;
                const minB = rules[k].rangeB.min;
                const maxB = rules[k].rangeB.max;

                const conditionA = minA <= numberOnTicket && numberOnTicket <= maxA;
                const conditionB = minB <= numberOnTicket && numberOnTicket <= maxB;
 
                if (conditionA === false && conditionB === false) {
                    acc++;
                }
            }
            if (acc === rules.length) {
                invalidNumbers.push(numberOnTicket);
            }
        }
    }
    return invalidNumbers;
};

const invalidNumbers = iterateTicketNumbers();
const sum = invalidNumbers.reduce((acc, num) => acc + num);

console.log(sum);