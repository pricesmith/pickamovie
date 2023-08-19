// import fs from 'fs';
import inquirer from 'inquirer';

const list = [
    "Mad God",
    "I Love You Man",
    "Blue Velvet",
    "Beyond the Black Rainbow",
    "Parasite",
    "Mulholland Drive",
];

let graveyard = [];

const getRandom = (list) => {
    let filteredList = filterList(list, graveyard);
    let idx = Math.floor(Math.random() * filteredList.length);
    return filteredList[idx];
};

const filterList = (list, graveyard) => {
    return list.filter(item => !graveyard.includes(item));
}

const promptUser = async (current, filteredList) => {
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: `What about "${current}"?`,
            choices: ['Yes', 'No'],
        },
    ]);

    const choice = answer.choice.toLowerCase();

    if (choice === 'yes') {
        console.log('Yay.');
    } else if (choice === 'no') {
        console.log('Lame.');
        graveyard.push(current);

        const newFilteredList = filterList(filteredList, graveyard);
        if (newFilteredList.length > 0) {
            const newRandom = getRandom(newFilteredList);
            promptUser(newRandom, newFilteredList);
        } else {
            console.log("You've excluded all remaining movies. Your 'Don't Want to Watch' list is complete!");
            process.exit(0);
        }
    }
}

const item = getRandom(list);
promptUser(item, list);