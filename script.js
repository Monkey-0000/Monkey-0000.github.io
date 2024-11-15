let cookies = 0;
let cps = 0; // Cookies per second
let upgrades = {
  grandma: { cost: 10, cps: 1, count: 0 },
  farm: { cost: 50, cps: 5, count: 0 },
  factory: { cost: 250, cps: 20, count: 0 },
  bakery: { cost: 500, cps: 50, count: 0 },
  mine: { cost: 1000, cps: 100, count: 0 },
  spaceship: { cost: 5000, cps: 500, count: 0 },
  timeMachine: { cost: 20000, cps: 2000, count: 0 },
  portal: { cost: 100000, cps: 10000, count: 0 },
  dimensionRift: { cost: 500000, cps: 50000, count: 0 },
};

// Function to click the cookie
function clickCookie() {
  cookies += 100000;
  updateDisplay();
}

// Function to buy an upgrade
function buyUpgrade(upgrade, quantity = 1) {
  let totalCost = 0;
  let canAfford = true;

  // Calculate the total cost for the quantity
  for (let i = 0; i < quantity; i++) {
    let nextCost = Math.floor(upgrades[upgrade].cost * Math.pow(1.2, upgrades[upgrade].count + i));
    totalCost += nextCost;
    if (totalCost > cookies) {
      canAfford = false;
      break;
    }
  }

  if (canAfford) {
    cookies -= totalCost;

    // Add upgrades and increase CPS
    for (let i = 0; i < quantity; i++) {
      upgrades[upgrade].count += 1;
      cps += upgrades[upgrade].cps;
      upgrades[upgrade].cost = Math.floor(upgrades[upgrade].cost * 1.2); // Update cost for next purchase
    }

    updateDisplay();
  } else {
    alert(`Not enough cookies to buy ${quantity} of ${capitalize(upgrade)}!`);
  }
}


// Function to update the display
function updateDisplay() {
  document.getElementById("cookie-count").innerText = `Cookies: ${cookies}`;
  for (let upgrade in upgrades) {
    const button = document.getElementById(`${upgrade}-button`);
    const count = document.getElementById(`${upgrade}-count`);
    if (button && count) {
      button.innerText = `${capitalize(upgrade)} - Cost: ${upgrades[upgrade].cost} Cookies`;
      count.innerText = `${upgrades[upgrade].count} Bought`;
    }
  }
}
// Auto-generate cookies
setInterval(() => {
  cookies += cps;
  updateDisplay();
}, 1000);

// Utility function to capitalize upgrade names
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
