function saveGame(showNotification = true) {
    localStorage.setItem('points', points);
    localStorage.setItem('lastSaveTime', Date.now()); // Save the current timestamp
    if (showNotification) {
        notify('Game saved', 'success', 'save');
    }
    console.log('Game saved');
}

function loadGame() {
    const savedPoints = localStorage.getItem('points');
    const lastSaveTime = localStorage.getItem('lastSaveTime');
    
    if (savedPoints !== null) {
        points = parseFloat(savedPoints);
        updatePointsDisplay();
        console.log('Game loaded');
    }
    
    if (lastSaveTime !== null) {
        const currentTime = Date.now();
        const elapsedTime = (currentTime - lastSaveTime) / 1000; // Convert to seconds
        const offlinePoints = elapsedTime * 1; // Points per second
        points += offlinePoints;
        updatePointsDisplay();
        console.log(`Offline progress: ${offlinePoints.toFixed(2)} points`);
        notify(`Offline progress: ${offlinePoints.toFixed(2)} points`, 'info', 'offline');
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
