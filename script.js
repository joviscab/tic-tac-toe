// gameBoard object
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

    // Print the board
    printBoard() {
        console.log(this.board.slice(0, this.columns).join(" "));
        console.log(this.board.slice(this.columns, this.columns * 2).join(" "));
        console.log(this.board.slice(this.columns * 2).join(" "));
    },

    // Player square selection
    playerMove(index, mark) {
        if (index >= 0 && index < this.board.length && typeof this.board[index] === 'number') {
            this.board[index] = mark;
            document.getElementById(`cell-${index}`).textContent = mark; // Update the cell content
        } else {
            console.log("Invalid move");
        }
    },

    // Check for winner
    checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Possible rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Possible columns
            [0, 4, 8], [2, 4, 6]  // Possible diagonals    
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

    // Reset the board
    resetBoard() {
        this.board = [
            0, 1, 2,
            3, 4, 5,
            6, 7, 8
        ];
        this.updateDisplay();
    },

    // Update the display of the board
    updateDisplay() {
        this.board.forEach((cell, index) => {
            document.getElementById(`cell-${index}`).textContent = typeof cell === 'number' ? '' : cell;
        });
    }
};

// playerManager object
const playerManager = {
    // Create a player
    create(name) {
        let score = 0;

        return {
            name,
            getScore() {
                return score;
            },
            addScore() {
                score++;
            },
            resetScore() {
                score = 0;
            }
        };
    },

    // Initialize players
    initializePlayers() {
        const textArea1 = document.getElementById('player1-name');
        const buttonTextArea1 = document.getElementById('player1-change');
        const textArea2 = document.getElementById('player2-name');
        const buttonTextArea2 = document.getElementById('player2-change');

        // Function to start the game after both player names are entered
        const startGame = () => {
            const playerOneName = textArea1.value.trim();
            if (playerOneName) {
                game.playerOne = this.create(playerOneName);
                document.getElementById('player1-score').textContent = `${game.playerOne.name}: ${game.playerOne.getScore()}`;
                const playerTwoName = textArea2.value.trim();
                if (playerTwoName) {
                    game.playerTwo = this.create(playerTwoName);
                    document.getElementById('player2-score').textContent = `${game.playerTwo.name}: ${game.playerTwo.getScore()}`;
                    game.playRound(); // Start the game
                    hideNameInputs(); // Hide name inputs after game start
                } else {
                    alert("Player 2 name cannot be empty");
                }
            } else {
                alert("Player 1 name cannot be empty");
            }
        };

        // Event listener for setting Player 1 name
        buttonTextArea1.addEventListener("click", startGame);

        // Event listener for setting Player 2 name
        buttonTextArea2.addEventListener("click", startGame);
    }
};

// game object
const game = {
    currentPlayer: null,
    currentMark: null,
    playerOne: null,
    playerTwo: null,

    // Initialize players
    initializePlayers() {
        playerManager.initializePlayers();
    },

    // Alternate rounds
    switchPlayer() {
        if (this.currentPlayer === this.playerOne) {
            this.currentPlayer = this.playerTwo;
            this.currentMark = gameBoard.playerTwoMark;
        } else {
            this.currentPlayer = this.playerOne;
            this.currentMark = gameBoard.playerOneMark;
        }
    },

    // Reset the game
    resetGame() {
        gameBoard.resetBoard(); // Reset the game board
        if (this.playerOne) {
            this.playerOne.resetScore(); // Reset Player 1's score
            document.getElementById('player1-score').textContent = `${this.playerOne.name}: ${this.playerOne.getScore()}`;
        }
        if (this.playerTwo) {
            this.playerTwo.resetScore(); // Reset Player 2's score
            document.getElementById('player2-score').textContent = `${this.playerTwo.name}: ${this.playerTwo.getScore()}`;
        }
        this.currentPlayer = this.playerOne; // Reset current player to Player 1
        this.currentMark = gameBoard.playerOneMark; // Reset current mark to Player 1's mark
        showNameInputs(); // Show name inputs after game reset
    },

    // Start one round
    playRound() {
        this.currentPlayer = this.playerOne;
        this.currentMark = gameBoard.playerOneMark;
        gameBoard.updateDisplay();

        // Event handler for cell clicks
        const cellClickHandler = (event) => {
            const index = parseInt(event.target.id.split('-')[1]);
            gameBoard.playerMove(index, this.currentMark);
            const winner = gameBoard.checkWin();
            if (winner) {
                gameBoard.printBoard();
                if (winner === 'tie') {
                    displayGameMessage("It's a tie!");
                } else {
                    displayGameMessage(`${this.currentPlayer.name} wins!`);
                    this.currentPlayer.addScore();
                    document.getElementById('player1-score').textContent = `${this.playerOne.name}: ${this.playerOne.getScore()}`;
                    document.getElementById('player2-score').textContent = `${this.playerTwo.name}: ${this.playerTwo.getScore()}`;
                }

                if (confirm("Do you want to play another round?")) {
                    gameBoard.resetBoard();
                } else {
                    document.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', cellClickHandler));
                }
            } else {
                this.switchPlayer();
            }
        };

        // Attach click event listeners to each cell
        document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', cellClickHandler);
        });

        // Event listener for new round button
        document.getElementById('newround-button').addEventListener('click', () => {
            gameBoard.resetBoard(); // Reset the game board for a new round
        });

        // Event listener for new game button
        document.getElementById('newgame-button').addEventListener('click', () => {
            this.resetGame(); // Reset both board and scoreboard for a new game
        });
    }
};

// Function to display game messages in the "GAME DISPLAY" section
function displayGameMessage(message) {
    const gameDisplay = document.getElementById('display-result');
    gameDisplay.textContent = message;
}

// Function to hide name input fields and buttons
function hideNameInputs() {
    document.getElementById('player1-name').style.display = 'none';
    document.getElementById('player1-change').style.display = 'none';
    document.getElementById('player2-name').style.display = 'none';
    document.getElementById('player2-change').style.display = 'none';
}

// Function to show name input fields and buttons
function showNameInputs() {
    document.getElementById('player1-name').style.display = 'block';
    document.getElementById('player1-change').style.display = 'inline-block';
    document.getElementById('player2-name').style.display = 'block';
    document.getElementById('player2-change').style.display = 'inline-block';
}

// Initialize players
game.initializePlayers();
