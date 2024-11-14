// Constants and game settings
const gameBoard = document.getElementById("game-board");
const scoreDisplay = document.getElementById("score");
const boardSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let direction = { x: 0, y: 0 };
let score = 0;

// Initialize game board
function createBoard() {
  gameBoard.innerHTML = '';
  for (let i = 0; i < boardSize * boardSize; i++) {
    const cell = document.createElement("div");
    gameBoard.appendChild(cell);
  }
}

// Update the game board based on snake and food positions
function updateBoard() {
  const cells = gameBoard.children;
  Array.from(cells).forEach(cell => cell.className = '');

  snake.forEach(part => {
    const index = part.y * boardSize + part.x;
    cells[index].classList.add("snake");
  });

  const foodIndex = food.y * boardSize + food.x;
  cells[foodIndex].classList.add("food");
}

// Move the snake
function moveSnake() {
  const newHead = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y
  };

  // Wrap around the board edges
  newHead.x = (newHead.x + boardSize) % boardSize;
  newHead.y = (newHead.y + boardSize) % boardSize;

  // Check for collision with self
  if (snake.some(part => part.x === newHead.x && part.y === newHead.y)) {
    alert("Game Over! Your score: " + score);
    resetGame();
    return;
  }

  snake.unshift(newHead);

  // Check for food collection
  if (newHead.x === food.x && newHead.y === food.y) {
    score++;
    scoreDisplay.textContent = "Score: " + score;
    placeFood();
  } else {
    snake.pop();
  }

  updateBoard();
}

// Place food in a random position
function placeFood() {
  food = {
    x: Math.floor(Math.random() * boardSize),
    y: Math.floor(Math.random() * boardSize)
  };

  // Avoid placing food on the snake
  if (snake.some(part => part.x === food.x && part.y === food.y)) {
    placeFood();
  }
}

// Reset game
function resetGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  score = 0;
  scoreDisplay.textContent = "Score: " + score;
  placeFood();
  updateBoard();
}

// Handle keyboard input
document.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
});

// Game loop
function gameLoop() {
  setTimeout(() => {
    moveSnake();
    gameLoop();
  }, 200);
}

// Start the game
createBoard();
resetGame();
gameLoop();
