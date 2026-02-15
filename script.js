const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");

let board = Array(9).fill("");
let currentPlayer = "X";

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
  if (board[index] !== "") return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusEl.textContent = `Player ${currentPlayer}’s turn`;
});
