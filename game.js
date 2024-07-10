let points = 0;
let lastUpdateTime = Date.now();

const pointsElement = document.getElementById('points');
const incrementButton = document.getElementById('incrementButton');

incrementButton.addEventListener('click', () => {
    points++;
    updatePointsDisplay();
});

function updatePointsDisplay() {
    pointsElement.textContent = formatPoints(points);
}

function formatPoints(points) {
    return points.toFixed(1); // Format points to 2 decimal places
}

function gameLoop() {
    const currentTime = Date.now();
    const deltaTime = currentTime - lastUpdateTime;

    // Update game state based on deltaTime
    points += deltaTime * 0.001; // Add 1 point per second
    updatePointsDisplay();

    lastUpdateTime = currentTime;
    requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);
