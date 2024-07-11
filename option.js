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
                localStorage.removeItem('lastSaveTime');
                bruteForceCapacity = 0;
                crackRate = 0;
                upgradeCost = 0;
                updateCrackRateDisplay();
                updateUpgradeCostDisplay();
                notify('User data wiped', 'warning', 'delete');
                console.log('User data wiped');
            } else {
                console.log('User canceled data wipe');
            }
        });
    }
});

function notify(text, type, icon) {
    var n = document.createElement("div");
    n.className = "notify_div " + (type || "success");
    n.innerHTML = `${text}`;
    document.getElementById("notify").appendChild(n);

    setTimeout(() => {
        n.remove();
    }, 6000);
}
