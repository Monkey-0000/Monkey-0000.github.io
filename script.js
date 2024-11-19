// Global variables
let character = document.getElementById("character");
let game = document.getElementById("game");
let menu = document.getElementById("menu");
let platforms = document.getElementById("platforms");

let gravity = 0.6;
let jumpStrength = -12;
let speed = 5;
let characterY = 300;
let characterX = 100;
let velocityY = 0;
let isJumping = false;

// Levels configuration
const levels = {
    1: [{ x: 50, y: 350, width: 700 }, { x: 200, y: 300, width: 100 }],
    2: [{ x: 0, y: 350, width: 300 }, { x: 400, y: 250, width: 300 }],
    3: [{ x: 50, y: 350, width: 100 }, { x: 200, y: 250, width: 500 }],
    4: [{ x: 0, y: 350, width: 800 }, { x: 300, y: 300, width: 200 }],
    5: [{ x: 100, y: 300, width: 600 }, { x: 500, y: 200, width: 200 }],
};

// Start a level
function startLevel(levelNumber) {
    menu.style.display = "none";
    game.style.display = "block";
    resetGame();
    loadLevel(levelNumber);
    gameLoop();
}

// Load platforms for a level
function loadLevel(levelNumber) {
    platforms.innerHTML = ""; // Clear existing platforms
    levels[levelNumber].forEach((platform) => {
        let div = document.createElement("div");
        div.classList.add("platform");
        div.style.left = platform.x + "px";
        div.style.bottom = platform.y + "px";
        div.style.width = platform.width + "px";
        platforms.appendChild(div);
    });
}

// Reset game state
function resetGame() {
    characterX = 100;
    characterY = 300;
    velocityY = 0;
    isJumping = false;
    character.style.left = `${characterX}px`;
    character.style.bottom = `${characterY}px`;
}

// Game loop
function gameLoop() {
    velocityY += gravity; // Apply gravity
    characterY += velocityY;

    // Prevent falling below ground
    if (characterY < 50) {
        characterY = 50;
        velocityY = 0;
        isJumping = false;
    }

    // Platform collision
    document.querySelectorAll(".platform").forEach((platform) => {
        let rect = platform.getBoundingClientRect();
        let charRect = character.getBoundingClientRect();

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
    character.style.bottom = `${characterY}px`;
    character.style.left = `${characterX}px`;

    // Keep the game loop running
    requestAnimationFrame(gameLoop);
}

// Character controls
document.addEventListener("keydown", (e) => {
    if (e.key === "a") characterX -= speed; // Move left
    if (e.key === "d") characterX += speed; // Move right
    if ((e.key === "w" || e.key === " ") && !isJumping) {
        velocityY = jumpStrength; // Jump
        isJumping = true;
    }
});
