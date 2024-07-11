function saveGame(showNotification = true) {
    localStorage.setItem('bruteForceCapacity', bruteForceCapacity);
    localStorage.setItem('crackRate', crackRate);
    localStorage.setItem('upgradeCost', upgradeCost);
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
    const lastSaveTime = localStorage.getItem('lastSaveTime');

    if (savedBruteForceCapacity !== null) {
        bruteForceCapacity = parseFloat(savedBruteForceCapacity);
        updateCrackRateDisplay();
        console.log('Game loaded');
    }

    if (savedCrackRate !== null) {
        crackRate = parseFloat(savedCrackRate);
        updateCrackRateDisplay();
    }

    if (savedUpgradeCost !== null) {
        upgradeCost = parseFloat(savedUpgradeCost);
        updateUpgradeCostDisplay();
    }

    if (lastSaveTime !== null) {
        const currentTime = Date.now();
        const elapsedTime = (currentTime - lastSaveTime) / 1000; // Convert to seconds
        const offlineProgress = elapsedTime * crackRate; // Brute force capacity per second
        bruteForceCapacity += offlineProgress;
        updateCrackRateDisplay();
        console.log(`Offline progress: ${offlineProgress.toFixed(2)} brute force capacity`);
        notify(`Offline progress: ${offlineProgress.toFixed(2)} brute force capacity`, 'info', 'offline');
    }
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
