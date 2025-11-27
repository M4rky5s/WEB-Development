let board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
let players = [];
let currentPlayerIndex = 0;
let gameActive = false;

function Player(name, symbol) {
    this.name = name;
    this.symbol = symbol;
}

function startGame() {
    const p1 = document.getElementById("playerOne").value || "Player 1";
    const p2 = document.getElementById("playerTwo").value || "Player 2";

    players = [
        new Player(p1, "X"),
        new Player(p2, "O")
    ];

    board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
    currentPlayerIndex = 0;
    gameActive = true;

    document.getElementById("status").textContent =
        `${players[currentPlayerIndex].name} (${players[currentPlayerIndex].symbol}) turn`;

    renderBoard();
}

function renderBoard() {
    const boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";

    board.forEach((cell, index) => {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.textContent = cell === "-" ? "" : cell;

        div.addEventListener("click", () => handleCellClick(index));

        boardDiv.appendChild(div);
    });
}

function handleCellClick(index) {
    if (!gameActive || board[index] !== "-") return;

    const player = players[currentPlayerIndex];

    board[index] = player.symbol;
    renderBoard();

    if (checkWin(player.symbol)) {
        document.getElementById("status").textContent =
            `${player.name} (${player.symbol}) wins!`;
        gameActive = false;
        return;
    }

    if (!board.includes("-")) {
        document.getElementById("status").textContent = "It's a tie!";
        gameActive = false;
        return;
    }

    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;

    document.getElementById("status").textContent =
        `${players[currentPlayerIndex].name} (${players[currentPlayerIndex].symbol}) turn`;
}

function checkWin(symbol) {
    const w = [
        [0,1,2], [3,4,5], [6,7,8], // rows
        [0,3,6], [1,4,7], [2,5,8], // cols
        [0,4,8], [2,4,6]           // diagonals
    ];

    return w.some(combo =>
        combo.every(i => board[i] === symbol)
    );
}

document.getElementById("start").addEventListener("click", startGame);
