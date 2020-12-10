const fs = require('fs');
const rawInput = fs.readFileSync('input.txt', 'utf-8');
const splitGroups = rawInput.split('\n\n');

const removeNewLines = (groupAnswer) => {
    return groupAnswer.replace(/\n/g, '');
};

const countGroupAnswers = (groupAnswer) => {
    let answersArray = [];
    for (let answer of groupAnswer) {
        answersArray.push(answer);
    }
    const uniqueAnswers = [...new Set(answersArray)];
    let totalUniqueAnswers = uniqueAnswers.length;
    return totalUniqueAnswers
};

const countTotalAnswers = (groups) => {
    let totalAnswers = 0;
    for (let i = 0; i < groups.length; i++) {
        const currentGroup = groups[i];
        const groupParsedAnswer = removeNewLines(currentGroup);
        const groupTotalAnswers = countGroupAnswers(groupParsedAnswer);
        totalAnswers += groupTotalAnswers;
    }
    return totalAnswers
};

console.log(countTotalAnswers(splitGroups));