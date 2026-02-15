const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

const WIN_LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

let board = Array(9).fill("");
let currentPlayer = "X";
let gameOver = false;

// Create board cells
for (let i = 0; i < 9; i++) {
  const btn = document.createElement("button");
  btn.className = "cell";
  btn.dataset.index = i;
  boardEl.appendChild(btn);
}

// Handle cell clicks
boardEl.addEventListener("click", (e) => {
  const cell = e.target.closest(".cell");
  if (!cell) return;

  // Prevent moves if game is over or cell is already filled
  if (gameOver || board[cell.dataset.index] !== "") return;

  const index = Number(cell.dataset.index);
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  // Check for winner
  const winner = getWinner(board);
  if (winner) {
    gameOver = true;
    statusEl.textContent = `Player ${winner} wins!`;
    statusEl.classList.add("winner");
    return;
  }

  // Check for draw
  if (board.every(v => v !== "")) {
    gameOver = true;
    statusEl.textContent = "It's a draw!";
    statusEl.classList.add("draw");
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusEl.textContent = `Player ${currentPlayer}'s turn`;
});

// Handle reset button
resetBtn.addEventListener("click", resetGame);

/**
 * Check if there's a winner
 * @param {Array} b - The board state
 * @returns {string|null} - The winner ("X" or "O") or null
 */
function getWinner(b) {
  for (const [a, c, d] of WIN_LINES) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) {
      return b[a];
    }
  }
  return null;
}

/**
 * Reset the game to initial state
 */
function resetGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;
  
  // Clear all cells
  document.querySelectorAll(".cell").forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
  
  // Reset status
  statusEl.textContent = `Player ${currentPlayer}'s turn`;
  statusEl.classList.remove("winner", "draw");
}

// Initialize game status
statusEl.textContent = `Player ${currentPlayer}'s turn`;