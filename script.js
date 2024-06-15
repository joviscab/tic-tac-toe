//gameBoard object
function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [
        0, 1, 3,
        4, 5, 6,
        7, 8, 9
    ];
    console.log(board);
}

//players object
function newPlayer (name) {
    const playerOneName = name;
    const playerTwoName = name;

    let score = 0;
    const getScore = () => score;
    const addScore = () => score++;

    return {playerOneName, playerTwoName, getScore, addScore};
}

const playerOneName = prompt("Enter player 1 name:");
const playerTwoName = prompt("Enter player 2 name:");

const playerOne = newPlayer(playerOneName);
const playerTwo = newPlayer(playerTwoName);

playerOne.addScore();
playerOne.addScore();
playerTwo.addScore();

//const john = newPlayer("john");
//john.addScore();
//john.getScore();
console.log({playerOneName: playerOne.playerOneName, score: playerOne.getScore()});
console.log({playerTwoName: playerTwo.playerTwoName, score: playerTwo.getScore()});



//game object
