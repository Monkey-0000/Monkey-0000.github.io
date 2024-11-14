let cookieCount = 0;
let cps = 0; // Cookies per second
const upgrades = {
  grandma: { count: 0, cps: 1, cost: 10 },
  farm: { count: 0, cps: 5, cost: 50 },
  factory: { count: 0, cps: 25, cost: 250 }
};

// Update the cookie display
function updateCookieDisplay() {
  document.getElementById("cookie-count").innerText = `Cookies: ${cookieCount.toFixed(0)}`;
  document.getElementById("grandma-button").innerText = `Grandma - Cost: ${upgrades.grandma.cost} Cookies`;
  document.getElementById("farm-button").innerText = `Farm - Cost: ${upgrades.farm.cost} Cookies`;
  document.getElementById("factory-button").innerText = `Factory - Cost: ${upgrades.factory.cost} Cookies`;
}

// Click the cookie to add to total cookies
function clickCookie() {
  cookieCount += 1;
  updateCookieDisplay();
}

// Purchase an upgrade
function buyUpgrade(type) {
  const upgrade = upgrades[type];
  if (cookieCount >= upgrade.cost) {
    cookieCount -= upgrade.cost;
    upgrade.count += 1;
    cps += upgrade.cps;
    upgrade.cost = Math.floor(upgrade.cost * 1.15); // Increase the cost for each purchase
    updateCookieDisplay();
  }
}

// Passive income from upgrades
function generateCookies() {
  cookieCount += cps / 10;
  updateCookieDisplay();
}

// Check if upgrades are affordable and update button state
function updateButtonState() {
  document.getElementById("grandma-button").disabled = cookieCount < upgrades.grandma.cost;
  document.getElementById("farm-button").disabled = cookieCount < upgrades.farm.cost;
  document.getElementById("factory-button").disabled = cookieCount < upgrades.factory.cost;
}

// Main game loop
setInterval(() => {
  generateCookies();
  updateButtonState();
}, 100);
