//  Images for doors
const botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
const beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
const spaceDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";
const closedDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";
//  Relevant elements by ID
const doorImage1 = document.getElementById('door1');
const doorImage2 = document.getElementById('door2');
const doorImage3 = document.getElementById('door3');
const startButton = document.getElementById('start');
const currentStreakButton = document.getElementById('current-streak');
const bestStreakButton = document.getElementById('best-streak');
//  Doors to change images once clicked
let openDoor1;
let openDoor2;
let openDoor3;
let numClosedDoors = 3;
//  Keep track of scores
let bestStreak = 0;
let currentStreak = 0;
let currentlyPlaying = true;

/**
 * Generates a random door to contain ChoreBot. Assigns the rest of the doors the beach and space scenes.
 */
const randomChoreDoorGenerator = () => {
    const choreDoor = Math.floor(Math.random() * numClosedDoors);
    switch(choreDoor) {
        case 0:
            openDoor1 = botDoorPath;
            openDoor2 = beachDoorPath;
            openDoor3 = spaceDoorPath;
            break;
        case 1:
            openDoor1 = beachDoorPath;
            openDoor2 = botDoorPath;
            openDoor3 = spaceDoorPath;
            break;
        case 2:
            openDoor1 = beachDoorPath;
            openDoor2 = spaceDoorPath;
            openDoor3 = botDoorPath;
            break;
    }
}

/**
 * Returns whether or not the user opened Chore Bot's door
 * @param {Element} door the door to check
 * @returns boolean true if contains Chore Bot
 */
const isBot = (door) => {
    return door.src === botDoorPath;
}

/**
 * Returns whether or not the door has already been opened
 * @param {Element} door the door to check
 * @returns boolean true if door has been opened
 */
const isClicked = (door) => {
    return !door.src === closedDoorPath;
}

/**
 * Decides when to send game to end state
 * @param {Element} door the door that has been clicked
 */
const playDoor = (door) => {
    numClosedDoors--;
    if (numClosedDoors === 0) {
        gameOver('win');
    } else if (isBot(door)) {
        gameOver();
    }
}

doorImage1.onclick = () => {
    if (currentlyPlaying && !isClicked(doorImage1)) {
        doorImage1.src = openDoor1;
        playDoor(doorImage1);
    }
}

doorImage2.onclick = () => {
    if (currentlyPlaying && !isClicked(doorImage2)) {
        doorImage2.src = openDoor2;
        playDoor(doorImage2);
    }
}

doorImage3.onclick = () => {
    if (currentlyPlaying && !isClicked(doorImage3)) {
        doorImage3.src = openDoor3;
        playDoor(doorImage3);
    }
}

startButton.onclick = () => {
    if (!currentlyPlaying) {
        startRound();
    }
}

const startRound = () => {
    doorImage1.src = closedDoorPath;
    doorImage2.src = closedDoorPath;
    doorImage3.src = closedDoorPath;
    numClosedDoors = 3;
    startButton.innerHTML = 'Good Luck!';
    currentlyPlaying = true;
    randomChoreDoorGenerator();
}

const gameOver = (status) => {
    if (status === 'win') {
        currentStreak++;
        startButton.innerHTML = 'You win! Play again?';
        if (currentStreak > bestStreak) {
            bestStreak = currentStreak;
            bestStreakButton.innerHTML = `${bestStreak}`; 
        }
    } else {
        currentStreak = 0;
        startButton.innerHTML = 'Game over! Play again?';
    }
    currentStreakButton.innerHTML = `${currentStreak}`;
    currentlyPlaying = false;
}

startRound();