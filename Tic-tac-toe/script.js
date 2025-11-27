let board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];

const players = [];

function Player(name){
    this.name = name;
}

function printBoard() {
    console.log(`${board[0]} | ${board[1]} | ${board[2]}`);
    console.log(`${board[3]} | ${board[4]} | ${board[5]}`);
    console.log(`${board[6]} | ${board[7]} | ${board[8]}`);
}

function takeTurn(player) {
    console.log(`${player}'s turn.`);
    let position = prompt("Choose a position from 1-9:");
    position -= 1;
    while (position < 0 || position > 8 || board[position] !== "-") {
        position = prompt("Invalid input or position already taken. Choose a different position:");
        position -= 1;
    }
    board[position] = player;
    printBoard();
}

function checkGameOver() {
    if ((board[0] === board[1] && board[1] === board[2] && board[0] !== "-") ||
        (board[3] === board[4] && board[4] === board[5] && board[3] !== "-") ||
        (board[6] === board[7] && board[7] === board[8] && board[6] !== "-") ||
        (board[0] === board[3] && board[3] === board[6] && board[0] !== "-") ||
        (board[1] === board[4] && board[4] === board[7] && board[1] !== "-") ||
        (board[2] === board[5] && board[5] === board[8] && board[2] !== "-") ||
        (board[0] === board[4] && board[4] === board[8] && board[0] !== "-") ||
        (board[2] === board[4] && board[4] === board[6] && board[2] !== "-")) {
        return "win";
    } else if (!board.includes("-")) {
        return "tie";
    } else {
        return "play";
    }
}

function main() {
    let player1 = document.getElementById('playerOne').value;
    let player2 = document.getElementById('playerTwo').value;

    let player = new Player(name);

    printBoard();
    let currentPlayer = player1;
    let gameOver = false;
    while (!gameOver) {
        takeTurn(currentPlayer);
        let gameResult = checkGameOver();
        if (gameResult === "win") {
            console.log(`${currentPlayer} wins!`);
            gameOver = true;
        } else if (gameResult === "tie") {
            console.log("It's a tie!");
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
}

main();