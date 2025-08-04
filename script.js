const board = document.getElementById("chessboard");

function createBoard() {
  board.innerHTML = "";
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.classList.add("square");
      const isWhite = (row + col) % 2 === 0;
      square.classList.add(isWhite ? "white" : "black");
      board.appendChild(square);
    }
  }
}

createBoard();
