//gameBoard object
const gameBoard = {
    rows: 3,
    columns: 3,
    board: [
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
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
    },

    //check for winner
    checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], //possible rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], //possible columns
            [0, 4, 8], [2, 4, 6]  //possible diagonals    
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (this.board[a] === this.board[b] && this.board[a] === this.board[c] && typeof this.board[a] === 'string') {
               return this.board[a]; 
            }
        }

        if (this.board.every(cell => typeof cell === 'string')) {
            return 'tie';
        }

        return null;
    },

    resetBoard() {
        this.board = [
            0, 1, 2,
            3, 4, 5,
            6, 7, 8
        ];
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

        return {playerOne, playerTwo};
    }
};

//game object
const game = {
    currentPlayer: null,
    currentMark: null,
    playerOne: null,
    playerTwo: null,

    //initialize players
    initializePlayers() {
        const players = playerManager.initializePlayers();
        this.playerOne = players.playerOne;
        this.playerTwo = players.playerTwo;
        this.currentPlayer = this.playerOne;
        this.currentMark = gameBoard.playerOneMark;
    },

    //alternate rounds
    switchPlayer() {
        if (this.currentPlayer === this.playerOne) {
            this.currentPlayer = this.playerTwo;
            this.currentMark = gameBoard.playerTwoMark;
        } else {
            this.currentPlayer = this.playerOne;
            this.currentMark = gameBoard.playerOneMark;
        }
    },

    //start one round
    playRound() {
        this.initializePlayers();

        while (true) {
            gameBoard.printBoard();

            const index = parseInt(prompt(`${this.currentPlayer.name}, enter your move (0-8):`), 10);

            gameBoard.playerMove(index, this.currentMark);

            const winner = gameBoard.checkWin();
            if (winner) {
                gameBoard.printBoard();
                if (winner === 'tie') {
                    console.log("It's a tie!");
                } else {
                    console.log(`${this.currentPlayer.name} wins!`);
                    this.currentPlayer.addScore();
                }

                console.log({playerOneName: this.playerOne.name, score: this.playerOne.getScore()});
                console.log({playerTwoName: this.playerTwo.name, score: this.playerTwo.getScore()});

                gameBoard.resetBoard ();

                if (confirm("Do you want to play another round?")) {
                    this.currentPlayer = this.playerOne;
                    this.currentMark = gameBoard.playerOneMark;
                    continue;
                } else {
                    break;
                }
            }

            this.switchPlayer();
        }
    }
};

//start game
game.playRound();

//display DOM object