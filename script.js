const startButton = document.getElementById('startGame');
const gameGrid = document.getElementById('gameGrid');
const gameStatus = document.getElementById('gameStatus');

let currentPlayer = 'Player 1';  // Use player names instead of X and O
let gameActive = false;
let board = Array(25).fill(''); // 5x5 grid

// Define winning conditions for a 5x5 grid
const winConditions = [
    // Rows
    [0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 17, 18, 19], [20, 21, 22, 23, 24],
    // Columns
    [0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22], [3, 8, 13, 18, 23], [4, 9, 14, 19, 24],
    // Diagonals
    [0, 6, 12, 18, 24], [4, 8, 12, 16, 20]
];

startButton.addEventListener('click', startGame);

gameGrid.addEventListener('click', (e) => {
    if (gameActive && e.target.classList.contains('cell') && !e.target.textContent) {
        const index = e.target.getAttribute('data-index');
        board[index] = currentPlayer;
        e.target.textContent = currentPlayer === 'Player 1' ? 'X' : 'O'; // Display X or O for players
        e.target.classList.add(currentPlayer === 'Player 1' ? 'x' : 'o');

        if (checkWin()) {
            gameStatus.textContent = `${currentPlayer} wins!`;
            gameActive = false;
            highlightWinningCells();
        } else if (board.every(cell => cell)) {
            gameStatus.textContent = 'It\'s a draw!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1';
            gameStatus.textContent = `${currentPlayer}'s turn`;
        }
    }
});

function startGame() {
    board = Array(25).fill(''); // Reset the board for a 5x5 grid
    gameActive = true;
    currentPlayer = 'Player 1';
    gameStatus.textContent = `${currentPlayer}'s turn`;

    Array.from(gameGrid.children).forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
        cell.style.backgroundColor = '#222';  // Reset background color
    });
}

function checkWin() {
    return winConditions.some(condition => {
        const [a, b, c, d, e] = condition;
        return board[a] && board[a] === board[b] && board[a] === board[c] && board[a] === board[d] && board[a] === board[e];
    });
}

function highlightWinningCells() {
    winConditions.forEach(condition => {
        const [a, b, c, d, e] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c] && board[a] === board[d] && board[a] === board[e]) {
            document.querySelector(`.cell[data-index="${a}"]`).style.backgroundColor = '#0f0';
            document.querySelector(`.cell[data-index="${b}"]`).style.backgroundColor = '#0f0';
            document.querySelector(`.cell[data-index="${c}"]`).style.backgroundColor = '#0f0';
            document.querySelector(`.cell[data-index="${d}"]`).style.backgroundColor = '#0f0';
            document.querySelector(`.cell[data-index="${e}"]`).style.backgroundColor = '#0f0';
        }
    });
}
