const board = document.getElementById("chessboard");

const initialPosition = [
  ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
  ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
  ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"]
];

function createBoard() {
  board.innerHTML = "";
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.classList.add("square");
      const isWhite = (row + col) % 2 === 0;
      square.classList.add(isWhite ? "white" : "black");
      square.dataset.row = row;
      square.dataset.col = col;

      const piece = initialPosition[row][col];
      square.textContent = piece;

      square.addEventListener("click", () => handleSquareClick(row, col));

      board.appendChild(square);
    }
  }
}

let selected = null;

function handleSquareClick(row, col) {
  const squareIndex = row * 8 + col;
  const squares = document.querySelectorAll(".square");
  const square = squares[squareIndex];

  if (selected) {
    // Mover peça
    const fromRow = selected.row;
    const fromCol = selected.col;
    const fromIndex = fromRow * 8 + fromCol;

    const fromSquare = squares[fromIndex];
    const piece = fromSquare.textContent;

    fromSquare.textContent = "";
    square.textContent = piece;

    selected = null;
  } else {
    const piece = square.textContent;
    if (piece !== "") {
      selected = { row, col };
    }
  }
}

createBoard();
