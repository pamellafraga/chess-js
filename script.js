const board = document.getElementById("chessboard");

const initialPosition = [
  ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"],
  ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"],
  ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"]
];

const pieceSymbols = {
  wP: "♙", wR: "♖", wN: "♘", wB: "♗", wQ: "♕", wK: "♔",
  bP: "♟", bR: "♜", bN: "♞", bB: "♝", bQ: "♛", bK: "♚"
};

let boardState = JSON.parse(JSON.stringify(initialPosition));
let selected = null;
let currentTurn = "w"; // w = branco, b = preto

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

      const piece = boardState[row][col];
      square.textContent = pieceSymbols[piece] || "";

      square.addEventListener("click", () => handleSquareClick(row, col, square));
      board.appendChild(square);
    }
  }
}

function handleSquareClick(row, col, square) {
  const piece = boardState[row][col];

  if (selected) {
    const fromRow = selected.row;
    const fromCol = selected.col;
    const selectedPiece = boardState[fromRow][fromCol];

    // Verifica se está movendo pra posição diferente
    if (fromRow !== row || fromCol !== col) {
      // Movimento válido? (por enquanto: só se não for peça do mesmo lado)
      if (!piece || piece[0] !== currentTurn) {
        boardState[row][col] = selectedPiece;
        boardState[fromRow][fromCol] = "";
        currentTurn = currentTurn === "w" ? "b" : "w"; // Alterna turno
      }
    }

    selected = null;
    createBoard();
  } else if (piece && piece[0] === currentTurn) {
    selected = { row, col };
    square.classList.add("selected");
  }
}

createBoard();

