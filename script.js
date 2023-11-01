function createPlayer(name, symbol) {
    return { name, symbol};
}

const gameBoard = (function() {
    const board = [ '','','',
                    '', '','',
                    '','',''];
    return {board};
})();

const displayController = (function() {
    
    const updateBoard = function(gameBoard, position, symbol) {
        gameBoard[position] = symbol;
    };

    return {updateBoard};

})();

console.log(gameBoard.board);
displayController.updateBoard(gameBoard.board, 0, 'X');
displayController.updateBoard(gameBoard.board, 1, 'X');
displayController.updateBoard(gameBoard.board, 2, 'X');
displayController.updateBoard(gameBoard.board, 3, 'O');
displayController.updateBoard(gameBoard.board, 4, 'O');
displayController.updateBoard(gameBoard.board, 5, 'O');
displayController.updateBoard(gameBoard.board, 6, 'X');
displayController.updateBoard(gameBoard.board, 7, 'X');
displayController.updateBoard(gameBoard.board, 8, 'X');
console.log(gameBoard.board);

function renderBoard() {
    const mainDiv = document.querySelector(".gameBoard");

    const boardTable = document.createElement("table");

    for (let row = 0; row < 3; row++) {
        const tableRow = document.createElement("tr");

        for (let col = 0; col < 3; col++) {
            const tableCell = document.createElement("td");
            tableCell.textContent = gameBoard.board[row * 3 + col];
            tableRow.appendChild(tableCell);
        }
        boardTable.appendChild(tableRow);
    }

    mainDiv.appendChild(boardTable);
}

renderBoard();