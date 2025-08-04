const board = document.getElementById("chessboard");
const turnoDisplay = document.getElementById("turno");

const pieceSymbols = {
  wP: "♙", wR: "♖", wN: "♘", wB: "♗", wQ: "♕", wK: "♔",
  bP: "♟", bR: "♜", bN: "♞", bB: "♝", bQ: "♛", bK: "♚"
};

let boardState = [
  ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"],
  ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"],
  ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"]
];

let selected = null;
let currentTurn = "w"; // 'w' = brancas, 'b' = pretas

function createBoard() {
  board.innerHTML = "";
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.classList.add("square", (row + col) % 2 === 0 ? "white" : "black");
      square.dataset.row = row;
      square.dataset.col = col;
      square.textContent = pieceSymbols[boardState[row][col]] || "";

      square.addEventListener("click", () => handleSquareClick(row, col, square));
      board.appendChild(square);
    }
  }

  turnoDisplay.textContent = `Vez das ${currentTurn === "w" ? "brancas" : "pretas"}`;
}

function handleSquareClick(row, col, square) {
  const piece = boardState[row][col];

  if (selected) {
    const from = selected;
    const to = { row, col };
    const movingPiece = boardState[from.row][from.col];

    if ((from.row !== to.row || from.col !== to.col) && isValidMove(movingPiece, from, to)) {
      const destino = boardState[to.row][to.col];
      if (!destino || destino[0] !== currentTurn) {
        boardState[to.row][to.col] = movingPiece;
        boardState[from.row][from.col] = "";
        currentTurn = currentTurn === "w" ? "b" : "w";
      }
    }

    selected = null;
    createBoard();
  } else if (piece && piece[0] === currentTurn) {
    selected = { row, col };
    square.classList.add("selected");
  }
}

function isValidMove(piece, from, to) {
  if (!piece) return false;
  const tipo = piece[1];
  const dx = to.col - from.col;
  const dy = to.row - from.row;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);

  switch (tipo) {
    case "P": {
      const dir = piece[0] === "w" ? -1 : 1;
      const startRow = piece[0] === "w" ? 6 : 1;
      const frente = boardState[to.row][to.col];
      // movimento simples
      if (dx === 0 && dy === dir && !frente) return true;
      // primeiro movimento pode andar 2
      if (dx === 0 && dy === dir * 2 && from.row === startRow && !frente && !boardState[from.row + dir][from.col]) return true;
      // captura na diagonal
      if (absDx === 1 && dy === dir && frente && frente[0] !== piece[0]) return true;
      return false;
    }
    case "R":
      if (dx !== 0 && dy !== 0) return false;
      return isPathClear(from, to);
    case "B":
      if (absDx !== absDy) return false;
      return isPathClear(from, to);
    case "Q":
      if (dx === 0 || dy === 0 || absDx === absDy) return isPathClear(from, to);
      return false;
    case "N":
      return (absDx === 2 && absDy === 1) || (absDx === 1 && absDy === 2);
    case "K":
      return absDx <= 1 && absDy <= 1;
    default:
      return false;
  }
}

function isPathClear(from, to) {
  const dx = Math.sign(to.col - from.col);
  const dy = Math.sign(to.row - from.row);
  let x = from.col + dx;
  let y = from.row + dy;

  while (x !== to.col || y !== to.row) {
    if (boardState[y][x]) return false;
    x += dx;
    y += dy;
  }

  return true;
}

createBoard();

