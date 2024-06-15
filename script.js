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
    playerMove: function(index, mark) {
        if (index >= 0 && index < this.board.length && typeof this.board[index] === 'number') {
            this.board[index] = mark;
        } else {
            console.log("Invalid move");
        }
    }
};


//players object
const playerManager = {
    create(name) {
        let score = 0;

        return {
            name,
            getScore() {
                return score;
            },
            addScore() {
                score++;
            }
        };
    },

    //initialize players
    initializePlayers() {
        const playerOneName = prompt("Enter Player 1 name:");
        const playerTwoName = prompt("Enter Player 2 name:");

        const playerOne = this.create(playerOneName);
        const playerTwo = this.create(playerTwoName);

        playerOne.addScore();
        playerOne.addScore();
        playerTwo.addScore();

        console.log({ playerOneName: playerOne.name, score: playerOne.getScore() });
        console.log({ playerTwoName: playerTwo.name, score: playerTwo.getScore() });

    }
};

playerManager.initializePlayers();




//game object
function playRound () {

}
