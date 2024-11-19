const menu = document.getElementById("menu");
const game = document.getElementById("game");
const character = document.getElementById("character");
const platforms = document.getElementById("platforms");

let characterX = 100;
let characterY = 300;
let velocityY = 0;
const gravity = 0.5;
const jumpStrength = -12;
const speed = 5;
let isJumping = false;

// Define levels
const levels = {
    1: [{ x: 0, y: 350, width: 800 }, { x: 300, y: 300, width: 150 }],
    2: [{ x: 50, y: 350, width: 200 }, { x: 400, y: 250, width: 300 }],
    3: [{ x: 0, y: 350, width: 300 }, { x: 350, y: 300, width: 200 }],
    4: [{ x: 0, y: 350, width: 800 }, { x: 400, y: 250, width: 200 }],
    5: [{ x: 100, y: 350, width: 600 }, { x: 500, y: 200, width: 100 }],
};

// Start a level
function startLevel(levelNumber) {
    menu.style.display = "none";
    game.style.display = "block";
    resetGame();
    loadLevel(levelNumber);
    gameLoop();
}

// Reset the game state
function resetGame() {
    characterX = 100;
    characterY = 300;
    velocityY = 0;
    isJumping = false;
    character.style.left = `${characterX}px`;
    character.style.bottom = `${characterY}px`;
}

// Load platforms for the level
function loadLevel(levelNumber) {
    platforms.innerHTML = ""; // Clear previous platforms
    levels[levelNumber].forEach((platform) => {
        const div = document.createElement("div");
        div.classList.add("platform");
        div.style.left = `${platform.x}px`;
        div.style.bottom = `${platform.y}px`;
        div.style.width = `${platform.width}px`;
        platforms.appendChild(div);
    });
}

// Game loop
function gameLoop() {
    velocityY += gravity; // Apply gravity
    characterY += velocityY;

    // Prevent falling through the ground
    if (characterY < 50) {
        characterY = 50;
        velocityY = 0;
        isJumping = false;
    }

    // Platform collision detection
    document.querySelectorAll(".platform").forEach((platform) => {
        const rect = platform.getBoundingClientRect();
        const charRect = character.getBoundingClientRect();

        if (
            charRect.bottom <= rect.top &&
            charRect.bottom + velocityY >= rect.top &&
            charRect.left < rect.right &&
            charRect.right > rect.left
        ) {
            characterY = game.offsetHeight - rect.top;
            velocityY = 0;
            isJumping = false;
        }
    });

    // Update character position
    character.style.left = `${characterX}px`;
    character.style.bottom = `${characterY}px`;

    // Keep looping
    requestAnimationFrame(gameLoop);
}

// Handle controls
document.addEventListener("keydown", (e) => {
    if (e.key === "a") characterX -= speed; // Move left
    if (e.key === "d") characterX += speed; // Move right
    if ((e.key === " " || e.key === "w") && !isJumping) {
        velocityY = jumpStrength; // Jump
        isJumping = true;
    }
});
