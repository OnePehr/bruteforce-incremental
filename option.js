document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('saveButton');
    const wipeButton = document.getElementById('wipeButton');

    if (saveButton) {
        saveButton.addEventListener('click', () => {
            saveGame(true);
            notify('Game manually saved', 'success', 'save');
        });
    }

    if (wipeButton) {
        wipeButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to wipe all data? This action cannot be undone.')) {
                localStorage.removeItem('bruteForceCapacity');
                localStorage.removeItem('crackRate');
                localStorage.removeItem('upgradeCost');
                localStorage.removeItem('ownedUpgrades');
                localStorage.removeItem('lastSaveTime');
                bruteForceCapacity = new Decimal(1); // Start with 1 brute force capacity
                crackRate = new Decimal(0);
                upgradeCost = new Decimal(1); // Reset to initial cost
                ownedUpgrades = new Decimal(0); // Reset to no upgrades owned
                updateDisplay();
                notify('User data wiped', 'warning', 'delete');
                console.log('User data wiped');
            } else {
                console.log('User canceled data wipe');
            }
        });
    }
});