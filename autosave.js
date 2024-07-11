function saveGame(showNotification = true) {
    localStorage.setItem('bruteForceCapacity', bruteForceCapacity.toString());
    localStorage.setItem('crackRate', crackRate.toString());
    localStorage.setItem('upgradeCost', upgradeCost.toString());
    localStorage.setItem('ownedUpgrades', ownedUpgrades.toString());
    localStorage.setItem('lastSaveTime', Date.now()); // Save the current timestamp
    if (showNotification) {
        notify('Game saved', 'success', 'save');
    }
    console.log('Game saved');
}

function loadGame() {
    const savedBruteForceCapacity = localStorage.getItem('bruteForceCapacity');
    const savedCrackRate = localStorage.getItem('crackRate');
    const savedUpgradeCost = localStorage.getItem('upgradeCost');
    const savedOwnedUpgrades = localStorage.getItem('ownedUpgrades');
    const lastSaveTime = localStorage.getItem('lastSaveTime');

    if (savedBruteForceCapacity !== null) {
        bruteForceCapacity = new Decimal(savedBruteForceCapacity);
    }

    if (savedCrackRate !== null) {
        crackRate = new Decimal(savedCrackRate);
    }

    if (savedUpgradeCost !== null) {
        upgradeCost = new Decimal(savedUpgradeCost);
    }

    if (savedOwnedUpgrades !== null) {
        ownedUpgrades = new Decimal(savedOwnedUpgrades);
    }

    if (lastSaveTime !== null) {
        const currentTime = Date.now();
        const elapsedTime = (currentTime - lastSaveTime) / 1000; // Convert to seconds
        const offlineProgress = crackRate.times(elapsedTime); // Brute force capacity per second
        bruteForceCapacity = bruteForceCapacity.plus(offlineProgress);
        notify(`Offline progress: ${offlineProgress.toFixed(2)} brute force capacity`, 'info', 'offline');
    }

    updateDisplay();
}

function autoSaveLoop() {
    saveGame(true); // Show notification during auto-save
    setTimeout(autoSaveLoop, 15000); // Save every 15 seconds
}

// Load the game when the page loads
window.addEventListener('load', () => {
    loadGame(); // Load game and handle offline progress
    setTimeout(autoSaveLoop, 15000); // Start auto-saving after initial load
});
