// Setup
const fs = require('fs');
const rawInput = fs.readFileSync('input.txt', 'utf-8');
const rawRules = rawInput.split('.\n');

const createObject = (rule) => {
    let object = {};

    const parsedRule = rule.replace(/ bags| bag|\./g, '');
    const [ rawContainer, rawContent ] = parsedRule.split('contain ');
    const container = rawContainer.trim();
    const parsedContent = rawContent.split(', ');

    object.container = container;

    for (let i = 0; i < parsedContent.length; i++) {
        const separatedContent = parsedContent[i].split(' ');
        // const content = `${separatedContent[1]} ${separatedContent[2]}`;
        const content = separatedContent.slice(1).join(',').replace(/,/g, ' ')

        if (object.content) {
            object.content = [...object.content, content];
        } else {
            object.content = [content];
        }
    }
    return object;
};

const getParsedRules = (rawRules) => {
    let parsedRules = [];
    for (let i = 0; i < rawRules.length; i++) {
        parsedRules.push(createObject(rawRules[i]));
    }
    return parsedRules;
};

const parsedRules = getParsedRules(rawRules);
let finalContainers = [];

// Helpers
const findContainers = (content, rules) => {
    let containers = [];
    for (let rule of rules) {
        for (let i = 0; i < rule.content.length; i++) {
            if (rule.content[i] === content) {
                containers.push(rule.container);
            }
        }
    }
    checkContainersContainers(containers);
    return containers;
};

const checkContainersContainers = (containers) => {
    if (containers.length !== 0) {
        for (let container of containers) {
            findContainers(container, parsedRules);
            if (!finalContainers.includes(container)) {
                finalContainers = [...finalContainers, container];
            }
        }
    }
};

const findContainersAmount = (content, rules) => {
    findContainers(content, rules);
    return finalContainers.length;
};

console.log(findContainersAmount('shiny gold', parsedRules));