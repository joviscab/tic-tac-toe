//gameBoard object
const gameBoard = {
    rows: 3,
    columns: 3,
    board: [
        0, 1, 3,
        4, 5, 6,
        7, 8, 9
    ],
    playerOneMark: "x",
    playerTwoMark: "o",

    //print the board
    printBoard() {
        console.log(this.board.slice(0, this.columns).join(" "));
        console.log(this.board.slice(this.columns, this.columns * 2).join(" "));
        console.log(this.board.slice(this.columns * 2).join(" "));
    },

    //player square selection
    playerSelection(index, mark) {
        if (index >= 0 && index < this.board.length && typeof this.board[index] === 'number') {
            this.board[index] = mark;
        } else {
            console.log("Invalid move");
        }
    }
};




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

console.log({playerOneName: playerOne.playerOneName, score: playerOne.getScore()});
console.log({playerTwoName: playerTwo.playerTwoName, score: playerTwo.getScore()});

//game object
function playRound () {

}
