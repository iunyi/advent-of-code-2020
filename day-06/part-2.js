//Setup
const fs = require('fs');
const rawInput = fs.readFileSync('input.txt', 'utf-8');
const rawGroups = rawInput.split('\n\n');

const splitGroupsIntoArrays = (rawGroups) => {
    let groups = [];
    for (let group of rawGroups) {
        let parsedGroupAnswers = group.split('\n');                
        groups.push(parsedGroupAnswers);
    }
    return groups
};

const groups = splitGroupsIntoArrays(rawGroups);

// Helpers
const splitAnswers = (groupAnswers) => {
    groupAnswers.sort((a, b) => a.length - b.length);
    const shortestAnswer = new Set(groupAnswers[0]);
    const restOfAnswers = groupAnswers.slice(1);
    return [ shortestAnswer, restOfAnswers ]
};

const findCommonAnswers = (groupAnswers) => {
    let letterFrequency = {};
    let commonAnswers = [];
    const isGroupOfOneMember = groupAnswers.length === 1;
    const memberAnswer = groupAnswers[0];

    if (isGroupOfOneMember) {
        for (let letter of memberAnswer) {
            letterFrequency[letter] = 1;
            commonAnswers.push(letter);
        }
    } else {
        const [ shortestAnswer, restOfAnswers ] = splitAnswers(groupAnswers);

        for (let answer of restOfAnswers) {
            for (let i = 0; i < answer.length; i++) {
                const currentLetter = answer[i]
                const isLetterSaved = letterFrequency[currentLetter] !== undefined;

                if (shortestAnswer.has(currentLetter) && !isLetterSaved) {
                    letterFrequency[currentLetter] = 1;
                } else if (shortestAnswer.has(currentLetter) && isLetterSaved) {
                    letterFrequency[currentLetter]++;
                } 
            }
        }
    
        for (let letter in letterFrequency) {
            if (letterFrequency[letter] === restOfAnswers.length) {
                commonAnswers.push(letter)
            }
        }
    }
    let totalCommonAnswers = commonAnswers.length;
    return totalCommonAnswers
};

// Solution
const sumTotalCommonAnswers = (groups) => {
    let sum = 0;
    for (let group of groups) {
        let totalCommonAnswers = findCommonAnswers(group);
        sum += totalCommonAnswers;
    }
    return sum
};

console.log(sumTotalCommonAnswers(groups));