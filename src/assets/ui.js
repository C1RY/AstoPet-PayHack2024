export function updateHealthBar(entity, elementId) {
    const bar = document.getElementById(elementId);
    const percentage = (entity.health / entity.maxHealth) * 100;
    bar.style.width = `${percentage}%`;
    bar.style.backgroundColor = percentage > 50 ? "green" : "red";
}

export function showBattleLog(message) {
    const log = document.getElementById("battle-log");
    log.innerHTML += `<p>${message}</p>`;
    log.scrollTop = log.scrollHeight; // Auto-scroll to the latest message
}
