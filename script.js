function createPlayer(name, symbol) {
    return { name, symbol};
}

const players = [];
let currentPlayer;

function switchPlayers() {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    const announcement = document.getElementById("playerTurn");
    announcement.textContent = `Current Player: ${currentPlayer.name} (${currentPlayer.symbol})`;
}

const gameBoard = (function() {
    const board = [ '','','',
                    '', '','',
                    '','',''];
    return {board};
})();

function checkWinConditions(board) {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const condition of winConditions){
        const[a,b,c] = condition;

        if(board[a] !== "" && board[a] === board[b] && board[a] === board[c]){
            return board[a];
        }
        if (board.every(cell => cell !== "")) {
            return "draw";
        }
    }
    return null;
}

function displayWinner(winner) {
    const announcement = document.getElementById("playerTurn");
    const winMet = document.getElementById("winMet");

    if (winner === "draw") {
        winMet.textContent = "Draw!";
    } else if (winner) {
        const winningPlayer = players.find(player => player.symbol === winner);
        announcement.textContent = `Winner: ${winningPlayer.name} (${winningPlayer.symbol})`;
    } else {
        winMet.textContent = "Not Won Yet";
    }
}


const displayController = (function() {
    const updateBoard = function(gameBoard, position, symbol) {
        gameBoard[position] = symbol;
    };
    return {updateBoard};
})();


function handleCellClick(event){
    const cell = event.target;
    const rowIndex = Array.from(cell.parentNode.parentNode.children).indexOf(cell.parentNode);
    const cellIndex = rowIndex * 3 + Array.from(cell.parentNode.children).indexOf(cell);

    if (gameBoard.board[cellIndex] === '') {
        displayController.updateBoard(gameBoard.board, cellIndex, currentPlayer.symbol);
        const winner = checkWinConditions(gameBoard.board);
        displayWinner(winner);
        if (!winner)
            switchPlayers();
        renderBoard();
    }
}

console.log(gameBoard.board);

function renderBoard() {
    const board = document.querySelector(".gameBoard");
    const boardTable = document.createElement("table");

    for (let row = 0; row < 3; row++) {
        const tableRow = document.createElement("tr");

        for (let col = 0; col < 3; col++) {
            const tableCell = document.createElement("td");
            const index = row * 3 + col;
            tableCell.textContent = gameBoard.board[index];
            tableCell.addEventListener("click", handleCellClick);
            tableRow.appendChild(tableCell);
        }
        boardTable.appendChild(tableRow);
    }
    board.innerHTML = '';
    board.appendChild(boardTable);
}

const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", restartGame);

function restartGame () {
    gameBoard.board = [ '','','','', '','', '','',''];
    displayWinner(null);
    currentPlayer = players[0];
    const announcement = document.getElementById("playerTurn");
    announcement.textContent = `Current Player: ${currentPlayer.name} (${currentPlayer.symbol})`;
    renderBoard();
}

const playerButton = document.getElementById("player");
playerButton.addEventListener("click", setPlayer);

function setPlayer () {

    const symbolInput = prompt("Enter a symbol (X or O) for the new players:");
    if (symbolInput && (symbolInput === "X" || symbolInput === "O")){
        const nameInput = prompt("Enter a name for the player:");
        if (nameInput){
            const newPlayer = createPlayer(nameInput,symbolInput);
            players.push(newPlayer);

            let newSymbol = symbolInput;
            if (symbolInput === "X")
                newSymbol = "O";
            else if (symbolInput === "O")
                newSymbol = "X";
            const secondPlayerName = prompt("Enter a name for the second player");
            if (secondPlayerName){
                const secondPlayer = createPlayer(secondPlayerName, newSymbol);
                players.push(secondPlayer);
            }
            switchPlayers();
        }
        else   
            alert("Invalid player name. Please re-enter again");
    }
    else
        alert("Invalid symbol. Please enter 'X' or 'O'");
}

renderBoard();
