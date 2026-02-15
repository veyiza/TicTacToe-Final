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

for (let i = 0; i < 9; i++) {
  const btn = document.createElement("button");
  btn.className = "cell";
  btn.dataset.index = i;
  boardEl.appendChild(btn);
}

boardEl.addEventListener("click", (e) => {
  const cell = e.target.closest(".cell");
  if (!cell) return;

  const index = Number(cell.dataset.index);
  if (gameOver || board[index] !== "") return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  const winner = getWinner(board);
  if (winner) {
    gameOver = true;
    statusEl.textContent = `Player ${winner} wins!`;
    disableBoard();
    return;
  }

  if (board.every(v => v !== "")) {
    gameOver = true;
    statusEl.textContent = "It’s a draw.";
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusEl.textContent = `Player ${currentPlayer}’s turn`;
});

resetBtn.addEventListener("click", resetGame);

function getWinner(b) {
  for (const [a,c,d] of WIN_LINES) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
  }
  return null;
}

function disableBoard() {
  document.querySelectorAll(".cell").forEach(c => c.disabled = true);
}

function resetGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;
  document.querySelectorAll(".cell").forEach(c => {
    c.textContent = "";
    c.disabled = false;
  });
  statusEl.textContent = `Player ${currentPlayer}’s turn`;
}
