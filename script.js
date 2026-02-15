const boardEl = document.getElementById("board");

for (let i = 0; i < 9; i++) {
  const btn = document.createElement("button");
  btn.className = "cell";
  btn.dataset.index = i;
  boardEl.appendChild(btn);
}


