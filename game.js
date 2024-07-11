let bruteForceCapacity = new Decimal(1);
let crackRate = new Decimal(0); // Initial crack rate per second
let upgradeCost = new Decimal(1); // Initial cost for the first upgrade
const baseCost = new Decimal(1); // Base cost for the first upgrade
const growthRate = new Decimal(1.5); // Growth rate for upgrade costs
const baseProduction = new Decimal(0.5); // Base production per upgrade
let ownedUpgrades = new Decimal(0); // Number of upgrades owned
let lastUpdateTime = Date.now();

const bruteForceCapacityElement = document.getElementById('bruteForceCapacity');
const crackRateElement = document.getElementById('crackRate');
const upgradeCostElement = document.getElementById('upgradeCost');
const upgradeButton = document.getElementById('upgradeButton');

upgradeButton.addEventListener('click', () => {
    if (bruteForceCapacity.gte(upgradeCost)) {
        bruteForceCapacity = bruteForceCapacity.minus(upgradeCost);
        ownedUpgrades = ownedUpgrades.plus(1);
        crackRate = baseProduction.times(ownedUpgrades); // Update crack rate based on owned upgrades
        upgradeCost = baseCost.times(growthRate.pow(ownedUpgrades)); // Calculate next upgrade cost
        updateDisplay();
    }
});

function updateDisplay() {
    bruteForceCapacityElement.textContent = bruteForceCapacity.toFixed(1);
    crackRateElement.textContent = crackRate.toFixed(1);
    upgradeCostElement.textContent = upgradeCost.toFixed(1);
}

function gameLoop() {
    const currentTime = Date.now();
    const deltaTime = (currentTime - lastUpdateTime) / 1000; // Convert to seconds

    bruteForceCapacity = bruteForceCapacity.plus(crackRate.times(deltaTime)); // Increase brute force capacity based on crack rate
    updateDisplay();

    lastUpdateTime = currentTime;
    requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);
