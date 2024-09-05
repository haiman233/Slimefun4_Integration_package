function onUse(event) {
    const player = event.getPlayer();
    const currentLevel = player.getLevel();
    if (currentLevel >= 250) {
        player.sendMessage("已超出等级上限");
    } else if (currentLevel <= 245) {
        player.setLevel(currentLevel + 5);
    } else {
        player.setLevel(250);
        player.sendMessage("已超出等级上限");
    }
}
