let bananas = 0;
let cps = 0; // bananas per second
let upgrades = {
  cpsincrease: { cost: 10, cps: 1, count: 0 },
  grandma: { cost: 100, cps: 2, count: 0 },
  farm: { cost: 250, cps: 5, count: 0 },
  factory: { cost: 500, cps: 10, count: 0 },
  bakery: { cost: 750, cps: 20, count: 0 },
  mine: { cost: 1000, cps: 50, count: 0 },
  spaceship: { cost: 5000, cps: 100, count: 0 },
  timeMachine: { cost: 20000, cps: 500, count: 0 },
  portal: { cost: 100000, cps: 2000, count: 0 },
  dimensionRift: { cost: 500000, cps: 10000, count: 0 },
  bananauniverse: { cost: 750000, cps: 500000, count: 0 }, // Added Banana Universe
};

// Function to click the Banana
function clickBanana() {
  bananas += 1;
  updateDisplay();
}

// Function to buy an upgrade
function buyUpgrade(upgrade, quantity = 1) {
  let totalCost = 0;

  // Calculate the total cost for the quantity
  for (let i = 0; i < quantity; i++) {
    let nextCost = Math.floor(upgrades[upgrade].cost * Math.pow(1.1, upgrades[upgrade].count + i));
    totalCost += nextCost;
  }

  if (bananas >= totalCost) {
    bananas -= totalCost;

    // Add upgrades and increase CPS
    for (let i = 0; i < quantity; i++) {
      upgrades[upgrade].count += 1;
      cps += upgrades[upgrade].cps;
      upgrades[upgrade].cost = Math.floor(upgrades[upgrade].cost * 1.2); // Update cost for next purchase
    }

    updateDisplay();
  } else {
    alert(`Not enough bananas to buy ${quantity} of ${capitalize(upgrade)}!`);
  }
}

// Function to reset the game
function resetGame() {
  localStorage.removeItem("BananaClickerSave");
  bananas = 0;
  cps = 0;
  for (let upgrade in upgrades) {
    upgrades[upgrade].count = 0;
  }
  updateDisplay();
  alert("Game has been reset!");
}

// Update display function
function updateDisplay() {
  document.getElementById("banana-count").textContent = `Bananas: ${bananas}`;
  
  // Update upgrade buttons and counts
  for (let upgrade in upgrades) {
    document.getElementById(`${upgrade}-count`).textContent = `${upgrades[upgrade].count} Bought`;
    document.getElementById(`${upgrade}-button`).textContent = `${capitalize(upgrade)} - Cost: ${upgrades[upgrade].cost} Bananas`;
  }
}

// Utility function to capitalize upgrade names
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Auto-collect bananas based on CPS
setInterval(() => {
  bananas += cps;
  updateDisplay();
}, 1000);
