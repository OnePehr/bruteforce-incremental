let bruteForceCapacity = 0;
let crackRate = 0; // Initial crack rate per second
let upgradeCost = 0; // Initial cost for the first upgrade
let lastUpdateTime = Date.now();

const bruteForceCapacityElement = document.getElementById('bruteForceCapacity');
const crackRateElement = document.getElementById('crackRate');
const upgradeCostElement = document.getElementById('upgradeCost');
const upgradeButton = document.getElementById('upgradeButton');

upgradeButton.addEventListener('click', () => {
    if (bruteForceCapacity >= upgradeCost) {
        bruteForceCapacity -= upgradeCost;
        crackRate += 0.5 * Math.pow(1.5, upgradeCost); // Incremental scaling for crack rate
        upgradeCost = Math.ceil(upgradeCost * 1.5) + 1; // Incremental scaling for upgrade cost
        updateCrackRateDisplay();
        updateUpgradeCostDisplay();
    }
});

function updateCrackRateDisplay() {
    bruteForceCapacityElement.textContent = bruteForceCapacity.toFixed(2);
    crackRateElement.textContent = crackRate.toFixed(2);
}

function updateUpgradeCostDisplay() {
    upgradeCostElement.textContent = upgradeCost.toFixed(2);
}

function formatNumber(number) {
    return number.toFixed(2); // Format number to 2 decimal places
}

function gameLoop() {
    const currentTime = Date.now();
    const deltaTime = (currentTime - lastUpdateTime) / 1000; // Convert to seconds

    bruteForceCapacity += deltaTime * crackRate; // Increase brute force capacity based on crack rate
    updateCrackRateDisplay();

    lastUpdateTime = currentTime;
    requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);
